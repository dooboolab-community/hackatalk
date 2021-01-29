import React, {ReactElement} from 'react';
import {RenderAPI, act, fireEvent, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import Button from '../../shared/Button';
import Intro from '../Intro';
import {ThemeType} from '../../../providers/ThemeProvider';
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

describe('[Intro] screen rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Intro {...props} />);
    testingLib = render(component);
  });

  it('should render outer component and snapshot matches', () => {
    const json = renderer.create(component).toJSON();

    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });

  it('should render [Dark] theme', () => {
    component = createTestElement(<Intro {...props} />, ThemeType.DARK);
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it('should render [isLoading] status', () => {
    props = createTestProps({
      isLoading: true,
    });

    component = createTestElement(<Intro {...props} />, ThemeType.DARK);
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });

  it('should render [isDisabled] status', () => {
    props = createTestProps({
      isDisabled: true,
    });

    component = createTestElement(<Intro {...props} />, ThemeType.DARK);
    testingLib = render(component);

    const baseElement = testingLib.toJSON();

    expect(baseElement).toMatchSnapshot();
    expect(baseElement).toBeTruthy();
  });
});

describe('[Intro] Interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;

  it('should simulate login when button has clicked', () => {
    testingLib = render(component);
    rendered = renderer.create(component);
    root = rendered.root;

    jest.useFakeTimers();

    const buttons = root.findAllByType(Button);

    const button = testingLib.getByTestId('btn-login');

    act(() => {
      fireEvent.press(button);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      jest.runAllTimers();
    });

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(buttons[0].props.isLoading).toEqual(false);
  });

  it('should navigate when button has clicked', () => {
    testingLib = render(component);

    act(() => {
      fireEvent.press(testingLib.getByTestId('btn-navigate'));
    });

    expect(props.navigation.navigate).toHaveBeenCalledWith('Temp', {
      param: 'Go Back',
    });
  });

  it('should change theme when button has clicked', () => {
    testingLib = render(component);

    act(() => {
      fireEvent.press(testingLib.getByTestId('btn-theme'));
    });
  });
});
