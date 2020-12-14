import {
  encryptCredential,
  getToken,
} from '../utils/auth';
import { resetPassword, verifyEmail } from '../models/User';

import { MulterAzureStorage } from 'multer-azure-blob-storage';
import { Router } from 'express';
import { getURL } from '../utils/azure';
import multer from 'multer';
import { nanoid } from 'nanoid';
import { prisma } from '../context';
import qs from 'querystring';
import { verify } from 'jsonwebtoken';

interface VerificationToken {
  email: string;
  type: 'verifyEmail' | 'findPassword';
}

const {
  STORAGE_ENDPOINT,
  STORAGE_ACCOUNT,
  STORAGE_KEY,
  STORAGE_CONNECTION_STRING,
  JWT_SECRET,
} = process.env;

const resolveBlobName = (req, file): Promise<string> => {
  return new Promise((resolve, reject) => {
    const dir: string = req.body.dir ? `${req.body.dir}/` : '';

    const blobName = `${dir}${nanoid()}_${new Date().getTime()}`;

    resolve(blobName);
  });
};

// const resolveMetadata = (req, file) => {
//   return new Promise((resolve, reject) => {
//     const metadata = yourCustomLogic(req, file);

//     resolve(metadata);
//   });
// };

const azureStorage = new MulterAzureStorage({
  connectionString: STORAGE_CONNECTION_STRING,
  accessKey: STORAGE_KEY,
  accountName: STORAGE_ACCOUNT,
  containerName: 'hackatalk',
  blobName: resolveBlobName,
  // metadata: resolveMetadata,
  containerAccessLevel: 'blob',
  urlExpirationTime: 60,
});

const upload = multer({
  storage: azureStorage,
});

const router = Router();

const verifyEmailToken = (token: string, appSecretEtc: string)
    : VerificationToken =>
    verify(token, appSecretEtc) as VerificationToken;

const onResetPassword = async (req: ReqI18n, res) => {
  const token = req.params.token;
  const randomPassword = qs.unescape(req.params.password);

  try {
    const validated = verifyEmailToken(token, req.appSecretEtc);

    if (validated.email && validated.type === 'findPassword') {
      const password = await encryptCredential(randomPassword);

      await resetPassword(validated.email, password);

      return res.render('password_changed', {
        REDIRECT_URL: 'https://hackatalk.dev',
        title: req.t('PW_CHANGED_TITLE'),
        text: req.t('PW_CHANGED'),
        SERVICE_CENTER: req.t('SERVICE_CENTER'),
      });
    }

    res.send('Error occured. Plesae try again.');
  } catch (err) {
    res.send('Error occured. Plesae try again.');
  }
};

const onVerifyEmail = async (req: ReqI18n, res) => {
  const token = req.params.token;

  try {
    const validated = verifyEmailToken(token, req.appSecretEtc);

    if (validated.email && validated.type === 'verifyEmail') {
      const user = await prisma.user.findUnique({
        where: {
          email: validated.email,
        },
      });

      const alreadyVerified = user && user.verified;

      if (alreadyVerified) {
        res.sendStatus(404);

        return;
      }

      await verifyEmail(validated.email);

      return res.render('email_verified', {
        REDIRECT_URL: 'https://hackatalk.dev',
        TITLE: req.t('EMAIL_VERIFIED_TITLE'),
        TEXT: req.t('EMAIL_VERIFIED'),
        SERVICE_CENTER: req.t('SERVICE_CENTER'),
        GO_TO_SIGN_IN: req.t('GO_TO_SIGN_IN'),
      });
    }

    res.send('Error occured. Plesae try again.');
  } catch (err) {
    res.send('Error occured. Plesae try again.');
  }
};

const onUploadSingle = async (req: ReqI18n, res) => {
  interface Result {
    message: string | unknown;
    status: number;
    url?: string;
  }

  const result: Result = {
    message: '',
    status: 0,
  };

  const token = getToken(req);

  if (!token) {
    result.message = 'User has not signed in.';
    result.status = 401;

    return res.json(result);
  }

  if (!req.file) {
    result.message = 'File is missing.';
    result.status = 400;

    return res.json(result);
  }

  if (req.file.size === 0) {
    result.message = 'File size is zero.';
    result.status = 400;

    return res.json(result);
  }

  const actualURL = getURL('hackatalk', req.file.blobName, req.file.sasToken, true, req.file.snapshotId);

  req.file.url = actualURL;

  res.status(200).json(req.file);
};

router.use((req: ReqI18n, res, next) => {
  req.appSecret = JWT_SECRET;
  next();
});

router
  .get('/reset_password/:token/:password', onResetPassword)
  .get('/verify_email/:token', onVerifyEmail)
  .post('/upload_single', upload.single('inputFile'), onUploadSingle);

export default router;
