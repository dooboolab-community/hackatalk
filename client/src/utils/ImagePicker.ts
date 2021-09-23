import * as ImagePicker from 'expo-image-picker';

import {Platform} from 'react-native';

export enum ImagePickerType {
  LIBRARY = 'library',
  CAMERA = 'camera',
}

const options: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  videoMaxDuration: 180,
  videoExportPreset: ImagePicker.VideoExportPreset.MediumQuality,
};

const requestPermissions = async (
  type: ImagePickerType,
): Promise<ImagePicker.CameraPermissionResponse['granted']> => {
  if (type === ImagePickerType.CAMERA) {
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
    const granted = await requestPermissions(ImagePickerType.CAMERA);

    if (granted) return ImagePicker.launchCameraAsync(options);

    return null;
  };

export const launchMediaLibraryAsync = async (
  photoOnly?: boolean,
): Promise<ImagePicker.ImagePickerResult | null> => {
  const granted = await requestPermissions(ImagePickerType.LIBRARY);

  if (granted)
    return ImagePicker.launchImageLibraryAsync({
      ...options,
      ...(photoOnly && {mediaTypes: ImagePicker.MediaTypeOptions.Images}),
    });

  return null;
};
