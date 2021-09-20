import * as ImagePicker from 'expo-image-picker';

import {Platform} from 'react-native';

export enum MessageOptionMediaType {
  PHOTO = 'photo',
  CAMERA = 'camera',
  VIDEO = 'video',
}

const photoOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  exif: true,
};

const videoOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  allowsEditing: true,
  // allowsMultipleSelection: true,
  videoMaxDuration: 300,
  videoExportPreset: ImagePicker.VideoExportPreset.H264_640x480,
};

const requestPermissions = async (
  type: MessageOptionMediaType,
): Promise<ImagePicker.CameraPermissionResponse['granted']> => {
  if (type === MessageOptionMediaType.CAMERA) {
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
    const granted = await requestPermissions(MessageOptionMediaType.CAMERA);

    if (granted) return ImagePicker.launchCameraAsync(videoOptions);

    return null;
  };

export const launchMediaLibraryAsync = async (
  type: MessageOptionMediaType,
): Promise<ImagePicker.ImagePickerResult | null> => {
  const granted = await requestPermissions(type);

  if (granted)
    return ImagePicker.launchImageLibraryAsync(
      type === 'photo' ? photoOptions : videoOptions,
    );

  return null;
};
