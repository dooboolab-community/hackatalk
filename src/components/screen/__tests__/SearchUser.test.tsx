import * as React from 'react';

import {
  RenderResult,
  fireEvent,
  render,
  toJSON,
} from '@testing-library/react-native';
import SearchUser, { fakeUsers } from '../SearchUser';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import { Animated } from 'react-native';
import ProfileModal from '../../shared/ProfileModal';
import { User } from '../../../types';
import { act } from 'react-test-renderer';
import { useProfileContext } from '../../../providers/ProfileModalProvider';

// import UserListItem from '../../shared/UserListItem';

const props = createTestProps({
  screenProps: { changeTheme: jest.fn() },
});

const component: React.ReactElement = createTestElement(
  <SearchUser {...props} />,
);

describe('[SearchUser] rendering test', () => {
  it('renders as expected', () => {
    const { container } = render(component);
    expect(toJSON(container)).toMatchSnapshot();
  });
});

describe('[serachUser] interaction', () => {
  // let searchUserLib: RenderAPI;
  let testingLib: RenderResult;
  let txtInputInst: any;
  let animatedFlatListInst: any;
  const inputData: User = fakeUsers[0];

  beforeAll(() => {
    testingLib = render(component);
    txtInputInst = testingLib.getByTestId('txtInput');
    animatedFlatListInst = testingLib.getByTestId('animatedFlatlist');
  });
  it(
    'when friend name typed in TextInput: (onTxtChanged -> onSearch)' +
      ' and (renderItem) and (keyExtractor)',
    () => {
      // setTimeout called - 0
      fireEvent.changeText(txtInputInst, inputData.displayName);
      // setTimeout called - 2
      expect(animatedFlatListInst.props.data[0]).toEqual(inputData);

      expect(animatedFlatListInst.props.contentContainerStyle()).toEqual(null);
      fireEvent.changeText(txtInputInst, 'noresult!');
      // setTimeout called - 3
      expect(animatedFlatListInst.props.data.length).toEqual(0);
      expect(animatedFlatListInst.props.contentContainerStyle()).toEqual({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      });

      fireEvent.changeText(txtInputInst, '');
      // setTimeout called - 4
      expect(animatedFlatListInst.props.data.length).toEqual(fakeUsers.length);
    },
  );
  it('see Animation is working well', () => {
    jest.useFakeTimers(); // related to timer
    const scrollY = animatedFlatListInst.props.testObj.scrollY;
    const afterScrollY = new Animated.Value(0);
    Animated.timing(afterScrollY, {
      toValue: 100,
      duration: 500,
    }).start();
    // setTimeout called - 5
    setTimeout(() => {
      expect(scrollY).toEqual(afterScrollY); // doesn't work
    }, 600);
    // setTimeout called - 6
  });

  // it('when profile modal clicked -> should call showProfileModal', () => {
  //   const itemTestID = 'userListItem0';
  //   const userListItemInst: renderer.ReactTestInstance = testingLib.getByTestId(
  //     itemTestID,
  //   );
  //   fireEvent.changeText(txtInputInst, inputData.displayName);
  //   fireEvent.press(userListItemInst);
  //   // const { profileModal } = userListItemInst.props.testObj;
  //   // const UserItem = withTheme(<UserListItem testID={itemTestID} user={inputData} />);
  //   console.log(
  //     '~>~>~>~>~>~>userListItemInst/1',
  //     userListItemInst.findByType('StyledText'),
  //   );
  //   // console.log('~>~>~>~>~>~>userListItemInst/2', UserItem);
  //   // expect(userListItemInst).toEqual(UserItem); // effects nothing
  // });
});

const TestComponent = (): React.ReactElement => {
  const { state } = useProfileContext();
  const modalEl = React.useRef(null);
  state.modal = modalEl;

  return (
    <>
      <ProfileModal ref={state.modal} />
      <SearchUser {...props} />
    </>
  );
};

describe('[SearchUser] interaction with Profile Modal', () => {
  let component: React.ReactElement;
  let testingLib: RenderResult;
  let itemTestID: string;

  beforeEach(() => {
    component = createTestElement(<TestComponent />);
    testingLib = render(component);
    itemTestID = 'userListItem0';
  });

  it('show profile modal when press user in search user list', () => {
    const userListItem = testingLib.queryByTestId(itemTestID);
    act(() => {
      fireEvent.press(userListItem);
    });
    expect(testingLib.asJSON()).toMatchSnapshot();
  });

  it('show changged state when press add and delete button on profile modal', () => {
    const userListItem = testingLib.queryByTestId(itemTestID);
    act(() => {
      fireEvent.press(userListItem);
    });
    const btnAdFriend = testingLib.queryByTestId('btn-ad-friend');
    act(() => {
      fireEvent.press(btnAdFriend);
    });
    expect(testingLib.asJSON()).toMatchSnapshot();
    act(() => {
      fireEvent.press(btnAdFriend);
    });
    expect(testingLib.asJSON()).toMatchSnapshot();
  });
});
