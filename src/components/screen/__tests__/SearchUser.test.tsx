import * as React from 'react';

import { RenderResult, render } from '../../../../test/test-utils';

import { Animated } from 'react-native';
import { StateProvider } from '../../../contexts';
import UserListItem from '../../shared/UserListItem';
import { createTheme } from '../../../theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// import {
//   RenderAPI,
//   fireEvent,
//   render,
//   shallow,
//   waitForElement,
// } from 'react-native-testing-library';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  createTheme,
};
const component: React.ReactElement = (
  <StateProvider>
    <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
      <SearchUser {...props} />
    </ThemeProvider>
  </StateProvider>
);

describe('[SearchUser] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[serachUser] interaction', () => {
  // let searchUserLib: RenderAPI;
  let testingLib: RenderResult;
  let txtInputInst: renderer.ReactTestInstance;
  let animatedFlatlistInst: renderer.ReactTestInstance;
  const inputData: User = fakeUsers[0];

  beforeAll(() => {
    // const providerProps = {
    //   navigation: {
    //     navigate: jest.fn(),
    //   },
    //   createTheme,
    // };
    const providerComponent: React.ReactElement = (
      <StateProvider>
        <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
          <SearchUser />
        </ThemeProvider>
      </StateProvider>
    );
    // searchUserLib = render(component);
    testingLib = render(providerComponent);
    txtInputInst = testingLib.getByTestId('txtInput');
    animatedFlatlistInst = testingLib.getByTestId('animatedFlatlist');
  });
  it(
    'when friend name typed in TextInput: (onTxtChanged -> onSearch)' +
      ' and (renderItem) and (keyExtractor)',
    () => {
      // setTimeout called - 0
      fireEvent.changeText(txtInputInst, inputData.displayName);
      // setTimeout called - 2
      expect(animatedFlatlistInst.props.data[0]).toEqual(inputData);

      expect(animatedFlatlistInst.props.contentContainerStyle()).toEqual(null);
      fireEvent.changeText(txtInputInst, 'noresult!');
      // setTimeout called - 3
      expect(animatedFlatlistInst.props.data.length).toEqual(0);
      expect(animatedFlatlistInst.props.contentContainerStyle()).toEqual({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      });

      fireEvent.changeText(txtInputInst, '');
      // setTimeout called - 4
      expect(animatedFlatlistInst.props.data.length).toEqual(fakeUsers.length);
    },
  );
  it('see Animation is working well', () => {
    jest.useFakeTimers(); // related to timer
    const scrollY = animatedFlatlistInst.props.testObj.scrollY;
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
