import { NexusGenRootTypes } from '../../../src/generated/nexus';
import casual from 'casual';

export function user(): NexusGenRootTypes['User'] {
  return {
    id: 'cuid1',
    email: 'jerry@hackatalk.com',
    name: 'jerry',
    thumbURL: '',
    photoURL: '',
    nickname: '',
    gender: 'Gender',
    phone: '',
    statusMessage: '',
    verified: false,
    birthday: casual.date,
    lastSignedIn: casual.date,
    createdAt: casual.date,
    updatedAt: casual.date,
    deletedAt: casual.date,
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
      nickname: '',
      gender: 'Gender',
      phone: '',
      statusMessage: '',
      verified: false,
      birthday: casual.date,
      lastSignedIn: casual.date,
      createdAt: casual.date,
      updatedAt: casual.date,
      deletedAt: casual.date,
    },
  };
}
