export const makeRedirectUri = jest.fn(() => Promise.resolve('https'));

export const useAuthRequest = (): Record<string, unknown> => ({
  request: {
    makeAuthUrlAsync: jest.fn(),
  },
});

export const useAutoDiscovery = jest.fn();

export const ResponseType = (): Record<string, unknown> => ({
  Token: jest.mock,
});

export const startAsync = (): Record<string, unknown> => ({
  authUrl: 'https://',
  returnUrl: 'hackatalk://',
});

export const Prompt = (): Record<string, unknown> => ({
  SelectAcount: jest.mock,
});
