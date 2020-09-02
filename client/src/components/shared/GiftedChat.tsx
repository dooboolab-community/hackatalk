import { EmitterSubscription, FlatList, Keyboard, ListRenderItem, Platform, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components/native';

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const StyledViewChat = styled.View`
  width: 100%;
  border-top-width: 0.3px;
  border-color: ${({ theme }): string => theme.lineColor};
  min-height: 56px;
  max-height: 56px;
  padding-right: 8px;
  padding-left: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const StyledInputChat = styled.TextInput`
  font-size: 14px;
  padding: 10px;
  color: black;
`;

const StyledTouchMenu = styled.TouchableOpacity`
  left: 10px;
  height: 100%;
  justify-content: center;
`;

const StyledViewBottom = styled.View`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

const StyledViewMenu = styled.View<{ height: number }>`
  flex-direction: row;
  flex-wrap: wrap;
  height: ${({ height }): string => `${height}px`};
`;

interface Props<T> {
  chats?: T[];
  borderColor?: string;
  backgroundColor?: string;
  fontColor?: string;
  keyboardOffset?: number;
  renderItem: ListRenderItem<T>;
  optionView?: React.ReactElement;
  optionCloseView?: React.ReactElement;
  emojiView?: React.ReactElement;
  emptyItem?: React.ReactElement;
  renderViewMenu?: () => React.ReactElement;
  message?: string;
  onChangeMessage?: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  renderSendButton?: () => React.ReactElement;
}

function Shared<T>(props: Props<T>): React.ReactElement {
  let keyboardShowListener: EmitterSubscription;
  // NOTE: typings are not working well with useRef
  const input1 = useRef<TextInput>();
  const input2 = useRef<TextInput>();

  const {
    chats = [],
    borderColor,
    backgroundColor,
    fontColor,
    keyboardOffset,
    renderItem,
    emptyItem,
    renderViewMenu,
    optionView,
    optionCloseView,
    emojiView,
    message,
    onChangeMessage,
    placeholder,
    placeholderTextColor,
    renderSendButton,
  } = props;

  const [keyboardHeight, setKeyboardHeight] = useState<number>(258);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    if (showMenu) {
      Keyboard.dismiss();
    } else {
      if (input1 && input1.current) {
        input1.current.focus();
      }
    }
  }, [showMenu]);

  useEffect(() => {
    keyboardShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    return (): void => {
      if (keyboardShowListener) {
        keyboardShowListener.remove();
      }
    };
  }, []);

  return (
    <>
      <StyledKeyboardAvoidingView
        keyboardVerticalOffset={keyboardOffset}
        behavior={Platform.select({
          ios: 'padding',
          default: undefined,
        })}
      >
        <FlatList
          style={{ alignSelf: 'stretch' }}
          contentContainerStyle={
            chats.length === 0
              ? {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }
              : null
          }
          keyExtractor={(item, index): string => index.toString()}
          data={chats}
          renderItem={renderItem}
          ListEmptyComponent={emptyItem}
          ListFooterComponent={
            <View style={{ height: showMenu ? keyboardHeight + 60 : 60 }} />
          }
        />
        {!showMenu ? (
          <StyledViewChat
            style={{
              borderColor: borderColor,
              backgroundColor: backgroundColor,
            }}
          >
            <View
              style = {{
                width: 30,
              }}
            >
              <StyledTouchMenu
                testID="touch-menu"
                onPress={(): void => {
                  Keyboard.dismiss();
                  const timeout = setTimeout(() => {
                    setShowMenu(true);
                    clearTimeout(timeout);
                  }, 100);
                }}
              >
                {optionView}
              </StyledTouchMenu>
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <StyledInputChat
                testID="input-chat"
                style={{
                  color: fontColor,
                  backgroundColor: backgroundColor,
                  flex: 1,
                  paddingTop: 10,
                }}
                // @ts-ignore
                ref={input1}
                onFocus={(): void => setShowMenu(false)}
                multiline={true}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={message}
                defaultValue={message}
                onChangeText={onChangeMessage}
              />
            </View>
            {emojiView}
            <View>
              {renderSendButton ? renderSendButton() : null}
            </View>
          </StyledViewChat>
        ) : null}
      </StyledKeyboardAvoidingView>
      {showMenu ? (
        <StyledViewBottom>
          <StyledViewChat
            style={{
              borderColor: borderColor,
              backgroundColor: backgroundColor,
            }}
          >
            <View
              style = {{
                width: 30,
              }}
            >
              <StyledTouchMenu
                testID="touch-menu"
                onPress={(): void => setShowMenu(false)}
              >
                {optionCloseView}
              </StyledTouchMenu>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <StyledInputChat
                // @ts-ignore
                ref={input2}
                onFocus={(): void => setShowMenu(false)}
                style={{
                  color: fontColor,
                  backgroundColor: backgroundColor,
                  flex: 1,
                  paddingTop: 10,
                }}
                multiline={true}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={message}
                defaultValue={message}
              />
            </View>
            {emojiView}
            <View>
              {renderSendButton ? renderSendButton() : null}
            </View>
          </StyledViewChat>
          <StyledViewMenu
            testID="view-menu"
            height={keyboardHeight}
            style={{
              backgroundColor: backgroundColor,
            }}
          >
            {renderViewMenu ? renderViewMenu() : null}
          </StyledViewMenu>
        </StyledViewBottom>
      ) : null}
    </>
  );
}

/* eslint-disable */
Shared.defaultProps = {
  chats: [],
  keyboardOffset: 0,
  optionView: <View />,
  optionCloseView: <View />,
  emojiView: <View />,
  emptyItem: <View />,
  renderItem: (): React.ReactElement => <View />,
  renderViewMenu: (): React.ReactElement => <View />,
  message: '',
  onChangeMessage: (): void => {},
  placeholder: '',
  renderSendButton: (): React.ReactElement => <View />,
};
/* eslint-enable */

export default Shared;
