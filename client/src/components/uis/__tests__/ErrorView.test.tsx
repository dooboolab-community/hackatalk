import 'react-native';

import * as React from 'react';

import {createTestElement, createTestProps} from '../../../../test/testUtils';

import Shared from '../molecules/ErrorView';
import {render} from '@testing-library/react-native';

const component = createTestElement(<Shared {...createTestProps()} />);

describe('Rendering', () => {
  it('renders without crashing', () => {
    const json = render(component).toJSON();

    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });
});
