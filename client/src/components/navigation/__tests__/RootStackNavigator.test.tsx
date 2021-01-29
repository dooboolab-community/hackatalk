import 'react-native';

import React, {ReactElement} from 'react';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import StackNavigator from '../RootStackNavigator';
import {ThemeType} from '../../../providers/ThemeProvider';
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: ReactElement;

describe('[Stack] navigator', () => {
  beforeEach(() => {
    props = createTestProps();

    component = createTestElement(<StackNavigator {...props} />);
  });

  it('should renders without crashing', () => {
    jest.useFakeTimers();

    const rendered = renderer.create(component).toJSON();

    jest.runAllTimers();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('should renders [Dark] mode', () => {
    jest.useFakeTimers();

    component = createTestElement(
      <StackNavigator {...props} />,
      ThemeType.DARK,
    );

    const rendered = renderer.create(component).toJSON();

    jest.runAllTimers();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
