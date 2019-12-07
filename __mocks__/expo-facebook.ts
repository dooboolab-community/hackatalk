export const logInWithReadPermissionsAsync = (): Promise<object> => {
  return new Promise((resolve, reject): void => {
    resolve({ type: 'success', token: 'testToken' });
  });
};
