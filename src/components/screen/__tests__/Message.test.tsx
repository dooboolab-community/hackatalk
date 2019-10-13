import 'react-native';

import * as React from 'react';

import { RenderResult, render } from '../../../../test/test-utils';

import Message from '../Message';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
import renderer from 'react-test-renderer';

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

const createTestProps = (obj: object): object => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[Message] screen', () => {
  beforeEach(() => {
    props = createTestProps({});
    component = (
      <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
        <Message {...props} />
      </ThemeProvider>
    );
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onPress', () => {
      // const btn = testingLib.queryByTestId('btn');
      // act(() => {
      //   fireEvent.press(btn);
      //   fireEvent.press(btn);
      // });
      // expect(cnt).toBe(3);
    });
  });
});
