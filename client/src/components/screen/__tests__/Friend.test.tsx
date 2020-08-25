// import * as ProfileContext from '../../../providers/ProfileModalProvider';

import { act, cleanup, render, wait } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Friend from '../Friend';
import { MockPayloadGenerator } from 'relay-test-utils';
import React from 'react';
import { User } from '../../../types/graphql';
import { environment } from '../../../providers';

describe('[Friend] rendering test', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let props: any;
  beforeEach(() => {
    props = createTestProps();
    environment.mockClear();
  });

  // afterEach(cleanup);

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

    const component = createTestElement(<Friend {...props} />);
    const { getByText } = render(component);

    return wait(() => expect(getByText('John Doe')).toBeTruthy());
  });

  it('re-renders upon friend update', async () => {
    const makeFriendResolver = (
      name: string,
    ): MockPayloadGenerator.MockResolvers => ({
      User: (_, generateId): User => ({
        id: `user-${generateId()}`,
        name,
      }),
    });

    const component = createTestElement(<Friend {...props}/>);

    const { getByText } = render(component);

    const operation = environment.mock.getMostRecentOperation();
    environment.mock.nextValue(
      operation,
      MockPayloadGenerator.generate(
        operation,
        makeFriendResolver('John Doe'),
      ),
    );

    wait(() => expect(getByText('John Doe')).toBeTruthy());

    environment.mock.nextValue(
      operation,
      MockPayloadGenerator.generate(
        operation,
        makeFriendResolver('Sarah Doe'),
      ),
    );

    wait(() => expect(getByText('Sarah Doe')).toBeTruthy());
  });
});
