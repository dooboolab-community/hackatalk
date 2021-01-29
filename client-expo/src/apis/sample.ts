import * as Config from '../../config';

const {ROOT_URL} = Config;

export const sample = async (
  body?: Record<string, unknown>,
  // signal?: AbortController['signal'],
): Promise<Response> => {
  const fetchOption = {
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
