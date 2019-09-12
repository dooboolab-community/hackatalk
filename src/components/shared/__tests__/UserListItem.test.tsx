import 'react-native';
import * as React from 'react';
import UserListItem from '../UserListItem';
import { ThemeProvider } from 'styled-components/native';
import createTheme, { ThemeType } from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';

let cnt = 0;
const onPress = () => {
  cnt++;
};

const props = {
  user: {
    uid: '',
    displayName: '',
    photoURL: null,
    statusMsg: '',
    isOnline: false,
    friends: [],
    chatrooms: [],
    created: undefined,
    updated: undefined,
  },
  onPress,
  createTheme,
};
const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <UserListItem {...props} />
  </ThemeProvider>
);

describe('[UserListItem] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[UserListItem] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  it('should fireEvent when peer image is pressed', () => {
    const touchBtn = testingLib.getByTestId('press_id');
    fireEvent(touchBtn, 'press');
    expect(cnt).toEqual(1);
  });
});
