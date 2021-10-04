import 'react-native';

import * as ExImagePiacker from 'expo-image-picker';
import * as ImagePicker from '../ImagePicker';

jest.mock('expo-image-picker', () => ({
  ...jest.requireActual('expo-image-picker'),
  requestMediaLibraryPermissionsAsync: () => Promise.resolve({granted: true}),
  launchCameraAsync: () => Promise.resolve(null),
  launchImageLibraryAsync: () => Promise.resolve(null),
}));

describe('ImagePicker interaction', () => {
  describe('Permission is granted', () => {
    // it('launchCameraAsync should return photo info when permission is granted', async () => {
    //   jest
    //     .spyOn(ExImagePiacker, 'requestCameraPermissionsAsync')
    //     // @ts-ignore
    //     .mockResolvedValue({granted: true});

    //   const result = await ImagePicker.launchCameraAsync();

    //   expect(result).toBe(null);
    // });

    it('launchImageLibraryAsync should return photo info when permission is granted', async () => {
      jest
        .spyOn(ExImagePiacker, 'requestMediaLibraryPermissionsAsync')
        // @ts-ignore
        .mockResolvedValue({granted: true});

      const result = await ImagePicker.launchMediaLibraryAsync(true);

      expect(result).toBe(null);
    });
  });

  describe('Permission is not granted', () => {
    // it('launchCameraAsync should not return photo info when permission is not granted', async () => {
    //   jest
    //     .spyOn(ExImagePiacker, 'requestCameraPermissionsAsync')
    //     // @ts-ignore
    //     .mockResolvedValue({granted: false});

    //   const result = await ImagePicker.launchCameraAsync();

    //   expect(result).toBe(null);
    // });

    it('launchImageLibraryAsync should not return photo info when permission is not granted', async () => {
      jest
        .spyOn(ExImagePiacker, 'requestMediaLibraryPermissionsAsync')
        // @ts-ignore
        .mockResolvedValue({granted: false});

      const result = await ImagePicker.launchMediaLibraryAsync();

      expect(result).toBe(null);
    });
  });
});
