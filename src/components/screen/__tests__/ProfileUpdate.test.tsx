import 'react-native';
import * as React from 'react';
import ProfileUpdate from '../ProfileUpdate';
import { ThemeProvider } from 'styled-components/native';
import createTheme, { ThemeType } from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render } from 'react-native-testing-library';
import { AppProvider } from '../../../providers/AppProvider';

describe('rendering test', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    createTheme,
  };
  const component: React.ReactElement = (
    <AppProvider>
      <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
        <ProfileUpdate {...props} />
      </ThemeProvider>
    </AppProvider>
  );

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;
  let props: any;
  let component: React.ReactElement;

  beforeAll(() => {
    rendered = renderer.create(component);
  });

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
      },
    };
    component = (
      <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
        <ProfileUpdate {...props} />
      </ThemeProvider>
    );
    testingLib = render(component);
  });

  it('should fireEvent when update button pressed', () => {
    fireEvent(testingLib.getByTestId('update_btn'), 'press');
    // expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('should fireEvent when logout button pressed', () => {
    fireEvent(testingLib.getByTestId('logout_btn'), 'press');
    expect(props.navigation.navigate).toHaveBeenCalledWith('AuthStackNavigator');
  });

  it('should changeText when display name changed', () => {
    const inputName = testingLib.getByTestId('input_name');
    inputName.props.onTextChanged('name');
    expect(inputName.props.txt).toEqual('name');
  });

  it('should changeText when status message changed', () => {
    const inputStatus = testingLib.getByTestId('input_status');
    inputStatus.props.onTextChanged('status');
    expect(inputStatus.props.txt).toEqual('status');
  });
});
