import { NexusGenRootTypes } from '../../../src/generated/nexus';
import casual from 'casual';

const userEdges = [
  {
    cursor: 'Y2tld214NnhsMDEyM2lnYThnMjY2c2M2cw==',
    node: {
      id: 'ckewmx6xl0123iga8g266sc6s',
      email: 'test01@gmail.com',
    },
  },
  {
    cursor: 'Y2tld215NDRvMDEyN2lnYTgycjR1ejdjdQ==',
    node: {
      id: 'ckewmy44o0127iga82r4uz7cu',
      email: 'test02@gmail.com',
    },
  },
  {
    cursor: 'Y2tld215YmZ4MDEzMWlnYThsZGdnaXl3NA==',
    node: {
      id: 'ckewmybfx0131iga8ldggiyw4',
      email: 'test03@gmail.com',
    },
  },
];

export function user(): NexusGenRootTypes['User'] {
  return {
    id: 'cuid1',
    email: 'tester@dooboolab.com',
    name: 'tester',
    thumbURL: '',
    photoURL: '',
    nickname: '',
    phone: '',
    statusMessage: '',
    gender: 'Gender',
    verified: false,
    birthday: casual.date,
    lastSignedIn: casual.date,
    createdAt: casual.date,
    updatedAt: casual.date,
    deletedAt: casual.date,
  };
}

export function userConnection(first: number):
  NexusGenRootTypes['UserConnection'] {
  return {
    edges: userEdges.slice(0, first),
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };
}

export function authPayload(): NexusGenRootTypes['AuthPayload'] {
  return {
    token: 'testToken!',
    user: {
      id: 'cuid1',
      email: 'test@dooboolab.com',
      name: 'test',
      thumbURL: '',
      photoURL: '',
      nickname: '',
      phone: '',
      statusMessage: '',
      gender: 'Gender',
      verified: false,
      birthday: casual.date,
      lastSignedIn: casual.date,
      createdAt: casual.date,
      updatedAt: casual.date,
      deletedAt: casual.date,
    },
  };
}
