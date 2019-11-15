import * as ImagePicker from '../ImagePicker';

describe('ImagePicker', () => {
  it('launchCameraAsync should return values', () => {
    ImagePicker.launchCameraAsync().then((result) => {
      expect(result).not.toBe(undefined);
    });
  });

  it('launchImageLibraryAsync should return values', () => {
    ImagePicker.launchImageLibraryAsync().then((result) => {
      expect(result).not.toBe(undefined);
    });
  });
});
