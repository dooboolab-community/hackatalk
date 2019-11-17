export const GoogleSignIn = {
  initAsync: jest.fn(() => Promise.resolve()),
  askForPlayServicesAsync: jest.fn(() => Promise.resolve(true)),
  signInAsync: jest.fn(() =>
    Promise.resolve({
      type: 'success',
      user: {
        auth: {
          clientId: 'testClient',
          accessToken: 'aabb',
          accessTokenExpirationDate: 1562518153000,
        },
      },
    }),
  ),
};
export const signOutAsync = jest.fn(() => Promise.resolve());

export const expoConstants = () => ({ appOwnership: 'expo' });
export const expoAppAuth = () => ({
  authAsync: jest.fn(() => Promise.resolve()),
});

export const AppAuth = { authAsync: jest.fn(() => Promise.resolve()) };
