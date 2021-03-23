import 'react-native';

import * as React from 'react';

import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {fireEvent, render} from '@testing-library/react-native';
import {graphql, useLazyLoadQuery} from 'react-relay/hooks';

import UserListItem from '../UserListItem';
import {UserListItemTestQuery} from '../../../__generated__/UserListItemTestQuery.graphql';
import {createTestElement} from '../../../../test/testUtils';

type QueryWrapperProps = {
  /** Press handler for testing. */
  onPress?: () => void;
};

const QueryWrapper: React.FC<QueryWrapperProps> = ({onPress}) => {
  const {myData} = useLazyLoadQuery<UserListItemTestQuery>(
    graphql`
      query UserListItemTestQuery {
        myData: user(id: "test-id") {
          ...UserListItem_user
        }
      }
    `,
    {},
  );

  return <UserListItem onPress={onPress} user={myData ?? undefined} />;
};

const mockEnvironment = createMockEnvironment();

mockEnvironment.mock.queueOperationResolver((operation) =>
  MockPayloadGenerator.generate(operation, {
    User(_, generateId) {
      return {
        id: `test-user-${generateId()}`,
        nickname: '',
        thumbURL: null,
        photoURL: null,
        statusMessage: '',
        isOnline: false,
        createdAt: undefined,
        updatedAt: undefined,
      };
    },
  }),
);

describe('[UserListItem] rendering test', () => {
  it('renders as expected', async () => {
    const component = createTestElement(<QueryWrapper />, {
      environment: mockEnvironment,
    });

    const {toJSON, findByTestId} = render(component);

    await findByTestId('peer-button');

    const json = toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});

describe('[UserListItem] interaction', () => {
  it('should fireEvent when peer image is pressed', async () => {
    const onPressMock = jest.fn();

    const component = createTestElement(
      <QueryWrapper onPress={onPressMock} />,
      {
        environment: mockEnvironment,
      },
    );

    const screen = render(component);

    const target = await screen.findByTestId('peer-button');

    fireEvent.press(target);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
