import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const photoOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
  if (permissionStatus === Permissions.PermissionStatus.GRANTED) {
    const result = await ImagePicker.launchCameraAsync(photoOptions);
    return result;
  }
  return null;
};

export const launchImageLibraryAsync = async (): Promise<ImagePicker.ImagePickerResult | null> => {
  const permissionStatus = await requestPermissions('photo');
  if (permissionStatus === Permissions.PermissionStatus.GRANTED) {
    const result = await ImagePicker.launchImageLibraryAsync(photoOptions);
    return result;
  }
  return null;
};
