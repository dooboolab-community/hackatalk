import 'react-native';
import * as ImagePicker from '../ImagePicker';

jest.mock('expo-permissions', () => {
  return {
    askAsync: (): { status: string } => ({
      status: 'granted',
    }),
  };
});

describe('ImagePicker interaction', () => {
  it('launchCameraAsync return photo infos', async () => {
    const result = await ImagePicker.launchCameraAsync();
    console.log('result', result);
  });

  it('launchImageLibraryAsync return photo infos', async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    console.log('result', result);
  });
});
