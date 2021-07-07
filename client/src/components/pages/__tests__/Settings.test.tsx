import 'react-native';

import * as React from 'react';

import {AuthType, User} from '../../../types/graphql';
import {
  createMockNavigation,
  createTestElement,
} from '../../../../test/testUtils';
import {fireEvent, render, waitFor} from '@testing-library/react-native';

import Settings from '../Settings';
import mockReactNavigation from '@react-navigation/core';
import {useAuthContext} from '../../../providers/AuthProvider';

const mockNavigation = createMockNavigation();

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof mockReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
}));

function getEmptyAuthUserWithSignInType(authType: AuthType): User {
  return {
    id: '',
    nickname: '',
    thumbURL: '',
    photoURL: '',
    statusMessage: '',
    profile: {
      authType,
      socialId: '',
    },
  };
}

describe('[Setting] screen', () => {
  it('renders without crashing with Facebook auth type', () => {
    const component = createTestElement(<Settings />, {
      user: getEmptyAuthUserWithSignInType('facebook'),
    });

    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  it('should renders without crashing with Google auth type', () => {
    const component = createTestElement(<Settings />, {
      user: getEmptyAuthUserWithSignInType('google'),
    });

    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  it('should render without crashing with Apple auth type', () => {
    const component = createTestElement(<Settings />, {
      user: getEmptyAuthUserWithSignInType('apple'),
    });

    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  describe('interactions', () => {
    it('should simulate onPress login state item', async () => {
      const component = createTestElement(<Settings />, {
        user: getEmptyAuthUserWithSignInType('email'),
      });

      const screen = render(component);
      const btn = screen.getByTestId('change-pw-item');

      fireEvent.press(btn);
      // TODO: Test what happens after pressing the button.
    });

    it('should set auth user to undefined after logout button pressed', async () => {
      // Test component for detecting changes in auth context.
      const TestComponent: React.FC<{onAuthChange: (user?: User) => void}> = ({
        onAuthChange,
      }) => {
        const {user} = useAuthContext();

        React.useEffect(() => {
          onAuthChange(user);
        }, [user, onAuthChange]);

        return <Settings />;
      };

      // This function is called whenever auth user changes.
      const mockOnAuthChange = jest.fn();

      const component = createTestElement(
        <TestComponent onAuthChange={mockOnAuthChange} />,
        {
          user: getEmptyAuthUserWithSignInType('apple'),
        },
      );

      const screen = render(component);

      fireEvent.press(screen.getByTestId('button-logout'));

      // Auth user is set to undefined after logout.
      await waitFor(() => {
        expect(mockOnAuthChange).toHaveBeenCalledWith({
          id: '',
          nickname: '',
          photoURL: '',
          profile: {authType: 'apple', socialId: ''},
          statusMessage: '',
          thumbURL: '',
        });
      });
    });
  });
});
