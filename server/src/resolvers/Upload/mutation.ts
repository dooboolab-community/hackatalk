import { mutationField, stringArg } from '@nexus/schema';

import { uploadFileToAzureBlobFromStream } from '../../utils/azure';

export const singleUpload = mutationField('singleUpload', {
  type: 'String',

  description:
    'Provide `dir` optionally, Upload single file to the server with graphql-upload',

  args: {
    file: 'Upload',
    dir: stringArg(),
  },

  resolve: async (parent, args) => {
    const { STORAGE_ENDPOINT } = process.env;
    const container = 'hackatalk';
    const dir = args.dir ? `${args.dir}/` : '';

    const file = await args.file;
    const { filename } = file;

    const stream = file.createReadStream();

    try {
      await uploadFileToAzureBlobFromStream(stream, filename, dir, container);
    } catch (err) {
      throw new Error(err);
    }

    return `${STORAGE_ENDPOINT}/${container}/${dir}${filename}`;
  },
});
