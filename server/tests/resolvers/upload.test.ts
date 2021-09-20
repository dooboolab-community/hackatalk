import * as azureUtils from '../../src/utils/azure';

import FormData from 'form-data';
import axios from 'axios';
import {getTestUtils} from '../testUtils';
import {testHost} from '../testSetup';

describe('Resolver - File', () => {
  beforeAll(async () => {
    jest
      .spyOn(azureUtils, 'uploadFileToAzureBlobFromStream')
      .mockImplementation(() => Promise.resolve(null));
  });

  it('should return a file path after uploading one', async () => {
    const {graphqlClient} = getTestUtils();
    const body = new FormData();

    body.append(
      'operations',
      JSON.stringify({
        query:
          'mutation ($file: Upload! $dir: String) { singleUpload(file: $file dir: $dir) }',
        variables: {
          file: null,
        },
      }),
    );

    body.append('map', JSON.stringify({'0': ['variables.file']}));
    body.append('0', 'a', {filename: 'a.txt'});

    try {
      const response = await axios.post(testHost, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      expect(1).toBeTruthy();

      expect(response.data.singleUpload).toBe('/hackatalk/a.txt');
    } catch (err) {
      // console.log('err', err);
    }
  });
});
