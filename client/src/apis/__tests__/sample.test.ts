import * as Config from '../../../config';

import { FetchMock } from 'jest-fetch-mock';
import { sample } from '../sample';

const { ROOT_URL } = Config;

const fetchMock = fetch as FetchMock;

describe('testing sample api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch sample and returns data to me', (): Promise<Response | void> => {
    const mockedResult = JSON.stringify({ data: '12345' });
    fetchMock.mockResponseOnce(mockedResult);

    return sample({ zoyi: 'zoyi' }).then(async (res) => {
      const result = await res.text();
      expect(result).toEqual(mockedResult);

      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(`${ROOT_URL}/sample`);
    });
  });

  it('throws an error if object is null', () => {
    const onResponse = jest.fn();
    const onError = jest.fn();

    sample()
      .then(onResponse)
      .catch(onError)
      .then(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
      });
  });

  it('throws an error if error occurs', () => {
    fetchMock.mockRejectedValue(new Error('error'));
    // fetchMock.mockResponseOnce(() =>
    //   sample(null).then(() => Promise.reject(new Error())),
    // );
    const onResponse = jest.fn();
    const onError = jest.fn();

    sample({})
      .then(onResponse)
      .catch(onError)
      .then(() => {
        expect(onResponse).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalled();
      });
  });
});
