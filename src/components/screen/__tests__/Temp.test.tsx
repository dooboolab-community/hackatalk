import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import Temp from '../Temp';
import renderer from 'react-test-renderer';

let props: any;
let component: ReactElement;

describe('[Temp] render', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Temp {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  afterAll(() => {
    cleanup();
  });
});

describe('[Temp] Interaction', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onPress] when [btn] has been clicked', () => {
    const btnInstance = renderResult.getByTestId('btn');
    act(() => {
      fireEvent.press(btnInstance);
    });
    expect(props.navigation.goBack).toHaveBeenCalled();
  });

  afterAll(() => {
    cleanup();
  });
});
