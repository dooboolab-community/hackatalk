import { AuthType, Gender } from '../models';
import { ErrorEmailForUserExists, ErrorString } from '../utils/error';

import { Context } from '../context';
import { NexusGenRootTypes } from '../generated/nexus';
import { USER_SIGNED_IN } from '../resolvers';
import { sign } from 'jsonwebtoken';

export interface SocialUserInput {
  socialId: string;
  authType: AuthType;
  name: string;
  email: string;
  birthday?: Date;
  gender?: Gender;
  phone?: string;
}

export class UserService {
  static async signInWithSocialAccount(
    socialUser: SocialUserInput,
    ctx: Context,
  ): Promise<NexusGenRootTypes['AuthPayload']> {
    await UserService.validateSocialUser(socialUser, ctx);

    const user = await UserService.createOrGetUserBySocialUserInput(socialUser, ctx);

    ctx.pubsub.publish(USER_SIGNED_IN, user);

    const updatedUser = await ctx.prisma.user.update({
      where: {
        email: user.email,
      },
      data: { lastSignedIn: new Date().toISOString() },
      include: {
        profile: true,
      },
    });

    return {
      token: sign({ userId: user.id }, ctx.appSecret),
      user: updatedUser,
    };
  }

  private static async validateSocialUser(socialUser: SocialUserInput, ctx: Context) {
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

  private static async createOrGetUserBySocialUserInput(socialUser: SocialUserInput, ctx: Context)
  : Promise<NexusGenRootTypes['User']> {
    const user = await ctx.prisma.user.findFirst({
      where: {
        email: socialUser.email,
        profile: {
          socialId: socialUser.socialId,
        },
      },
      include: { profile: true },
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
          verified: true,
        },
        include: { profile: true },
      });
    }

    return user;
  }
}
