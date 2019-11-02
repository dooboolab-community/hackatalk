import 'react-native';

import * as React from 'react';

import { RenderResult, cleanup, render } from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import FindPw from '../FindPw';
import renderer from 'react-test-renderer';

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

describe('[FindPw] screen', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<FindPw {...props} />);
    testingLib = render(component);
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('should render [Text] with value "myText"', () => {
    const textInstance = testingLib.getByTestId('myText');
    expect(textInstance.props.children).toEqual('dooboolab');
  });

  describe('interactions', () => {
    beforeEach(() => {
      testingLib = render(component);
    });

    it('should simulate onPress', () => {
      // const btn = testingLib.queryByTestId('btn');
      // act(() => {
      //   fireEvent.press(btn);
      //   fireEvent.press(btn);
      // });
      // expect(cnt).toBe(3);
    });

    afterEach(() => {
      cleanup();
    });
  });
});
