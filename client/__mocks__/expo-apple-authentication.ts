export { AppleAuthenticationScope, AppleAuthenticationCredential } from 'expo-apple-authentication';

export const isAvailableAsync = jest.fn(() => Promise.resolve(true));
export const signInAsync = jest.fn(() =>
  Promise.resolve({
    user: 'uniqueUserId',
    identityToken: 'identityToken',
    realUserStatus: 1,
    authorizationCode: 'authorizationCode',
    fullName:
      {
        namePrefix: null,
        givenName: 'GivenName',
        nameSuffix: null,
        nickname: null,
        familyName: 'FamilyName',
        middleName: null,
      },
    email: 'email@privaterelay.appleid.com',
    state: null,
  }),
);
