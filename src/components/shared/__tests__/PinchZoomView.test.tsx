import 'react-native';

import * as React from 'react';

import PinchZoomView, { ImageInfo } from '../PinchZoomView';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let component: React.ReactElement;
// let testingLib: RenderResult;

const imageInfos: ImageInfo[] = [
  {
    url: 'url',
    title: 'title',
    subtitle: 'subtitle',
  },
  {
    url: 'url',
    title: 'title',
    subtitle: 'subtitle',
  },
];

describe('[PinchZoomView] render', () => {
  beforeEach(() => {
    const props = {
      imageInfos,
    };
    component = <PinchZoomView {...props} />;
    jest.useFakeTimers();
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
