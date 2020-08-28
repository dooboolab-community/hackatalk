import { User } from '../types';

export function userSample(): User[] {
  return [
    {
      id: '1',
      email: 'jerry@dooboolab.com',
      password: 'jerry123!',
      name: 'jerry',
    },
    {
      id: '2',
      email: 'dean@dooboolab.com',
      password: 'dean123!',
      name: 'dean',
    },
  ];
}
