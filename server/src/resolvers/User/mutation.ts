import {
  APP_SECRET,
  encryptCredential,
  getEmailVerificationHTML,
  getPasswordResetHTML,
  validateCredential,
  validateEmail,
  verifyFacebookId,
  verifyGoogleId,
} from '../../utils/auth';
import {
  ErrorEmailNotValid,
  ErrorEmailSentFailed,
  ErrorPasswordIncorrect,
  ErrorString,
  ErrorUserNotExists,
} from '../../utils/error';
import SendGridMail, {MailDataRequired} from '@sendgrid/mail';
import {USER_SIGNED_IN, USER_UPDATED} from './subscription';
import {andThen, pipe} from 'ramda';
import {arg, inputObjectType, mutationField, nonNull, stringArg} from 'nexus';

import {AuthType} from '../../models/Scalar';
import {Upload} from '../../models';
import {User} from '@prisma/client';
import {UserService} from '../../services/UserService';
import {assert} from '../../utils/assert';
import generator from 'generate-password';
import {nanoid} from 'nanoid';
import {sign} from 'jsonwebtoken';
import {uploadFileToAzureBlobFromStream} from '../../utils/azure';
import verifyAppleToken from 'verify-apple-id-token';

const {SENDGRID_EMAIL, APPLE_CLIENT_ID} = process.env;

export const UserInputType = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');

    t.string('name');
    t.string('nickname');
    t.date('birthday');
    t.gender('gender');
    t.string('phone');
    t.string('statusMessage');
  },
});

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.string('email');
    t.string('name');
    t.string('nickname');
    t.string('thumbURL');
    t.string('photoURL');
    t.date('birthday');
    t.string('phone');
    t.string('statusMessage');
    t.gender('gender');
  },
});

export const signUp = mutationField('signUp', {
  type: nonNull('User'),
  args: {
    // @ts-ignore
    photoUpload: arg({type: Upload}),
    user: nonNull(UserInputType),
  },

  resolve: async (_parent, {user, photoUpload}, ctx) => {
    const {name, email, password, gender} = user;

    const hashedPassword = await encryptCredential(password);

    let uploadedURL = '';

    if (photoUpload) {
      const {createReadStream} = await photoUpload;
      const stream = createReadStream();

      uploadedURL = await uploadFileToAzureBlobFromStream(
        stream,
        nanoid(),
        'profile',
        process.env.NODE_ENV === 'production' ? 'hackatalk' : 'hackatalkdev',
      );
    }

    try {
      const created = await ctx.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          gender,
          photoURL: uploadedURL,
          thumbURL: uploadedURL,
        },
      });

      return created;
    } catch (err) {
      throw new Error('Error while creating user. Please try again.');
    }
  },
});

export const signInEmail = mutationField('signInEmail', {
  type: nonNull('AuthPayload'),

  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },

  resolve: async (_parent, {email, password}, ctx) => {
    const {pubsub, prisma} = ctx;

    const findUserWithEmail = async (): Promise<User> => {
      const user = await prisma.user.findUnique({
        where: {email},
        include: {profile: true},
      });

      assert(user, 'Could not find the current user in db.');

      return user;
    };

    const updateLastSignedIn = (): Promise<User> =>
      prisma.user.update({
        where: {email},
        data: {lastSignedIn: new Date().toISOString()},
      });

    return pipe(
      findUserWithEmail,
      andThen((user) =>
        pipe(
          async () => {
            assert(user.password, 'The user does not have a password.');

            if (!(await validateCredential(password, user.password)))
              throw new Error('Invalid password');
          },
          andThen(() => pubsub.publish(USER_SIGNED_IN, user)),
          andThen(updateLastSignedIn),
          andThen(() => ({
            token: sign({userId: user.id}, APP_SECRET),
            user,
          })),
        )(),
      ),
    )();
  },
});

export const signInWithFacebook = mutationField('signInWithFacebook', {
  type: nonNull('AuthPayload'),
  args: {accessToken: nonNull(stringArg())},

  resolve: async (_parent, {accessToken}, ctx) => {
    const {
      id: facebookId,
      name,
      email,
      picture: {
        data: {url},
      },
    } = await verifyFacebookId(accessToken);

    return UserService.signInWithSocialAccount(
      {
        socialId: facebookId,
        authType: AuthType.facebook,
        name,
        email: email || '',
        photoURL: url,
      },
      ctx,
    );
  },
});

export const signInWithApple = mutationField('signInWithApple', {
  type: nonNull('AuthPayload'),
  args: {accessToken: nonNull(stringArg())},

  resolve: async (_parent, {accessToken}, ctx) => {
    assert(APPLE_CLIENT_ID, 'Missing Apple Client ID.');

    try {
      const {sub, email} = await verifyAppleToken({
        idToken: accessToken,
        clientId: APPLE_CLIENT_ID,
      });

      return UserService.signInWithSocialAccount(
        {
          socialId: sub,
          authType: AuthType.apple,
          name: '',
          email,
        },
        ctx,
      );
    } catch (err) {
      throw new Error(err);
    }
  },
});

export const signInWithGoogle = mutationField('signInWithGoogle', {
  type: nonNull('AuthPayload'),
  args: {accessToken: nonNull(stringArg())},

  resolve: async (_parent, {accessToken}, ctx) => {
    const {sub, email, name = '', picture} = await verifyGoogleId(accessToken);

    assert(email, 'No email returned from Google.');

    return UserService.signInWithSocialAccount(
      {
        socialId: sub,
        authType: AuthType.google,
        name,
        email,
        photoURL: picture,
      },
      ctx,
    );
  },
});

export const sendVerification = mutationField('sendVerification', {
  type: nonNull('Boolean'),
  args: {email: nonNull(stringArg())},

  resolve: async (_parent, {email}, ctx) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const verificationToken = sign(
        {email, type: 'verifyEmail'},
        ctx.appSecretEtc,
      );

      const html = getEmailVerificationHTML(verificationToken, ctx.request.req);

      assert(SENDGRID_EMAIL, 'Missing sendgrid email address.');

      const msg: MailDataRequired = {
        to: email,
        from: SENDGRID_EMAIL,
        subject: ctx.request.req.t('VERIFICATION_EMAIL_SUBJECT'),
        html,
      };

      await SendGridMail.send(msg);

      return true;
    }

    return false;
  },
});

export const updateProfile = mutationField('updateProfile', {
  type: 'User',
  args: {user: nonNull(UserUpdateInputType)},
  description:
    'Update user profile. Becareful that nullable fields will be updated either.',

  resolve: async (_parent, {user}, {prisma, pubsub, userId}) => {
    assert(userId, 'Not authorized.');

    const updated = await prisma.user.update({
      where: {id: userId},
      data: user,
    });

    pubsub.publish(USER_UPDATED, updated);

    return updated;
  },
});

export const findPassword = mutationField('findPassword', {
  type: nonNull('Boolean'),
  args: {email: nonNull(stringArg())},

  resolve: async (_parent, {email}, ctx) => {
    if (!email || !validateEmail(email))
      throw ErrorEmailNotValid(ErrorString.EmailNotValid);

    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw ErrorUserNotExists(ErrorString.UserNotExists);

    const verificationToken = sign(
      {email, type: 'findPassword'},
      ctx.appSecretEtc,
    );

    const password = generator.generate({
      length: 10,
      numbers: true,
    });

    const msg = {
      to: email,
      from: 'noreply@hackatalk.dev',
      subject: ctx.request.req.t('PASSWORD_RESET_EMAIL_SUBJECT'),
      html: getPasswordResetHTML(verificationToken, password, ctx.request.req),
    };

    try {
      await SendGridMail.send(msg);

      return true;
    } catch (err) {
      throw ErrorEmailSentFailed(ErrorString.EmailSentFailed);
    }
  },
});

export const changeEmailPassword = mutationField('changeEmailPassword', {
  type: 'Boolean',

  args: {
    password: nonNull(stringArg()),
    newPassword: nonNull(stringArg()),
  },

  resolve: async (_, {password, newPassword}, {prisma, userId}) => {
    assert(userId, 'Not authorized.');

    try {
      const user = await prisma.user.findUnique({
        where: {id: userId},
      });

      assert(user, 'Could not find current user in db.');
      assert(user.password, 'The user does not have a password.');

      const validate = await validateCredential(password, user.password);

      if (!validate) throw ErrorPasswordIncorrect('Password is incorrect');

      newPassword = await encryptCredential(newPassword);

      await prisma.user.update({
        where: {id: userId},
        data: {password: newPassword},
      });

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  },
});
