import 'react-native';

import * as React from 'react';

import type {RenderAPI} from '@testing-library/react-native';
import Template from '../CustomLoadingIndicator';
import {createTestElement} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

let props: any;
let component: React.ReactElement;
let testingLib: RenderAPI;

describe('Rendering', () => {
  beforeEach(() => {
    props = {};
    component = createTestElement(<Template {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const baseElement = testingLib.toJSON();

    expect(baseElement).toBeTruthy();
  });
});
