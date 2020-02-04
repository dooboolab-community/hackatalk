import 'react-native';

import React, { ReactElement } from 'react';
import { RenderResult, act, fireEvent, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Screen from '../VerifyEmail';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Screen {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const { baseElement } = testingLib;
    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('Interaction', () => {
  beforeAll(() => {
    props = createTestProps();
    component = createTestElement(<Screen {...props} />);
    testingLib = render(component);
  });

  it('should simulate email button press', () => {
    const btn = testingLib.queryByTestId('touch-email');
    act(() => {
      fireEvent.press(btn);
    });
  });

  it('should simulate next button press', () => {
    expect(testingLib.baseElement).toMatchSnapshot();
    const btn = testingLib.queryByTestId('btn-next');
    act(() => {
      fireEvent.press(btn);
    });
  });
});
