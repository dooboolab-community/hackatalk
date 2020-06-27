import { APP_SECRET, getUserId } from '../../utils';
import { USER_SIGNED_IN, USER_UPDATED } from '../../types/resolvers/Subscription';
import { compare, hash } from 'bcryptjs';
import { inputObjectType, intArg, mutationType, stringArg } from '@nexus/schema';

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

export const Mutation = mutationType({
  definition(t) {
    t.field('signUp', {
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

    t.field('signIn', {
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

    t.field('updateProfile', {
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

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
      },
      resolve: (parent, { title, content }, ctx) => {
        const userId = getUserId(ctx);

        return ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            user: { connect: { id: userId } },
          },
        });
      },
    });

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: { id: intArg({ nullable: false }) },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.post.delete({
          where: {
            id,
          },
        });
      },
    });

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: { id: intArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.post.update({
          where: { id },
          data: { published: true },
        });
      },
    });
  },
});
