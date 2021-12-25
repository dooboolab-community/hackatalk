import {ACCESS_TIME, REFRESH_TIME} from './const';

import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';

const {JWT_SECRET = 'undefined'} = process.env;

interface Token {
  userId: string;
}

interface VerifiedToken {
  verified?: boolean;
  message?: string;
  userId: string;
}

export const sign = async (
  userId: string,
  prisma?: PrismaClient,
  shouldGenerateRefreshToken?: boolean,
): Promise<string> => {
  const payload: Token = {
    userId,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TIME,
  });

  if (prisma && shouldGenerateRefreshToken) {
    const refreshToken = jwt.sign({}, JWT_SECRET, {
      expiresIn: REFRESH_TIME,
    });

    await prisma.user.update({
      data: {
        profile: {
          upsert: {
            create: {refreshToken},
            update: {refreshToken},
          },
        },
      },
      where: {id: userId},
    });
  }

  return accessToken;
};

export const verify = (token: string): VerifiedToken => {
  let decoded: Token;

  try {
    decoded = jwt.verify(token, JWT_SECRET) as Token;

    return {
      verified: true,
      userId: decoded.userId,
    };
  } catch (err: any) {
    return {
      verified: false,
      message: err.message,
      userId: '',
    };
  }
};

export const getRefreshToken = async (
  userId: string,
  prisma: PrismaClient,
): Promise<string | null | undefined> => {
  const data = await prisma.profile.findUnique({
    select: {refreshToken: true},
    where: {userId},
  });

  const refreshToken = data?.refreshToken;

  if (!refreshToken) {
    return null;
  }

  const result = verify(refreshToken);

  return !result.verified ? null : refreshToken;
};

export const refresh = async (
  userId: string,
  prisma: PrismaClient,
): Promise<string | null | undefined> => {
  const newToken = jwt.sign({}, JWT_SECRET, {
    expiresIn: REFRESH_TIME,
  });

  await prisma.profile.update({
    data: {refreshToken: newToken},
    where: {userId},
  });

  return newToken;
};

type VerifyRefreshResult = {
  result: boolean;
  accessToken?: string;
};

export const verifyWithRefresh = async (
  accessToken: string,
  prisma: PrismaClient,
): Promise<VerifyRefreshResult> => {
  try {
    const accessResult = verify(accessToken);
    const accessDecoded = jwt.decode(accessToken) as VerifiedToken;
    const refreshToken = await getRefreshToken(accessDecoded.userId, prisma);

    if (accessResult.verified) {
      if (!refreshToken) {
        refresh(accessDecoded.userId, prisma);
      }

      return {result: true, accessToken};
    }

    if (!refreshToken) {
      return {result: false, accessToken: ''};
    }

    const newAccessToken = await sign(accessDecoded.userId);

    return {result: true, accessToken: newAccessToken};
  } catch (err: any) {
    return {result: false, accessToken: ''};
  }
};
