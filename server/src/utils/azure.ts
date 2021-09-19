import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

import Stream from 'stream';
import {assert} from './assert';

// eslint-disable-next-line
require('dotenv').config();

const {STORAGE_ACCOUNT, STORAGE_KEY} = process.env;

const blobService =
  STORAGE_ACCOUNT && STORAGE_KEY
    ? new BlobServiceClient(
        `https://${STORAGE_ACCOUNT}.blob.core.windows.net`,
        new StorageSharedKeyCredential(STORAGE_ACCOUNT, STORAGE_KEY),
      )
    : undefined;

export function resolveBlobName(destFile: string, destDir: string): string {
  destDir = destDir ? `${destDir}/` : '';

  return `${destDir}${destFile}}`;
}

/**
 * Upload a file stream to Azure Storage.
 * @param stream Stream to be uploaded.
 * @param destFile Destination file name.
 * @param destDir Destination directory name.
 * @param containerName Azure storage container name. This should be created on the server-side before using.
 * @returns Azure Storage URL.
 */
export const uploadFileToAzureBlobFromStream = async (
  stream: Stream.Readable,
  destFile: string,
  destDir: string,
  containerName: string,
): Promise<string> => {
  try {
    assert(blobService, 'Azure Storage is not initialized.');

    assert(containerName, 'Missing environment variable containerName');

    const blockBlobClient = blobService
      .getContainerClient(containerName)
      .getBlockBlobClient(resolveBlobName(destFile, destDir));

    await blockBlobClient.uploadStream(stream);

    return blockBlobClient.url;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

/**
 * Upload a file to Azure Storage.
 * @param file Path to the file to be uploaded.
 * @param destFile destination file name.
 * @param destDir Destination directory name.
 * @param containerName Azure storage container name. This should be created on the server-side before using.
 * @returns Azure Storage URL.
 */
export const uploadFileToAzureBlobFromFile = async (
  file: string,
  destFile: string,
  destDir: string,
  containerName: string,
): Promise<string> => {
  assert(blobService, 'Azure Storage is not initialized.');

  assert(containerName, 'Missing environment variable containerName');

  const blockBlobClient = blobService
    .getContainerClient(containerName)
    .getBlockBlobClient(resolveBlobName(destFile, destDir));

  await blockBlobClient.uploadFile(file);

  return blockBlobClient.url;
};
