import 'react-native';

import * as React from 'react';

import { AppProvider } from '../../../providers';
import ProfileModal from '../ProfileModal';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
// Note: test renderer must be required after react-native.
import { createTheme } from '../../../theme';
import renderer from 'react-test-renderer';

let props: object;
let component: React.ReactElement;
// let testingLib: RenderResult;

const createTestProps = (obj: object): object => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[ProfileModal] render', () => {
  beforeEach(() => {
    props = createTestProps({});
    component = (
      <AppProvider>
        <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
          <ProfileModal {...props} />
        </ThemeProvider>
      </AppProvider>
    );
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
  });

  // describe('interactions', () => {
  //   beforeEach(() => {
  //     testingLib = render(component);
  //   });

  //   it('should simulate onClick', () => {
  //     const btn = testingLib.queryByTestId('btn');
  //     act(() => {
  //       fireEvent.press(btn);
  //     });
  //     expect(cnt).toBe(3);
  //   });
  // });
});
