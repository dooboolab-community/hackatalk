import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  wait,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Setting from '../Setting';
import renderer from 'react-test-renderer';
import { useSafeArea } from 'react-native-safe-area-context';

let props: any;
let component: React.ReactElement;

jest.mock('react-native-safe-area-context', () => {
  return {
      useSafeArea: () => {
      return { top: 10 };
    },
  };
});

describe('[Setting] screen', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <Setting {...props} />
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

    it('should simulate onPress login state item', async () => {
      const btn = testingLib.getByTestId('changePwItem');
      fireEvent.press(btn);
    });
  });

  afterAll(() => {
    cleanup();
  });
});
