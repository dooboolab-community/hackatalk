import {
  APP_SECRET,
  encryptCredential,
  getEmailVerificationHTML,
  getPasswordResetHTML,
  getUserId,
  validateCredential,
  validateEmail,
} from '../../../utils/auth';
import {
  ErrorEmailNotValid,
  ErrorEmailSentFailed,
  ErrorPasswordIncorrect,
} from '../../../utils/error';
import {
  USER_SIGNED_IN,
  USER_UPDATED,
} from './subscription';
import { compare, hash } from 'bcryptjs';
import { inputObjectType, mutationField, stringArg } from '@nexus/schema';

import SendGridMail from '@sendgrid/mail';
import { sign } from 'jsonwebtoken';

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
    const hashedPassword = await hash(password, 10);
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

    const passwordValid = await compare(password, user.password);
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
      const html = getEmailVerificationHTML(email, hashedEmail);
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
  resolve: async (_parent, { email }) => {
    if (!email || !validateEmail(email)) {
      throw ErrorEmailNotValid('Email is not valid');
    }

    const hashedEmail = await encryptCredential(email);

    const msg = {
      to: email,
      from: 'noreply@hackatalk.dev',
      subject: '[HackaTalk] Reset your password!',
      html: getPasswordResetHTML(email, hashedEmail),
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
