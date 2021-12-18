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
    expiresIn: '1h',
  });

  if (prisma && shouldGenerateRefreshToken) {
    const refreshToken = jwt.sign({}, JWT_SECRET, {
      expiresIn: '1m',
    });

    await prisma.profile.update({
      data: {refreshToken},
      where: {userId},
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

  return data?.refreshToken;
};

export const refresh = async (
  userId: string,
  prisma: PrismaClient,
): Promise<string | null | undefined> => {
  const newToken = jwt.sign({}, JWT_SECRET, {
    expiresIn: '1m',
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

      return {result: true};
    }

    if (!refreshToken) {
      throw new Error('Not authorized!');
    }

    const newAccessToken = await sign(accessDecoded.userId);

    return {result: true, accessToken: newAccessToken};
  } catch (err: any) {
    throw new Error(err);
  }
};
