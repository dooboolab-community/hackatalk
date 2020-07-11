import {
  ApolloError,
  UserInputError,
  ValidationError,
} from 'apollo-server-core';

export enum ErrorString {
  UserNotExists = 'User does not exists',
  UserNotSignedIn = 'User is not signed in',
  PasswordIncorrect = 'Password is not correct',
  EmailForUserExists = 'Email for current user is already signed up.',
  EmailSentFailed = 'Email sent failed',
  EmailNotValid = 'Not a valid email address',
  UrlNotValid = 'Url is not a valid url. It should start with http.',
  FirstLastNotSupported = 'Passing both `first` and `last` is not supported.',
}

export const ErrorEmailNotVerified =
  (message: string): ApolloError => new ApolloError(
    message,
    'EMAIL_NOT_VERIFIED', {
      parameter: 'verified',
    });

export const ErrorPasswordIncorrect =
  (message: string): ApolloError => new ApolloError(
    message,
    'PASSWORD_NOT_CORRECT', {
      parameter: 'password',
    });

export const ErrorEmailSentFailed =
  (message: string): ApolloError => new ApolloError(
    message,
    'EMAIL_SENT_FAILED', {
      parameter: 'email',
    });

export const ErrorEmailNotValid =
  (message: string): ApolloError => new ApolloError(
    message,
    'EMAIL_VALIDATION', {
      parameter: 'email',
    });

export const ErrorEmailForUserExists =
  (message: string): ApolloError => new ApolloError(
    message,
    'EMAIL_FOR_USER_EXISTS', {
      parameter: 'email',
    });
