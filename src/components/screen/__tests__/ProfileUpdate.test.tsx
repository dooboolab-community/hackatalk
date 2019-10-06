import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import ProfileUpdate from '../ProfileUpdate';
import { StateProvider } from '../../../contexts';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props: any;

const createTestProps = (props: object): object => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...props,
});

describe('rendering test', () => {
  props = createTestProps({
    theme: createTheme(),
  });
  const component: React.ReactElement = (
    <StateProvider>
      <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
        <ProfileUpdate {...props} />
      </ThemeProvider>
    </StateProvider>
  );

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let testingLib: RenderResult;
  let props;
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

  it('should fireEvent when logout button pressed', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('logout_btn'));
    });
    expect(props.navigation.navigate).toHaveBeenCalledWith(
      'AuthStackNavigator',
    );
  });

  it('should fireEvent when logout button pressed', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('update_btn'));
    });
  });

  it('should changeText when display name changed', () => {
    const inputName = testingLib.getByTestId('input_name');
    act(() => {
      fireEvent.change(inputName, 'name');
    });
    // TODO: what to expect?
    // expect(inputName.props.txt).toEqual('name');
  });

  it('should changeText when status message changed', () => {
    const inputStatus = testingLib.getByTestId('input_status');
    act(() => {
      fireEvent.change(inputStatus, 'name');
    });
    // expect(inputStatus.props.txt).toEqual('name');
  });
});
