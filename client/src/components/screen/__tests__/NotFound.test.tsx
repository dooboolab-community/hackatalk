import 'react-native';

import * as React from 'react';

import {cleanup, render} from '@testing-library/react-native';
import {createTestElement, createTestProps} from '../../../../test/testUtils';

import NotFound from '../NotFound';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;

describe('[NotFound] screen', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<NotFound {...props} />);
  });

  it('renders without crashing', () => {
    const json = render(component);

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  afterEach(cleanup);
});
