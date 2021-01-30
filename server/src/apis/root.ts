import {encryptCredential, getToken} from '../utils/auth';
import {resetPassword, verifyEmail} from '../models/User';

import {Router} from 'express';
import multer from 'multer';
import {prisma} from '../context';
import qs from 'querystring';
import stream from 'stream';
import {uploadFileToAzureBlobFromStream} from '../utils/azure';
import {verify} from 'jsonwebtoken';

interface VerificationToken {
  email: string;
  type: 'verifyEmail' | 'findPassword';
}

const {JWT_SECRET} = process.env;

export function resolveBlobName(destFile: string, destDir: string): string {
  return `${destDir}_${new Date().getTime()}_${destFile}`;
}

// const resolveMetadata = (req, file) => {
//   return new Promise((resolve, reject) => {
//     const metadata = yourCustomLogic(req, file);

//     resolve(metadata);
//   });
// };

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

function bufferToStream(buffer: Buffer): stream.Readable {
  const duplexStream = new stream.Duplex();

  duplexStream.push(buffer);
  duplexStream.push(null);

  return duplexStream;
}

router.use((req: ReqI18n, res, next) => {
  req.appSecret = process.env.JWT_SECRET;
  next();
});

const verifyEmailToken = (
  token: string,
  appSecretEtc: string,
): VerificationToken => verify(token, appSecretEtc) as VerificationToken;

const onResetPassword = async (req: ReqI18n, res): Promise<void> => {
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

const onVerifyEmail = async (req: ReqI18n, res): Promise<void> => {
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

const onUploadSingle = async (req: ReqI18n, res): Promise<void> => {
  const token = getToken(req);

  if (token === null) {
    res.status(401);

    return res.json({
      message: 'User has not signed in.',
    });
  }

  if (req.file === undefined) {
    res.status(400);

    return res.json({
      message: 'File is missing.',
    });
  }

  if (!req.body.name) {
    res.status(400);

    return res.json({
      message: 'File name is missing.',
    });
  }

  const url = await uploadFileToAzureBlobFromStream(
    bufferToStream(req.file.buffer),
    req.body.name,
    req.body.dir,
    'hackatalk',
  );

  req.file.url = url;

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
