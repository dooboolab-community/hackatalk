import 'react-native';

import * as React from 'react';

import {createTestElement, createTestProps} from '../../../../test/testUtils';

import WebView from '../WebView';
import {render} from '@testing-library/react-native';

const props = createTestProps({
  route: {params: {uri: 'http'}},
});

const component = createTestElement(<WebView {...props} />);

describe('[WebView] screen', () => {
  it('renders without crashing', () => {
    const json = render(component).toJSON();

    expect(json).toMatchSnapshot();
  });
});
