import 'react-native';

import {
  AuthContext,
  AuthContextProvider,
} from '../../../providers/AuthProvider';
import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import {fireEvent, render} from '@testing-library/react-native';

import {AuthProviderMeQueryResponse} from '../../../__generated__/AuthProviderMeQuery.graphql';
import ChannelCreate from '../ChannelCreate';
import React from 'react';
import {User} from '../../../types/graphql';
import mockReactNavigation from '@react-navigation/core';

const mockNavigation = createMockNavigation();

const mockEnvironment = createMockEnvironment();

mockEnvironment.mock.queueOperationResolver((operation) => {
  return MockPayloadGenerator.generate(operation, {
    User: (_, generateId): User => ({
      id: `user-${generateId()}`,
      name: 'John Doe',
      nickname: 'jdoe1234',
    }),
    PageInfo: () => ({has_next_page: false}),
  });
});

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

describe('Rendering', () => {
  it('renders without crashing', () => {
    const component = createTestElement(<ChannelCreate />);
    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  it('renders [UserListItem]', async () => {
    const user: AuthProviderMeQueryResponse['me'] = {
      id: 'user-1',
      verified: true,
      email: 'test@email.com',
      profile: null,
    };

    const useAuthContextMock: jest.Mock<AuthContext> = jest.fn();

    useAuthContextMock.mockReturnValue({
      user,
      setUser: jest.fn(),
      signOutAsync: jest.fn(),
      loadMeQuery: jest.fn(),
    });

    const component = createTestElement(
      <AuthContextProvider value={useAuthContextMock()}>
        <ChannelCreate />
      </AuthContextProvider>,
      {
        environment: mockEnvironment,
      },
    );
    const screen = render(component);

    const nickname = await screen.findByText('jdoe1234');

    const userListItemWrapper = await screen.getByTestId(
      'userListItem-wrapper',
    );

    expect(nickname).toBeTruthy();
    expect(userListItemWrapper.props.isMyself).toBeTruthy();
  });
});

describe('Interaction', () => {
  it('should change search text', () => {
    const component = createTestElement(<ChannelCreate />);
    const screen = render(component);
    const searchInput = screen.getByTestId('text-input');

    fireEvent.changeText(searchInput, 'test search');

    expect(searchInput.props.value).toEqual('test search');
  });
});
