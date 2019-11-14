import 'react-native';

import * as ProfileContext from '../../../providers/ProfileModalProvider';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
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

  describe('dispatch showModal', () => {
    it('should dispatch [show-modal] when user is pressed', () => {
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: jest.fn(),
          state: null,
        }));
      const userListItem = testingLib.queryByTestId('USER_ID');
      act(() => {
        fireEvent.press(userListItem);
      });
    });

    it('should call [show-modal] when modal is available', () => {
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: jest.fn(),
          state: {
            user: null,
            deleteMode: true,
            modal: jest.mock,
          },
        }));
      const userListItem = testingLib.queryByTestId('USER_ID');
      testingLib.rerender(component);
      act(() => {
        fireEvent.press(userListItem);
      });
    });
  });
});
