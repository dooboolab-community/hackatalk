import 'react-native';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import ProfileUpdate from '../ProfileUpdate';
import { getString } from '../../../../STRINGS';
import { renderHook } from '@testing-library/react-hooks';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { useActionSheet } from '@expo/react-native-action-sheet';

let props: any;
let component: ReactElement;

describe('rendering test', () => {
  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<ProfileUpdate {...props} />);
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('interaction', () => {
  let testingLib: RenderResult;
  let rendered: renderer.ReactTestRenderer;
  let props;
  let component: React.ReactElement;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  beforeEach(() => {
    props = createTestProps();
    component = createTestElement(<ProfileUpdate {...props} />);
    testingLib = render(component);
  });

  it('should fireEvent when logout button pressed', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('logout_btn'));
    });
    expect(props.navigation.resetRoot).toHaveBeenCalled();
  });

  it('should fireEvent when logout button pressed', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('update_btn'));
    });
  });

  it('should changeText when display name changed', () => {
    const inputName = testingLib.getByTestId('input_name');
    act(() => {
      fireEvent.change(inputName, 'name');
    });
    // TODO: what to expect?
    // expect(inputName.props.txt).toEqual('name');
  });

  it('should changeText when status message changed', () => {
    const inputStatus = testingLib.getByTestId('input_status');
    act(() => {
      fireEvent.change(inputStatus, 'name');
    });
    // expect(inputStatus.props.txt).toEqual('name');
  });

  it('should open actionSheet with options when pressing profile icon button', () => {
    const { result } = renderHook(() => useActionSheet());
    const callback = jest.fn();
    const profileBtn = testingLib.getByTestId('user_icon_button');
    const options = [
      getString('TAKE_A_PICTURE'),
      getString('SELSCT_FROM_ALBUM'),
      getString('CANCEL'),
    ];
    act(() => {
      fireEvent.press(profileBtn);
      result.current.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 2,
        },
        callback,
      );
      callback();
    });
    expect(callback).toHaveBeenCalled();
  });

  afterAll(() => {
    cleanup();
  });
});
