import Config from 'react-native-config';

const { ROOT_URL } = Config;

export const sample = async (
  body: object,
  // signal?: AbortController['signal'],
): Promise<Response> => {
  const fetchOption: RequestInit = {
    // signal,
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  };

  try {
    const res: Response = await fetch(`${ROOT_URL}/sample`, fetchOption);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};
