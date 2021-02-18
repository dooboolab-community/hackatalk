import 'react-native';

import * as React from 'react';

import {createTestElement, createTestProps} from '../../../../test/testUtils';

import Shared from '../CheckBox';
import {render} from '@testing-library/react-native';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;

describe('Rendering', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Shared {...props} />);
  });

  it('renders without crashing', () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
