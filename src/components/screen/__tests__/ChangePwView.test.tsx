import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import ChangePwView from '../Setting/ChangePwView';
import renderer from 'react-test-renderer';

let props: any;
let component: React.ReactElement;

describe('[ChangePwView] screen', () => {
  let testingLib: RenderResult;

  beforeEach(() => {
    props = createTestProps({
      close: jest.fn(),
    });
    component = createTestElement(
      <ChangePwView {...props} />
    );
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate close item', async () => {
      const btn = testingLib.getByTestId('closeBtn');
      fireEvent.press(btn);
    });
  });

  afterAll(() => {
    cleanup();
  });
});
