import * as ImagePicker from 'expo-image-picker';

import {Platform} from 'react-native';

enum MediaTypeOptions {
  All = 'All',
  Videos = 'Videos',
  Images = 'Images',
}

const photoOptions = {
  mediaType: MediaTypeOptions.Images,
  allowsEditing: true,
  exif: true,
};

const requestPermissions = async (
  type: 'photo' | 'camera',
): Promise<ImagePicker.CameraPermissionResponse['granted']> => {
  if (type === 'camera') {
    if (Platform.OS === 'web') {
      const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();

      return granted;
    }

    const {granted} = await ImagePicker.requestCameraPermissionsAsync();

    return granted;
  }

  const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();

  return granted;
};

export const launchCameraAsync = async (): Promise<ImagePicker.ImagePickerResult | null> => {
  const granted = await requestPermissions('camera');

  if (granted) return ImagePicker.launchCameraAsync(photoOptions);

  return null;
};

export const launchImageLibraryAsync = async (): Promise<ImagePicker.ImagePickerResult | null> => {
  const granted = await requestPermissions('photo');

  if (granted) return ImagePicker.launchImageLibraryAsync(photoOptions);

  return null;
};
