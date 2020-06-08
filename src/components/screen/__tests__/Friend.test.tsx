// import * as ProfileContext from '../../../providers/ProfileModalProvider';

import React, { ReactElement } from 'react';
import { act, cleanup, render, wait } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Friend from '../Friend';

// const mocks = [
//   {
//     request: {
//       query: QUERY_FRIENDS,
//     },
//     result: {
//       data: {
//         friends: [
//           {
//             id: '1',
//             email: 'admin@hackatalk.dev',
//             nickname: 'admin',
//             birthday: '2020-03-29T04:59:21.967Z',
//             name: 'admin',
//             thumbURL:
//               'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
//             photoURL:
//               'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
//             statusMessage: 'hello',
//             verified: true,
//             authType: 'EMAIL',
//             isOnline: true,
//           },
//           {
//             id: '2',
//             email: 'parkopp@gmail.com',
//             nickname: 'geoseong',
//             birthday: '2020-03-29T04:59:21.967Z',
//             name: 'geoseong',
//             thumbURL:
//               'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
//             photoURL:
//               'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
//             statusMessage: 'hello baby',
//             verified: true,
//             authType: 'EMAIL',
//             isOnline: false,
//           },
//         ],
//       },
//     },
//   },
// ];

describe('[Friend] rendering test', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  beforeEach(() => {
    props = createTestProps();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders as expected', async () => {
    const component = createTestElement(
      <Friend {...props} />,
    );

    const testingLib = render(component);
    testingLib.rerender(component);
    expect(testingLib.asJSON()).toBeTruthy();
    expect(testingLib.asJSON()).toMatchSnapshot();
  });

  it('renders loading', () => {
    const component = createTestElement(
      <Friend {...props} />,
    );

    const { baseElement } = render(component);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders error view', async () => {
    // const errorMock = {
    //   request: { query: QUERY_FRIENDS },
    //   error: new Error('error'),
    // };

    const component = createTestElement(
      <Friend {...props} />,
    );

    const testingLib = render(component);
    testingLib.rerender(component);
    expect(testingLib.asJSON()).toBeTruthy();
    expect(testingLib.asJSON()).toMatchSnapshot();
  });
});
