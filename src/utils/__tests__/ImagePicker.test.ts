/*eslint-disable */
import 'react-native';
import * as ImagePicker from '../ImagePicker';

jest.mock('expo-permissions', () => ({
  ...require.requireActual('expo-permissions'),
  askAsync: jest.fn(),
}));

import { askAsync } from 'expo-permissions';

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: (): string => 'photo info',
  launchImageLibraryAsync: (): string => 'photo info',
}));

describe('ImagePicker interaction', () => {
  it('launchCameraAsync should return photo info when permission is granted', async () => {
    // @ts-ignore
    askAsync.mockReturnValueOnce({
      status: 'granted',
    });
    const result = await ImagePicker.launchCameraAsync();
    expect(result).toBe('photo info');
  });

  it('launchImageLibraryAsync should return photo info when permission is granted', async () => {
    // @ts-ignore
    askAsync.mockReturnValueOnce({
      status: 'granted',
    });
    const result = await ImagePicker.launchImageLibraryAsync();
    expect(result).toBe('photo info');
  });

  it('launchCameraAsync should not return photo info when permission is not granted', async () => {
    // @ts-ignore
    askAsync.mockReturnValueOnce({
      status: 'denied',
    });
    const result = await ImagePicker.launchCameraAsync();
    expect(result).toBe(null);
  });

  it('launchImageLibraryAsync should not return photo info when permission is not granted', async () => {
    // @ts-ignore
    askAsync.mockReturnValueOnce({
      status: 'denied',
    });
    const result = await ImagePicker.launchImageLibraryAsync();
    expect(result).toBe(null);
  });
});
