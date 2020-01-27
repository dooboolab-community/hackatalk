import 'react-native';

import * as React from 'react';

import { RenderResult, act, cleanup, fireEvent, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Channel from '../Channel';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: (): object => {
      return {
        navigate: jest.fn(),
      };
    },
  };
});

describe('[Channel] screen', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(
      <Channel {...props} />,
    );
  });

  it('renders without crashing', () => {
    testingLib = render(component);
    expect(testingLib.baseElement).toBeTruthy();
    expect(testingLib.baseElement).toMatchSnapshot();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onPress', () => {
      const btn = testingLib.queryByTestId('list-item-0');
      act(() => {
        fireEvent.press(btn);
      });
    });
  });

  afterEach(() => {
    cleanup();
  });
});
