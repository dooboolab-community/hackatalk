import 'react-native';
import * as React from 'react';
import ProfileModal from '../ProfileModal';
import { ThemeProvider } from 'styled-components/native';
import createTheme, { ThemeType } from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render } from 'react-native-testing-library';

const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <ProfileModal theme={createTheme(ThemeType.LIGHT)} />
  </ThemeProvider>
);

describe('[ProfileModal] rendering test', () => {
  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[ProfileModal] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  it('should call [addFriend] when [btn-add-or-delete] has pressed', () => {
    // const addOrDeleteBtn = testingLib.getByTestId('btn-add-or-delete');
    // fireEvent(addOrDeleteBtn, 'press');
  });

  it('should call [onChatPressed] when [onChatPressed] has pressed', () => {
    // const chatBtn = testingLib.getByTestId('btn-chat');
    // fireEvent(chatBtn, 'press');
  });
});
