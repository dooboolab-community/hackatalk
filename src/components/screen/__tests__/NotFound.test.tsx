import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  cleanup,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import NotFound from '../NotFound';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

describe('[NotFound] screen', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<NotFound {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    expect(testingLib.baseElement).toBeTruthy();
    expect(testingLib.baseElement).toMatchSnapshot();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });
  });

  afterEach(() => {
    cleanup();
  });
});
