import {
  APP_SECRET,
  encryptCredential,
  getEmailVerificationHTML,
  getPasswordResetHTML,
  getUserId,
  validateCredential,
  validateEmail,
  verifyAppleId,
  verifyFacebookId,
  verifyGoogleId,
} from '../../../utils/auth';
import { AuthType, GenderType } from '../../models/Scalar';
import {
  ErrorEmailForUserExists,
  ErrorEmailNotValid,
  ErrorEmailSentFailed,
  ErrorPasswordIncorrect,
  ErrorString,
} from '../../../utils/error';
import {
  USER_SIGNED_IN,
  USER_UPDATED,
} from './subscription';
import { inputObjectType, mutationField, stringArg } from '@nexus/schema';

import { Context } from '../../../context';
import { NexusGenRootTypes } from '../../../generated/nexus';
import SendGridMail from '@sendgrid/mail';
import generator from 'generate-password';
import { sign } from 'jsonwebtoken';

interface SocialUserInput {
  socialId: string;
  authType: AuthType;
  name: string;
  email: string;
  birthday?: Date;
  gender?: GenderType;
  phone?: string;
}

export const signInWithSocialAccount = async (
  socialUser: SocialUserInput,
  ctx: Context,
): Promise<NexusGenRootTypes['AuthPayload']> => {
  if (socialUser.email) {
    // TODO => 'findMany' could be replaced with 'findOne' when Prisma supports relation filtering in it.
    const emailUser = await ctx.prisma.user.findMany({
      where: {
        email: socialUser.email,
        profile: {
          socialId: {
            not: socialUser.socialId,
          },
        },
      },
    });
    if (emailUser.length) {
      throw ErrorEmailForUserExists(ErrorString.EmailForUserExists);
    }
  }

  // TODO => 'findMany' & 'create' could be repalced with 'findOrCreate' if Prisma released it in the future
  let user: NexusGenRootTypes['User'];
  const users = await ctx.prisma.user.findMany({
    where: {
      email: socialUser.email,
      profile: {
        socialId: socialUser.socialId,
      },
    },
  });

  if (!users.length) {
    user = await ctx.prisma.user.create({
      data: {
        profile: {
          create: {
            socialId: socialUser.socialId,
            authType: socialUser.authType,
          },
        },
        email: socialUser.email,
        name: socialUser.name,
        birthday: socialUser.birthday,
        gender: socialUser.gender,
        phone: socialUser.phone,
        verified: true,
      },
    });
  } else {
    user = users[0];
  }

  ctx.pubsub.publish(USER_SIGNED_IN, user);

  const updatedUser = await ctx.prisma.user.update({
    where: {
      email: user.email,
    },
    data: { lastSignedIn: new Date() },
  });

  return {
    token: sign({ userId: user.id }, ctx.appSecret),
    user: updatedUser,
  };
};

export const UserInputType = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.string('email', {
      required: true,
    });
    t.string('password', {
      required: true,
    });
    t.string('name');
    t.string('nickname');
    t.date('birthday');
    t.gender('gender');
    t.string('phone');
    t.string('statusMessage');
  },
});

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.string('email');
    t.string('name');
    t.string('nickname');
    t.date('birthday');
    t.string('phone');
    t.string('statusMessage');
    t.gender('gender');
  },
});

export const signUp = mutationField('signUp', {
  type: 'User',
  args: {
    user: 'UserCreateInput',
  },
  resolve: async (_parent, { user }, ctx) => {
    const { name, email, password, gender } = user;
    const hashedPassword = await encryptCredential(password);
    const created = await ctx.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gender,
      },
    });

    return created;
  },
});

export const signInEmail = mutationField('signInEmail', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ nullable: false }),
    password: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { email, password }, ctx) => {
    const { pubsub } = ctx;

    const user = await ctx.prisma.user.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }

    const passwordValid = await validateCredential(password, user.password);
    if (!passwordValid) {
      throw new Error('Invalid password');
    }

    pubsub.publish(USER_SIGNED_IN, user);

    ctx.prisma.user.update({
      where: {
        email,
      },
      data: { lastSignedIn: new Date() },
    });

    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    };
  },
});

export const signInWithFacebook = mutationField('signInWithFacebook', {
  type: 'AuthPayload',
  args: {
    accessToken: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { accessToken }, ctx) => {
    const { id: facebookId, name, email } = await verifyFacebookId(accessToken);

    return signInWithSocialAccount(
      {
        socialId: facebookId,
        authType: AuthType.facebook,
        name,
        email: email || `${facebookId}@facebook.com`,
      },
      ctx,
    );
  },
});

export const signInWithApple = mutationField('signInWithApple', {
  type: 'AuthPayload',
  args: {
    accessToken: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { accessToken }, ctx) => {
    const { sub, email } = await verifyAppleId(accessToken);

    return signInWithSocialAccount(
      {
        socialId: sub,
        authType: AuthType.apple,
        name: '',
        email: email,
      },
      ctx,
    );
  },
});

export const signInWithGoogle = mutationField('signInWithGoogle', {
  type: 'AuthPayload',
  args: {
    accessToken: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { accessToken }, ctx) => {
    const { sub, email, name = '' } = await verifyGoogleId(accessToken);

    return signInWithSocialAccount(
      {
        socialId: sub,
        authType: AuthType.google,
        name,
        email,
      },
      ctx,
    );
  },
});

export const sendVerification = mutationField('sendVerification', {
  type: 'Boolean',
  args: {
    email: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { email }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        email,
      },
    });

    if (user) {
      const hashedEmail = await encryptCredential(email);
      const html = getEmailVerificationHTML(email, hashedEmail, ctx.request.req);
      const msg = {
        to: email,
        from: 'noreply@hackatalk.dev',
        subject: '[HackaTalk] Verify your email address!',
        html,
      };
      await SendGridMail.send(msg);
      return true;
    }
    return false;
  },
});

export const updateProfile = mutationField('updateProfile', {
  type: 'User',
  args: {
    user: 'UserUpdateInput',
  },
  resolve: async (_parent, { user }, ctx) => {
    const { pubsub } = ctx;

    const userId = getUserId(ctx);

    const updated = await ctx.prisma.user.update({
      where: { id: userId },
      data: user,
    });

    pubsub.publish(USER_UPDATED, updated);
    return updated;
  },
});

export const findPassword = mutationField('findPassword', {
  type: 'Boolean',
  args: {
    email: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { email }, ctx) => {
    if (!email || !validateEmail(email)) {
      throw ErrorEmailNotValid('Email is not valid');
    }

    const hashedEmail = await encryptCredential(email);

    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const msg = {
      to: email,
      from: 'noreply@hackatalk.dev',
      subject: '[HackaTalk] Reset your password!',
      html: getPasswordResetHTML(email, hashedEmail, password, ctx.request.req),
    };
    try {
      await SendGridMail.send(msg);
      return true;
    } catch (err) {
      throw ErrorEmailSentFailed(err.message);
    }
  },
});

export const changeEmailPassword = mutationField('changeEmailPassword', {
  type: 'Boolean',
  args: {
    password: stringArg({ nullable: false }),
    newPassword: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { password, newPassword }, ctx) => {
    const userId = getUserId(ctx);
    try {
      const user = await ctx.prisma.user.findOne({
        where: {
          id: userId,
        },
      });

      const validate = await validateCredential(password, user.password);

      if (!validate) throw ErrorPasswordIncorrect('Password is incorrect');

      newPassword = await encryptCredential(newPassword);

      await ctx.prisma.user.update({
        where: { id: userId },
        data: { password: newPassword },
      });

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  },
});
