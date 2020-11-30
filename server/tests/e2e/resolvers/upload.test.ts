import * as azureUtils from '../../../src/utils/azure';

import FormData from 'form-data';
import fetch from 'node-fetch';
import { testHost } from '../testSetup';

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
        query: `
          mutation($file: Upload!) {
            singleUpload(file: $file) 
          }
        `,
        variables: {
          file: null,
        },
      }),
    );

    body.append('map', JSON.stringify({ 1: ['variables.file'] }));
    body.append('1', 'a', { filename: 'a.txt' });

    const response = await fetch(testHost, { method: 'POST', body });
    const jsonResult = await response.json();

    expect(jsonResult.data.singleUpload).toBe('/hackatalk/a.txt');
  });
});
