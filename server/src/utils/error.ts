import {ApolloError} from 'apollo-server-core';

// eslint-disable-next-line no-shadow
export enum ErrorString {
  UserNotExists = 'USER_NOT_EXISTS',
  UserNotSignedIn = 'USER_NOT_SIGNED_IN',
  PasswordIncorrect = 'PASSWORD_INCORRECT',
  EmailUserExists = 'EMAIL_USER_EXISTS',
  EmailSentFailed = 'EMAIL_SENT_FAILED',
  EmailNotValid = 'EMAIL_NOT_VALID',
  UrlNotValid = 'URL_NOT_VALID',
}

export const ErrorEmailNotVerified = (message: string): ApolloError =>
  new ApolloError(message, 'EMAIL_NOT_VERIFIED', {
    parameter: 'verified',
  });

export const ErrorPasswordIncorrect = (message: string): ApolloError =>
  new ApolloError(message, 'PASSWORD_NOT_CORRECT', {
    parameter: 'password',
  });

export const ErrorEmailSentFailed = (message: string): ApolloError =>
  new ApolloError(message, 'EMAIL_SENT_FAILED', {
    parameter: 'email',
  });

export const ErrorUserNotExists = (message: string): ApolloError =>
  new ApolloError(message, 'EMAIL_USER_NOT_EXISTS', {
    parameter: 'email',
  });

export const ErrorEmailNotValid = (message: string): ApolloError =>
  new ApolloError(message, 'EMAIL_VALIDATION', {
    parameter: 'email',
  });

export const ErrorEmailUserExists = (message: string): ApolloError =>
  new ApolloError(message, 'EMAIL_USER_EXISTS', {
    parameter: 'email',
  });
