import {
  BackHandler,
  BackHandlerStatic,
  FlatList,
  Keyboard,
  ListRenderItem,
  Platform,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import styled from '@emotion/native';

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
`;

const StyledViewChat = styled.View`
  width: 100%;
  max-width: 100%;
  border-top-width: 0.3px;
  border-color: ${({theme}) => theme.lineColor};
  min-height: 56px;
  max-height: 56px;
  padding-right: 8px;
  padding-left: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const StyledInputChat = styled.TextInput`
  font-size: 14px;
  padding-left: 48px;
  padding-bottom: 4px;
`;

const StyledTouchMenu = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  height: 100%;
  min-width: 20px;
  justify-content: center;
`;

const StyledViewBottom = styled.View`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

const StyledViewMenu = styled.View<{height: number}>`
  flex-direction: row;
  flex-wrap: wrap;
  height: ${({height}): string => `${height}px`};
`;

interface Props<T> {
  messages: T[];
  borderColor?: string;
  backgroundColor?: string;
  fontColor?: string;
  onEndReached?: () => void;
  keyboardOffset?: number;
  renderItem: ListRenderItem<T>;
  keyExtractor?: (item: T, index: number) => string;
  optionView?: React.ReactElement;
  emptyItem?: React.ReactElement;
  renderViewMenu?: () => React.ReactElement;
  message?: string;
  onChangeMessage?: (text: string) => void;
  onKeyPress?: TextInputProps['onKeyPress'];
  placeholder?: string;
  placeholderTextColor?: string;
  renderSendButton?: () => React.ReactElement;
}

function Shared<T>(props: Props<T>): React.ReactElement {
  const input1 = useRef<TextInput>();
  const input2 = useRef<TextInput>();

  const {
    messages,
    borderColor,
    backgroundColor,
    fontColor,
    keyboardOffset,
    renderItem,
    keyExtractor,
    emptyItem,
    renderViewMenu,
    optionView,
    message,
    onChangeMessage,
    placeholder,
    placeholderTextColor,
    renderSendButton,
    onEndReached,
    onKeyPress: onKeyPress,
  } = props;

  const [keyboardHeight, setKeyboardHeight] = useState<number>(258);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const backHandler = useRef<BackHandlerStatic>(BackHandler);
  const keyboard = useRef(Keyboard);

  useEffect(() => {
    if (showMenu) Keyboard.dismiss();
  }, [showMenu]);

  useEffect(() => {
    const backHandlerListner = backHandler.current.addEventListener(
      'hardwareBackPress',
      (): boolean => {
        setShowMenu((show) => (show ? false : show));

        return false;
      },
    );

    const keyboardShowListener = keyboard.current.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    return (): void => {
      if (keyboardShowListener) keyboardShowListener.remove();

      if (backHandlerListner) backHandlerListner.remove();
    };
  }, []);

  return (
    <>
      <StyledKeyboardAvoidingView
        keyboardVerticalOffset={keyboardOffset}
        behavior={Platform.select({
          ios: 'padding',
          default: undefined,
        })}>
        <FlatList
          style={{alignSelf: 'stretch'}}
          contentContainerStyle={
            messages.length === 0
              ? {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              : null
          }
          inverted
          keyExtractor={keyExtractor}
          data={messages}
          renderItem={renderItem}
          removeClippedSubviews={false}
          onEndReached={onEndReached}
          ListEmptyComponent={emptyItem}
          ListHeaderComponent={
            <View style={{height: showMenu ? keyboardHeight + 80 : 28}} />
          }
        />
        {!showMenu ? (
          <StyledViewChat
            style={{
              borderColor: borderColor,
              backgroundColor,
            }}>
            <StyledInputChat
              testID="input-chat"
              style={{
                flex: 1,
                paddingVertical: Platform.select({ios: 12}),
                marginRight: 10,
                color: fontColor,
                backgroundColor,
                ...(Platform.OS === 'web'
                  ? {
                      outline: 'none',
                    }
                  : undefined),
              }}
              // @ts-ignore
              ref={input1}
              onFocus={(): void => setShowMenu(false)}
              enablesReturnKeyAutomatically={true}
              multiline={true}
              onKeyPress={onKeyPress}
              returnKeyType="done"
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              value={message}
              onChangeText={onChangeMessage}
            />
            <StyledTouchMenu
              testID="touch-menu"
              onPress={(): void => {
                Keyboard.dismiss();
                setShowMenu(true);
              }}>
              {optionView}
            </StyledTouchMenu>
            <View style={{marginVertical: 8}}>{renderSendButton?.()}</View>
          </StyledViewChat>
        ) : null}
      </StyledKeyboardAvoidingView>
      {showMenu ? (
        <StyledViewBottom>
          <StyledViewChat
            style={{
              borderColor: borderColor,
              backgroundColor: backgroundColor,
            }}>
            <StyledInputChat
              // @ts-ignore
              ref={input2}
              onFocus={(): void => setShowMenu(false)}
              style={{
                flex: 1,
                color: fontColor,
                backgroundColor: backgroundColor,
              }}
              multiline={true}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              value={message}
            />
            <StyledTouchMenu
              testID="touch-menu"
              onPress={(): void => setShowMenu(false)}>
              {optionView}
            </StyledTouchMenu>
            <View
              style={{
                position: 'absolute',
                right: 8,
              }}>
              {renderSendButton?.()}
            </View>
          </StyledViewChat>
          <StyledViewMenu
            testID="view-menu"
            height={keyboardHeight}
            style={{
              backgroundColor: backgroundColor,
            }}>
            {renderViewMenu?.()}
          </StyledViewMenu>
        </StyledViewBottom>
      ) : null}
    </>
  );
}

Shared.defaultProps = {
  messages: [],
  keyboardOffset: 0,
  optionView: <View />,
  emptyItem: <View />,
  renderItem: (): React.ReactElement => <View />,
  renderViewMenu: (): React.ReactElement => <View />,
  message: '',
  onChangeMessage: (): void => {},
  placeholder: '',
  renderSendButton: (): React.ReactElement => <View />,
};

export default Shared;
