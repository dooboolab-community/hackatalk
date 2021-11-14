import * as ImagePicker from 'expo-image-picker';

import {Platform} from 'react-native';

export enum ImagePickerType {
  LIBRARY = 'library',
  CAMERA = 'camera',
}

enum MediaTypeOptions {
  All = 'All',
  Videos = 'Videos',
  Images = 'Images',
}

enum VideoExportPreset {
  Passthrough = 0,
  LowQuality = 1,
  MediumQuality = 2,
  HighestQuality = 3,
  H264_640x480 = 4,
  H264_960x540 = 5,
  H264_1280x720 = 6,
  H264_1920x1080 = 7,
  H264_3840x2160 = 8,
  HEVC_1920x1080 = 9,
  HEVC_3840x2160 = 10,
}

const options: ImagePicker.ImagePickerOptions = {
  mediaTypes: MediaTypeOptions.All,
  allowsEditing: true,
  videoMaxDuration: 180,
  videoExportPreset: VideoExportPreset.MediumQuality,
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

    if (granted) {
      return ImagePicker.launchCameraAsync(options);
    }

    return null;
  };

export const launchMediaLibraryAsync = async (
  photoOnly?: boolean,
): Promise<ImagePicker.ImagePickerResult | null> => {
  const granted = await requestPermissions(ImagePickerType.LIBRARY);

  if (granted) {
    return ImagePicker.launchImageLibraryAsync({
      ...options,
      ...(photoOnly && {mediaTypes: MediaTypeOptions.Images}),
    });
  }

  return null;
};
