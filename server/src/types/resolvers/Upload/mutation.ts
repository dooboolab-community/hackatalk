import { mutationField, stringArg } from '@nexus/schema';

import { uploadFileToAzureBlobFromStream } from '../../../utils/azure';

export const singleUpload = mutationField('singleUpload', {
  type: 'String',
  nullable: true,
  args: {
    file: 'Upload',
    dir: stringArg(),
  },
  resolve: async (parent, args) => {
    const { STORAGE_ENDPOINT } = process.env;

    const dir = args.dir ? `hackatalk${args.dir}` : 'hackatalk';
    const file = await args.file;
    const { filename } = file;

    const stream = file.createReadStream();

    try {
      await uploadFileToAzureBlobFromStream(stream, filename, dir);
    } catch (err) {
      throw new Error(err);
    }

    return `${STORAGE_ENDPOINT}/${dir}/${filename}`;
  },
});
