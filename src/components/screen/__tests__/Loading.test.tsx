import 'react-native';
import * as React from 'react';
import Loading from '../Loading';
import { ThemeProvider } from 'styled-components/native';
import createTheme, { ThemeType } from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import { render, waitForElement } from 'react-native-testing-library';

jest.mock('Animated', () => {
  return {
    loop: jest.fn(() => {
      return {
        start: jest.fn(),
        reset: jest.fn(),
      };
    }),
    timing: jest.fn(() => {
      return {
        start: jest.fn(),
      };
    }),
    sequence: jest.fn(),
    Value: jest.fn(() => {
      return {
        interpolate: jest.fn(),
      };
    }),
    createAnimatedComponent: (Component) => Component,
  };
});

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  createTheme,
};

const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <Loading {...props}/>
  </ThemeProvider>
);

describe('[Loading] rendering test', () => {
  it('renders as expected', async(done) => {
    const { toJSON } = render(component);
    const loading = await waitForElement(() => toJSON());
    expect(loading).toMatchSnapshot();
    done();
  });
});
