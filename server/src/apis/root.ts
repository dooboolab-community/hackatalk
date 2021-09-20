import {Request, Response, Router} from 'express';
import {encryptCredential, getToken} from '../utils/auth';
import {resetPassword, verifyEmail} from '../models/User';

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

const verifyEmailToken = (
  token: string,
  appSecretEtc: string,
): VerificationToken => verify(token, appSecretEtc) as VerificationToken;

const onResetPassword = async (req: Request, res: Response): Promise<void> => {
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
  } catch (err: any) {
    res.send('Error occured. Plesae try again.');
  }
};

const onVerifyEmail = async (req: Request, res: Response): Promise<void> => {
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
  } catch (err: any) {
    res.send('Error occured. Plesae try again.');
  }
};

const onUploadSingle = async (req: Request, res: Response): Promise<void> => {
  const token = getToken(req);

  if (token === null) {
    res.status(401);

    res.json({
      message: 'User has not signed in.',
    });

    return;
  }

  if (req.file === undefined) {
    res.status(400);

    res.json({
      message: 'File is missing.',
    });

    return;
  }

  const url = await uploadFileToAzureBlobFromStream(
    bufferToStream(req.file.buffer),
    req.body.name || `${req.file.originalname ?? ''}_${new Date().getTime()}`,
    req.body.dir,
    process.env.NODE_ENV === 'production' ? 'hackatalk' : 'hackatalkdev',
  );

  res.status(200).json({
    ...req.file,
    url,
  });
};

router
  .get('/reset_password/:token/:password', onResetPassword)
  .get('/verify_email/:token', onVerifyEmail)
  .post('/upload_single', upload.single('inputFile'), onUploadSingle);

export default router;
