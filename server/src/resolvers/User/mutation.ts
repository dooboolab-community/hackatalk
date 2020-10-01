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
} from '../../utils/auth';
import {
  ErrorEmailNotValid,
  ErrorEmailSentFailed,
  ErrorPasswordIncorrect,
} from '../../utils/error';
import {
  USER_SIGNED_IN,
  USER_UPDATED,
} from './subscription';
import { andThen, pipe } from 'ramda';
import { inputObjectType, mutationField, stringArg } from '@nexus/schema';

import { AuthType } from '../../models/Scalar';
import SendGridMail from '@sendgrid/mail';
import { UserService } from '../../services/UserService';
import generator from 'generate-password';
import { sign } from 'jsonwebtoken';

const { SENDGRID_EMAIL } = process.env;

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
    t.string('thumbURL');
    t.string('photoURL');
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
    t.string('thumbURL');
    t.string('photoURL');
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
    const { name, email, password, gender, photoURL, thumbURL } = user;
    const hashedPassword = await encryptCredential(password);

    const created = await ctx.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gender,
        photoURL,
        thumbURL,
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
    const { pubsub, prisma } = ctx;

    const findUserWithEmail = async () => prisma.user.findOne({
      where: { email },
    });

    const updateLastSignedIn = () => prisma.user.update({
      where: { email },
      data: { lastSignedIn: new Date().toISOString() },
    });

    return pipe(
      findUserWithEmail,
      andThen(
        (user) => pipe(
          async () => {
            if (!await validateCredential(password, user.password)) {
              throw new Error('Invalid password');
            }
          },
          andThen(() => pubsub.publish(USER_SIGNED_IN, user)),
          andThen(updateLastSignedIn),
          andThen(() => ({
            token: sign({ userId: user.id }, APP_SECRET),
            user,
          })),
        )(),
      ),
    )();
  },
});

export const signInWithFacebook = mutationField('signInWithFacebook', {
  type: 'AuthPayload',
  args: {
    accessToken: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { accessToken }, ctx) => {
    const { id: facebookId, name, email } = await verifyFacebookId(accessToken);

    return UserService.signInWithSocialAccount(
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

    return UserService.signInWithSocialAccount(
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

    return UserService.signInWithSocialAccount(
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
      const verificationToken = sign({ email, type: 'verifyEmail' }, ctx.appSecretEtc, { expiresIn: '10m' });
      const html = getEmailVerificationHTML(verificationToken, ctx.request.req);

      const msg = {
        to: email,
        from: SENDGRID_EMAIL,
        subject: ctx.request.req.t('VERIFICATION_EMAIL_SUBJECT'),
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
  args: { user: 'UserUpdateInput' },
  description: 'Update user profile. Becareful that nullable fields will be updated either.',

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

    const verificationToken = sign({ email, type: 'findPassword' }, ctx.appSecretEtc, { expiresIn: '10m' });

    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const msg = {
      to: email,
      from: 'noreply@hackatalk.dev',
      subject: ctx.request.req.t('PASSWORD_RESET_EMAIL_SUBJECT'),
      html: getPasswordResetHTML(verificationToken, password, ctx.request.req),
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
