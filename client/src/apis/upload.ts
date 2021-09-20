import * as Config from '../../config';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import mime from 'mime';

export const uploadImageAsync = async (
  uri: string,
  dir: string,
  fileNamePrefix: string = '',
): Promise<Response> => {
  const fileName = uri.split('/').pop();
  const fileType = mime.getType(uri);
  console.log(fileType);

  const data: FormData = new FormData();
  const token = await AsyncStorage.getItem('token');

  data.append('dir', dir);
  data.append('name', `${fileName}${fileNamePrefix}`);

  if (Platform.OS === 'web') {
    const byteString = atob(uri.split(',')[1]);

    const ab = new ArrayBuffer(byteString.length);
    const arr = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++)
      arr[i] = byteString.charCodeAt(i);

    const blob = new Blob([arr], {
      type: fileType || 'image/png',
    });

    const file = new File([blob], `${fileName}${fileNamePrefix}`);

    data.append('inputFile', file);
  } else
    data.append('inputFile', {
      // @ts-ignore
      uri,
      type: fileType || 'image/png',
      name: `${fileName}${fileNamePrefix}`,
    });

  const fetchOption = {
    method: 'POST',
    body: data,
    headers: Platform.select({
      web: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      default: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }),
  };

  try {
    const res: Response = await fetch(
      `${Config.ROOT_URL}/upload_single`,
      // @ts-ignore
      fetchOption,
    );

    return res;
  } catch (err: any) {
    console.log('upload err:', err);
    throw new Error(err);
  }
};
