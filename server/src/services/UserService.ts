import { Context } from '../context';
import { NexusGenRootTypes } from '../generated/nexus';
import { AuthType, Gender } from '../types/models';
import { ErrorEmailForUserExists, ErrorString } from '../utils/error';

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
  static async validateSocialUser(socialUser: SocialUserInput, ctx: Context) {
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
  static async createOrGetUserBySocialUserInput(socialUser: SocialUserInput, ctx: Context): Promise<NexusGenRootTypes['User']> {
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