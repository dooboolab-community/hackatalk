export const initAsync = jest.fn(() => Promise.resolve());
export const askForPlayServicesAsync = jest.fn(() => Promise.resolve(true));
export const signInAsync = jest.fn(() =>
  Promise.resolve({
    type: 'success',
    user: {
      auth: {
        clientId: 'test',
        accessToken: 'aabb',
        accessTokenExpirationDate: 1562518153000,
      },
    },
  }),
);
export const signOutAsync = jest.fn(() => Promise.resolve());
