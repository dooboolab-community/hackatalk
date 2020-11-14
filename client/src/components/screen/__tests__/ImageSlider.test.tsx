import 'react-native';

import React, { ReactElement } from 'react';
import { RenderAPI, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Screen from '../ImageSlider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

const images = [
  // IC_LOGO,
  { uri: 'https://images.unsplash.com/photo-1519335337423-a3357c2cd12e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80' },
  { uri: 'https://www.housingwire.com/wp-content/uploads/2019/09/Purple-technology-data-internet-3.jpg' },
  { uri: 'https://images.unsplash.com/photo-1587628736664-fdc50efb57b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
  { uri: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg' },
  { uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460' },
];

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: (): Record<string, unknown> => {
      return {
        navigate: jest.fn(),
        setOptions: jest.fn(),
      };
    },
  };
});

jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: () => ({ top: 30, bottom: 50, left: 0, right: 0 }),
  };
});

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps({ route: { params: { images, initialIndex: 1 } } });
    component = createTestElement(<Screen {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('Interaction', () => {
  beforeEach(() => {
    props = createTestProps({ route: { params: { images, initialIndex: 1 } } });
    component = createTestElement(<Screen {...props} />);
    testingLib = render(component);
  });

  it('should simulate onClick', () => {
    expect(testingLib.toJSON()).toMatchSnapshot();
    // const btn = testingLib.queryByTestId('btn');
    // act(() => {
    //   fireEvent.press(btn);
    //   fireEvent.press(btn);
    // });
    // expect(cnt).toBe(3);
  });
});
