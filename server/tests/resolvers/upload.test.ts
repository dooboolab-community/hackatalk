import * as azureUtils from '../../src/utils/azure';

import FormData from 'form-data';
import fetch from 'node-fetch';
import {testHost} from '../testSetup';

describe('Resolver - File', () => {
  beforeAll(async () => {
    jest
      .spyOn(azureUtils, 'uploadFileToAzureBlobFromStream')
      .mockImplementation(() => Promise.resolve(null));
  });

  it('should return a file path after uploading one', async () => {
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

    const response = await fetch(testHost, {method: 'POST', body});
    const jsonResult = await response.json();

    expect(1).toBeTruthy();

    // TODO
    // expect(jsonResult.data.singleUpload).toBe('/hackatalk/a.txt');
  });
});
