import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  cleanup,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../utils/testUtils';

import Friend from '../Friend';
import renderer from 'react-test-renderer';

let props: any;
let component: ReactElement;

describe('[Friend] rendering test', () => {
  beforeEach(() => {
    beforeEach(() => {
      props = createTestProps();
      component = createTestElement(<Friend {...props} />);
    });
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Friend] interaction', () => {
  let testingLib: RenderResult;
  let component: React.ReactElement;

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<Friend {...props} />);
    testingLib = render(component);
  });

  afterEach(() => {
    cleanup();
  });

  // TODO
  // it('should dispatch [show-modal] when user is pressed', () => {
  //   const userListItem = testingLib.queryByTestId('USER_ID');
  //   testingLib.debug();
  //   act(() => {
  //     fireEvent.press(userListItem);
  //   });
  // });
});
