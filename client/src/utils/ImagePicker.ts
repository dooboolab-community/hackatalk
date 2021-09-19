import * as ImagePicker from 'expo-image-picker';

import {Platform} from 'react-native';

const photoOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  exif: true,
};

const videoOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  allowsEditing: true,
  allowsMultipleSelection: true,
  videoMaxDuration: 300,
};

const requestPermissions = async (
  type: 'photo' | 'camera' | 'video',
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

export const launchCameraAsync =
  async (): Promise<ImagePicker.ImagePickerResult | null> => {
    const granted = await requestPermissions('camera');

    if (granted) return ImagePicker.launchCameraAsync(videoOptions);

    return null;
  };

export const launchImageLibraryAsync =
  async (): Promise<ImagePicker.ImagePickerResult | null> => {
    const granted = await requestPermissions('photo');

    if (granted) return ImagePicker.launchImageLibraryAsync(photoOptions);

    return null;
  };

export const launchVideoLibraryAsync =
  async (): Promise<ImagePicker.ImagePickerResult | null> => {
    const granted = await requestPermissions('video');

    if (granted) return ImagePicker.launchImageLibraryAsync(videoOptions);

    return null;
  };
