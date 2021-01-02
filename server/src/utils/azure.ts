import AzureStorage, { BlobService } from 'azure-storage';

import { assert } from './assert';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import stream from 'stream';

// eslint-disable-next-line
require('dotenv').config();

const { STORAGE_ACCOUNT, STORAGE_KEY } = process.env;

const blobService =
  STORAGE_ACCOUNT && STORAGE_KEY
    ? AzureStorage.createBlobService(STORAGE_ACCOUNT, STORAGE_KEY)
    : undefined;

export const uploadFileToAzureBlobFromStream = (
  inputStream: stream.Readable,
  destFile: string,
  destDir: string,
  container: string,
): Promise<BlobService.BlobResult> => {
  assert(blobService, 'Azure Storage is not initialized.');

  return new Promise((resolve, reject) => {
    inputStream.pipe(
      blobService.createWriteStreamToBlockBlob(
        container,
        `${destDir}${destFile}`,
        (error, resultUpload) => {
          if (!error) {
            resolve(resultUpload);

            return;
          }

          reject(error);
        },
      ),
    );
  });
};

export const uploadFileToAzureBlobFromFile = (
  container: string,
  file: string,
  destFile: string,
  destDir: string,
): Promise<BlobService.BlobResult> => {
  assert(blobService, 'Azure Storage is not initialized.');

  return new Promise((resolve, reject) => {
    blobService.createBlockBlobFromLocalFile(
      container,
      `${destDir}${destFile}`,
      file,
      (error, resultUpload) => {
        if (!error) {
          resolve(resultUpload);

          return;
        }

        reject(error);
      },
    );
  });
};

export const deleteFileFromAzureBlob = (
  destFile: string,
  destDir: string,
): Promise<boolean> => {
  assert(blobService, 'Azure Storage is not initialized.');

  return new Promise((resolve, reject) => {
    blobService.deleteBlobIfExists(destDir, destFile, (error, resultUpload) => {
      if (!error) {
        resolve(resultUpload);

        return;
      }

      reject(error);
    });
  });
};

export const getURL = (
  container: string,
  blob?: string,
  sasToken?: string,
  primary?: boolean,
  snapshotId?: string,
): string => {
  assert(blobService, 'Azure Storage is not initialized.');

  return blobService.getUrl(container, blob, sasToken, primary, snapshotId);
};
