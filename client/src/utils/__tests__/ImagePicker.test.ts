import 'react-native';

import * as ExImagePiacker from 'expo-image-picker';
import * as ImagePicker from '../ImagePicker';

jest.mock('expo-image-picker', () => ({
  ...jest.requireActual('expo-image-picker'),
  requestMediaLibraryPermissionsAsync: () => Promise.resolve({status: true}),
  launchCameraAsync: () => Promise.resolve(null),
  launchImageLibraryAsync: () => Promise.resolve(null),
}));

describe('ImagePicker interaction', () => {
  describe('Permission is granted', () => {
    it('launchCameraAsync should return photo info when permission is granted', async () => {
      jest
        .spyOn(ExImagePiacker, 'requestCameraPermissionsAsync')
        // @ts-ignore
        .mockResolvedValue({
          status: ExImagePiacker.PermissionStatus.GRANTED,
        });

      const result = await ImagePicker.launchCameraAsync();

      expect(result).toBe(null);
    });

    it('launchImageLibraryAsync should return photo info when permission is granted', async () => {
      jest
        .spyOn(ExImagePiacker, 'requestCameraPermissionsAsync')
        // @ts-ignore
        .mockResolvedValue({
          status: ExImagePiacker.PermissionStatus.GRANTED,
        });

      const result = await ImagePicker.launchImageLibraryAsync();

      expect(result).toBe(null);
    });
  });

  describe('Permission is not granted', () => {
    it('launchCameraAsync should not return photo info when permission is not granted', async () => {
      jest
        .spyOn(ExImagePiacker, 'requestCameraPermissionsAsync')
        // @ts-ignore
        .mockResolvedValue({
          status: ExImagePiacker.PermissionStatus.DENIED,
        });

      const result = await ImagePicker.launchCameraAsync();

      expect(result).toBe(null);
    });

    it('launchImageLibraryAsync should not return photo info when permission is not granted', async () => {
      jest
        .spyOn(ExImagePiacker, 'requestCameraPermissionsAsync')
        // @ts-ignore
        .mockResolvedValue({
          status: ExImagePiacker.PermissionStatus.DENIED,
        });

      const result = await ImagePicker.launchImageLibraryAsync();

      expect(result).toBe(null);
    });
  });
});
