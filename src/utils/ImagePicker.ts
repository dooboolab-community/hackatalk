import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

enum MediaTypeOptions {
  All = 'All',
  Videos = 'Videos',
  Images = 'Images',
}

enum PermissionStatus {
  UNDETERMINED = 'undetermined',
  GRANTED = 'granted',
  DENIED = 'denied',
}

const photoOptions = {
  mediaType: MediaTypeOptions.Images,
  allowsEditing: true,
  exif: true,
};

const requestPermissions = async (
  type: string,
): Promise<Permissions.PermissionStatus> => {
  if (type === 'photo') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    return status;
  }
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status;
};

export const launchCameraAsync = async (): Promise<ImagePicker.ImagePickerResult | null> => {
  const permissionStatus = await requestPermissions('camera');
  if (permissionStatus === PermissionStatus.GRANTED) {
    return ImagePicker.launchCameraAsync(photoOptions);
  }
  return null;
};

export const launchImageLibraryAsync = async (): Promise<ImagePicker.ImagePickerResult | null> => {
  const permissionStatus = await requestPermissions('photo');
  if (permissionStatus === PermissionStatus.GRANTED) {
    return ImagePicker.launchImageLibraryAsync(photoOptions);
  }
  return null;
};
