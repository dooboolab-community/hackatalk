import * as Config from '../../config';

import AsyncStorage from '@react-native-community/async-storage';

export const uploadImageAsync = async (uri: string, dir:string): Promise<Response> => {
  const fileName = uri.split('/').pop() || '';
  const fileTypeMatch = /\.(\w+)$/.exec(fileName);
  const fileType = fileTypeMatch ? `image/${fileTypeMatch[1]}` : 'image';
  const data: FormData = new FormData();
  const token = await AsyncStorage.getItem('token');

  data.append('inputFile', {
    uri: uri,
    type: fileType,
    name: fileName,
  });

  data.append('dir', dir);

  const fetchOption: RequestInit = {
    method: 'POST',
    body: data,
    headers: new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  };

  try {
    const res: Response = await fetch(`${Config.ROOT_URL}/upload_single`, fetchOption);

    return res;
  } catch (err) {
    throw new Error(err);
  }
};
