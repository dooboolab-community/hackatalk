import { Context } from '../context';
import { NexusGenRootTypes } from '../generated/nexus';
import { AuthType, Gender } from '../types/models';

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