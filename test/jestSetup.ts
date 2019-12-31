/* global jest */
// @ts-ignore
global.fetch = jest.fn().mockImplementation(() => {
  return new Promise((resolve): void => {
    resolve({
      json: function() {
        return { id: 1 };
      },
      text: async () => '{}',
    });
  });
});
