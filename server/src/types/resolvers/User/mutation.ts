import { APP_SECRET, getUserId } from '../../../utils';
import {
  USER_SIGNED_IN,
  USER_UPDATED,
} from './subscription';
import { compare, hash } from 'bcryptjs';
import { inputObjectType, mutationField, stringArg } from '@nexus/schema';

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
  type: 'AuthPayload',
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

    return {
      token: sign({ userId: created.id }, APP_SECRET),
      user: created,
    };
  },
});

export const signIn = mutationField('signIn', {
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
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    };
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
