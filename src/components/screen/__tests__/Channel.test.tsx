import 'react-native';

import * as React from 'react';

import { RenderResult, cleanup, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Channel from '../Channel';
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: (): object => {
      return {
        navigation: {
          navigate: jest.fn(),
        },
      };
    },
  };
});

describe('[Channel] screen', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Channel {...props} />);
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

  afterEach(() => {
    cleanup();
  });
});
