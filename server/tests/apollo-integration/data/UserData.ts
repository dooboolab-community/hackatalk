import { NexusGenRootTypes } from '../../../src/generated/nexus';

export function user(): NexusGenRootTypes['User'] {
  return {
    id: 'cuid1',
    email: 'jerry@hackatalk.com',
    name: 'jerry',
    thumbURL: '',
    photoURL: '',
    birthday: 'DataTime',
    nickname: '',
    gender: 'Gender',
    phone: '',
    statusMessage: '',
    verified: false,
    lastSignedIn: 'DataTime',
    createdAt: 'DateTime',
    updatedAt: 'DateTime',
    deletedAt: 'DateTime',
  };
}

export function authPayload(): NexusGenRootTypes['AuthPayload'] {
  return {
    token: 'jerryToken!',
    user: {
      id: 'cuid1',
      email: 'jerry@hackatalk.com',
      name: 'jerry',
      thumbURL: '',
      photoURL: '',
      birthday: 'DataTime',
      nickname: '',
      gender: 'Gender',
      phone: '',
      statusMessage: '',
      verified: false,
      lastSignedIn: 'DataTime',
      createdAt: 'DateTime',
      updatedAt: 'DateTime',
      deletedAt: 'DateTime',
    },
  };
}
