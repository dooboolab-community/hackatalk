import {AuthType, Gender} from '../models';
import {ErrorEmailForUserExists, ErrorString} from '../utils/error';

import type {Context} from '../context';
import {NexusGenRootTypes} from '../generated/nexus';
import {USER_SIGNED_IN} from '../resolvers';
import {sign} from 'jsonwebtoken';

export interface SocialUserInput {
  socialId: string;
  authType: AuthType;
  name: string;
  email: string;
  birthday?: Date;
  gender?: Gender;
  phone?: string;
  photoURL?: string;
  thumbURL?: string;
}

export class UserService {
  static async signInWithSocialAccount(
    socialUser: SocialUserInput,
    ctx: Context,
  ): Promise<NexusGenRootTypes['AuthPayload']> {
    await UserService.validateSocialUser(socialUser, ctx);

    const user = await UserService.createOrGetUserBySocialUserInput(
      socialUser,
      ctx,
    );

    ctx.pubsub.publish(USER_SIGNED_IN, user);

    await ctx.prisma.user.updateMany({
      where: {
        profile: {
          socialId: socialUser.socialId,
        },
      },
      data: {lastSignedIn: new Date().toISOString()},
    });

    return {
      token: sign({userId: user.id}, ctx.appSecret),
      user,
    };
  }

  private static async validateSocialUser(
    socialUser: SocialUserInput,
    ctx: Context,
  ): Promise<void> {
    if (socialUser.email) {
      // TODO => 'findMany' could be replaced with 'findOne' when Prisma supports relation filtering in it.
      const emailUser = await ctx.prisma.user.findFirst({
        where: {
          email: socialUser.email,
          profile: {
            socialId: {
              not: socialUser.socialId,
            },
          },
        },
      });

      if (emailUser) {
        throw ErrorEmailForUserExists(ErrorString.EmailForUserExists);
      }
    }
  }

  private static async createOrGetUserBySocialUserInput(
    socialUser: SocialUserInput,
    ctx: Context,
  ): Promise<NexusGenRootTypes['User']> {
    const user = await ctx.prisma.user.findFirst({
      where: {
        profile: {
          socialId: socialUser.socialId,
        },
      },
      include: {profile: true},
    });

    if (!user) {
      return ctx.prisma.user.create({
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
          thumbURL: socialUser.thumbURL,
          photoURL: socialUser.photoURL,
          verified: true,
        },
        include: {profile: true},
      });
    }

    return user;
  }
}
