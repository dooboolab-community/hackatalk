import 'react-native';

import * as ImagePicker from '../ImagePicker';

import {askAsync} from 'expo-permissions';

jest.mock('expo-permissions', () => ({
  // @ts-ignore
  ...jest.requireActual('expo-permissions'),
  askAsync: jest.fn(),
}));

jest.mock('expo-image-picker', () => ({
  launchCameraAsync: (): Promise<string> => Promise.resolve('photo info'),
  launchImageLibraryAsync: (): Promise<string> => Promise.resolve('photo info'),
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
