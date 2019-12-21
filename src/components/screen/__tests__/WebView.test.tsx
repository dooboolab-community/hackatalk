import 'react-native';

import * as React from 'react';

import { RenderResult, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import WebView from '../WebView';
import renderer from 'react-test-renderer';

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

describe('[WebView] screen', () => {
  beforeEach(() => {
    props = createTestProps({
      route: {
        params: {
          uri: 'https://dooboolab.com',
        },
      },
    });
    component = createTestElement(<WebView {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
