import 'react-native';
import * as React from 'react';
import { ProfileModalProvider } from '../ProfileModalProvider';
import { ThemeProvider } from 'styled-components/native';
import createTheme, { ThemeType } from '../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render } from 'react-native-testing-library';
import { AppProvider } from '../AppProvider';

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  createTheme,
};

describe('[ProfileModalProvider] rendering test', () => {
  let json: renderer.ReactTestRendererJSON;
  const component: React.ReactElement = (
    <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
      <ProfileModalProvider {...props} />
    </ThemeProvider>
  );

  it('component and snapshot matches', () => {
    json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[ProfileModalProvider] interactions', () => {
  const component = (
    <AppProvider>
      <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
        <ProfileModalProvider {...props} />
      </ThemeProvider>
    </AppProvider>
  );
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  it('should find [ProfileModal] and navigate [onChatPressed]', () => {
    const profileModal = testingLib.getByTestId('modal');
    expect(profileModal).toBeDefined();

    profileModal.props.onChatPressed();
    expect(props.navigation.navigate).toHaveBeenCalledWith('Chat');
  });
});
