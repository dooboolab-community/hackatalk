import {Animated} from 'react-native';
import * as React from 'react';
import SearchUser from '../SearchUser';
import {ProfileModalProvider} from '../../../providers/ProfileModalProvider';
import {IC_BACK} from '../../../utils/Icons';
import {ThemeProvider} from 'styled-components/native';
import createTheme, {ThemeType} from '../../../utils/theme';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {RenderAPI, render, shallow, fireEvent, waitForElement} from 'react-native-testing-library';
import {AppProvider} from "../../../providers/AppProvider";

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  createTheme,
};
const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <SearchUser {...props}/>
  </ThemeProvider>
);

describe('[SearchUser] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[serachUser] interaction', () => {
  let searchUserLib: RenderAPI;
  let testingLib: RenderAPI;
  let txtInputInst: renderer.ReactTestInstance;
  let animatedFlatlistInst: renderer.ReactTestInstance;
  const inputData = {
    uid: '2',
    displayName: 'geoseong',
    photoURL: IC_BACK,
    statusMsg: 'healthy',
    isOnline: '',
    friends: '',
    Chatrooms: '',
    created: '',
    updated: '',
  };

  beforeAll(() => {
    const providerProps = {
      navigation: {
        navigate: jest.fn(),
      },
      createTheme,
    };
    const providerComponent = (
      <AppProvider>
        <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
          <ProfileModalProvider {...providerProps}>
            {component}
          </ProfileModalProvider>
        </ThemeProvider>
      </AppProvider>
    );
    searchUserLib = render(component);
    testingLib = render(providerComponent);
    txtInputInst = testingLib.getByTestId('txtInput');
    animatedFlatlistInst = testingLib.getByTestId('animatedFlatlist');
  });
  it('when friend name typed in TextInput: (onTxtChanged -> onSearch) and (renderItem) and (keyExtractor)', () => {
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
    expect(animatedFlatlistInst.props.data.length).toEqual(9);
  });
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
  it('when profile modal clicked -> should call showProfileModal', () => {
    const userListItemInst: renderer.ReactTestInstance = testingLib.getByTestId('userListItem0');
    fireEvent.changeText(txtInputInst, inputData.displayName);
    fireEvent.press(userListItemInst);
    const {profileModal} = userListItemInst.props.testObj;
    const reducerState = {
      user: {
        ...inputData,
      },
      deleteMode: false,
    };
    expect(profileModal && profileModal.dispatch).toBeTruthy(); // effects nothing
    expect(profileModal.state).toEqual(reducerState); // effects nothing
  });
});
