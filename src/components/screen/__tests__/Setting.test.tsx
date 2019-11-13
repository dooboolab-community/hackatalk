import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Setting from '../Setting';
import renderer from 'react-test-renderer';

let props: any;
let component: React.ReactElement;

describe('[Setting] screen', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <SafeAreaProvider>
        <Setting {...props} />
      </SafeAreaProvider>
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

  afterAll(() => {
    cleanup();
  });
});
