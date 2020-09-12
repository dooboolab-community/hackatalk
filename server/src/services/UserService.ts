import { sign } from 'jsonwebtoken';
import { Context } from '../context';
import { NexusGenRootTypes } from '../generated/nexus';
import { ErrorEmailForUserExists, ErrorString } from '../utils/error';
import { AuthType, Gender } from '../types/models';
import { USER_SIGNED_IN } from '../types/resolvers';

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
    });

    return {
      token: sign({ userId: user.id }, ctx.appSecret),
      user: updatedUser,
    };
  };

  private static async validateSocialUser(socialUser: SocialUserInput, ctx: Context) {
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
        take: 1,
      });
      if (emailUser.length) {
        throw ErrorEmailForUserExists(ErrorString.EmailForUserExists);
      }
    }
  }

  private static async createOrGetUserBySocialUserInput(socialUser: SocialUserInput, ctx: Context): Promise<NexusGenRootTypes['User']> {
    // TODO => 'findMany' & 'create' could be repalced with 'findOrCreate' if Prisma released it in the future
    const users = await ctx.prisma.user.findMany({
      where: {
        email: socialUser.email,
        profile: {
          socialId: socialUser.socialId,
        },
      },
      take: 1,
    });

    if (!users.length) {
      return await ctx.prisma.user.create({
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
      return users[0];
    }
  }
}
