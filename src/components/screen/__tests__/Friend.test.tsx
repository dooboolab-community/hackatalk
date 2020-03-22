// import * as ProfileContext from '../../../providers/ProfileModalProvider';

import React, { ReactElement } from 'react';
import { act, cleanup, render, wait } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Friend from '../Friend';
import { MockedProvider } from '@apollo/react-testing';
import { QUERY_FRIENDS } from '../../../graphql/queries';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;

const mocks = [
  {
    request: {
      query: QUERY_FRIENDS,
    },
    result: {
      data: {
        friends: [
          {
            id: '1',
            nickname: 'admin',
            name: 'admin',
            thumbURL:
              'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
            photoURL:
              'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
            statusMessage: 'hello',
            isOnline: true,
          },
          {
            id: '2',
            nickname: 'geoseong',
            name: 'geoseong',
            thumbURL:
              'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
            photoURL:
              'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
            statusMessage: 'hello baby',
            isOnline: false,
          },
        ],
      },
    },
  },
];

describe('[Friend] rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders as expected', async () => {
    component = createTestElement(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Friend {...props} />
      </MockedProvider>,
    );

    const testingLib = render(component);
    await wait(() => {
      testingLib.rerender(component);
      expect(testingLib.asJSON()).toBeTruthy();
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
    await act(() => wait());
  });

  it('renders loading', () => {
    component = createTestElement(
      <MockedProvider mocks={[]} addTypename={false}>
        <Friend {...props} />
      </MockedProvider>,
    );

    const { baseElement } = render(component);
    expect(baseElement).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders error view', async () => {
    const errorMock = {
      request: { query: QUERY_FRIENDS },
      error: new Error('error'),
    };

    component = createTestElement(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <Friend {...props} />
      </MockedProvider>,
    );

    const testingLib = render(component);
    await wait(() => {
      testingLib.rerender(component);
      expect(testingLib.asJSON()).toBeTruthy();
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
    await act(() => wait());
  });
});
