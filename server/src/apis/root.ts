import {ErrorRequestHandler, Request, Response, Router} from 'express';
import SendGridMail, {MailDataRequired} from '@sendgrid/mail';
import {encryptCredential, getToken} from '../utils/auth';
import {resetPassword, verifyEmail} from '../models/User';

import {UPLOAD_FILE_SIZE_LIMIT} from '../utils/const';
import {assert} from '../utils/assert';
import {getMimeType} from 'stream-mime-type';
import multer from 'multer';
import {prisma} from '../context';
import qs from 'querystring';
import stream from 'stream';
import {uploadFileToAzureBlobFromStream} from '../utils/azure';
import {verify} from 'jsonwebtoken';
import {verifyWithRefresh} from '../utils/jwt';

const {SENDGRID_EMAIL, EMAIL_SECRET} = process.env;

interface VerificationToken {
  email: string;
  type: 'verifyEmail' | 'findPassword';
}

const router = Router();
const storage = multer.memoryStorage();

const upload = multer({storage, limits: {fileSize: UPLOAD_FILE_SIZE_LIMIT}});

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

      await resetPassword(prisma, validated.email, password);

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

      await verifyEmail(prisma, validated.email);

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

const onSendEmail = async (req: Request, res: Response): Promise<void> => {
  assert(SENDGRID_EMAIL, 'No email sender');
  assert(EMAIL_SECRET, 'Email secret should be provided');

  if (!req.body) {
    res.status(500).end();

    return;
  }

  const emailSecret: string = req.body.secret || '';
  const emailTo: string = req.body.emailTo;
  const emailFrom: string = req.body.emailFrom;
  const subject: string = req.body.subject;
  const text: string = req.body.text;

  if (!emailTo || !subject || !text || EMAIL_SECRET !== emailSecret) {
    res.status(400).end();

    return;
  }

  try {
    const msg: MailDataRequired = {
      to: emailTo,
      from: emailFrom || SENDGRID_EMAIL,
      subject,
      text,
    };

    await SendGridMail.send(msg);
    res.status(200).end();
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getIdToken = async (req: Request, res: Response): Promise<void> => {
  const token = getToken(req);

  if (!token) {
    res.status(401);

    res.json({
      message: 'User has not signed in.',
    });

    return;
  }

  try {
    const result = await verifyWithRefresh(token, prisma);

    if (result.accessToken) {
      res.status(200).json({
        token: result.accessToken,
      });

      return;
    }

    res.status(200).json({
      token,
      message: 'User is verified',
    });
  } catch (err) {
    res.status(200).json({
      message: err,
    });
  }
};

const onUploadSingle = async (req: Request, res: Response): Promise<void> => {
  const token = getToken(req);

  if (!token) {
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

  // const {mime} = await getMimeType(req.file.buffer);

  const url = await uploadFileToAzureBlobFromStream(
    bufferToStream(req.file.buffer),
    req.body.name || `${new Date().getTime()}_${req.file.originalname ?? ''}`,
    req.body.dir,
    process.env.NODE_ENV === 'production' ? 'hackatalk' : 'hackatalkdev',
    // mime,
  );

  res.status(200).json({
    url,
  });
};

const errorRequestHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err) {
    res.status(500).json({error: err.code});
  }
};

router
  .get('/reset_password/:token/:password', onResetPassword)
  .get('/verify_email/:token', onVerifyEmail)
  .post('/send_email', onSendEmail)
  .post('/get_id_token', getIdToken)
  .post(
    '/upload_single',
    upload.single('inputFile'),
    onUploadSingle,
    errorRequestHandler,
  );

export default router;
