// import * as ProfileContext from '../../../providers/ProfileModalProvider';

import { cleanup, render, wait } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Friend from '../Friend';
import { MockPayloadGenerator } from 'relay-test-utils';
import React from 'react';
import { User } from '../../../types/graphql';
import { environment } from '../../../providers';

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
    environment.mockClear();
  });

  afterEach(cleanup);

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

  it('renders a friend', async () => {
    environment.mock.queueOperationResolver((operation) => {
      return MockPayloadGenerator.generate(operation, {
        User: (_, generateId): User => ({
          id: `user-${generateId()}`,
          name: 'John Doe',
          nickname: 'jdoe1234',
        }),
      });
    });
    const component = createTestElement(<Friend />);
    const { getByText } = render(component);

    // There should be an element with the text 'John Doe'.
    return wait(() => expect(getByText('John Doe')).toBeTruthy());
  });

  it('re-renders upon friend update', async () => {
    // Make a mock friend resolver with the given name.
    const makeFriendResolver = (
      name: string,
    ): MockPayloadGenerator.MockResolvers => ({
      User: (_, generateId): User => ({
        id: `user-${generateId()}`,
        name,
      }),
    });

    // Render.
    const component = createTestElement(<Friend />);
    const { getByText } = render(component);

    // First data : John Doe
    const operation = environment.mock.getMostRecentOperation();
    environment.mock.nextValue(
      operation,
      MockPayloadGenerator.generate(
        operation,
        makeFriendResolver('John Doe'),
      ),
    );
    expect(getByText('John Doe')).toBeTruthy();

    // Updated data : Sarah Doe
    environment.mock.nextValue(
      operation,
      MockPayloadGenerator.generate(
        operation,
        makeFriendResolver('Sarah Doe'),
      ),
    );
    expect(getByText('Sarah Doe')).toBeTruthy();
    expect(() => getByText('John Doe')).toThrow();
  });
});
