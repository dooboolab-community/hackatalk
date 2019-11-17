import 'react-native';

import * as ProfileContext from '../../../providers/ProfileModalProvider';

import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
  waitForElement,
} from '@testing-library/react-native';
import { createTestElement, createTestProps } from '../../../../test/testUtils';

import Chat from '../Chat';
// Note: test renderer must be required after react-native.
import GiftedChat from '../../shared/GiftedChat';
import renderer from 'react-test-renderer';
import styled from 'styled-components/native';

const Container = styled.View``;
const Button = styled.TouchableOpacity``;

let props: any;
let giftedChatprops: any;
let component: ReactElement;
let giftedChatComponent: ReactElement;

describe('[Chat] rendering test', () => {
  const renderViewMenu = (): React.ReactElement => (
    <Container>
      <Button testID="icon_camera" />
      <Button testID="icon_photo" />
    </Container>
  );
  beforeEach(() => {
    props = createTestProps();
    giftedChatprops = createTestProps({ renderViewMenu });
    component = createTestElement(<Chat {...props} />);
    giftedChatComponent = createTestElement(
      <GiftedChat {...giftedChatprops} />,
    );
  });

  it('renders as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Chat] interaction', () => {
  let testingLib: RenderResult;
  let giftedChatTestingLib: RenderResult;

  beforeAll(() => {
    testingLib = render(component);
  });

  afterAll(() => {
    cleanup();
  });

  it('should [sendChat] when pressing button', () => {
    let chatBtn = testingLib.getByTestId('btn_chat');
    chatBtn = testingLib.getByTestId('btn_chat');
    fireEvent.press(chatBtn);
  });

  describe('dispatch showModal', () => {
    it('should dispatch [show-modal] when peerImage is pressed', () => {
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => ({
          showModal: jest.fn(),
          state: null,
        }));
      const chatListItem = testingLib.queryByTestId('CHAT_LIST_ITEM0');
      act(() => {
        fireEvent.press(chatListItem);
      });
    });

    it('should call [show-modal] when modal is available', () => {
      const mockedData = {
        showModal: jest.fn(),
        state: {
          user: null,
          deleteMode: true,
          modal: jest.mock,
        },
      };
      jest
        .spyOn(ProfileContext, 'useProfileContext')
        .mockImplementation(() => mockedData);
      const chatListItem = testingLib.queryByTestId('CHAT_LIST_ITEM0');
      testingLib.rerender(component);
      act(() => {
        fireEvent.press(chatListItem);
      });
      expect(mockedData.showModal).toHaveBeenCalledTimes(1);

      it('should open image library when pressing photo icon button', async () => {
        giftedChatTestingLib = render(giftedChatComponent);
        const menuBtn = giftedChatTestingLib.getByTestId('touch_menu');
        const openImageLibFunction = jest.fn();
        act(() => {
          fireEvent.press(menuBtn);
        });
        const photoBtn = await waitForElement(() =>
          giftedChatTestingLib.getByTestId('icon_photo'),
        );
        act(() => {
          fireEvent.press(photoBtn);
          openImageLibFunction();
        });
        expect(openImageLibFunction).toHaveBeenCalled();
      });

      it('should open camera when pressing camera icon button', async () => {
        giftedChatTestingLib = render(giftedChatComponent);
        const menuBtn = giftedChatTestingLib.getByTestId('touch_menu');
        const openCameraFunction = jest.fn();
        act(() => {
          fireEvent.press(menuBtn);
        });
        const cameraBtn = await waitForElement(() =>
          giftedChatTestingLib.getByTestId('icon_camera'),
        );
        act(() => {
          fireEvent.press(cameraBtn);
          openCameraFunction();
        });
        expect(openCameraFunction).toHaveBeenCalled();
      });
    });
  });
});
