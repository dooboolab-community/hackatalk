import {
  FlatList,
  Keyboard,
  ListRenderItem,
  Platform,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

import TagUserListItem from '../uis/TagUserListItem';
import type {User} from '../pages/Message';
import styled from '@emotion/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  align-self: stretch;

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledViewChat = styled.View`
  width: 100%;
  max-width: 100%;
  border-top-width: 0.3px;
  border-color: ${({theme}) => theme.disabled};
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
  padding-left: 40px;
  padding-bottom: 4px;
`;

const StyledTouchMenu = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  height: 100%;
  min-width: 20px;
  padding: 4px;
  justify-content: center;
`;

const InputMenuViewWrapper = styled.View`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

const MenuView = styled.View<{height: number}>`
  flex-direction: row;
  flex-wrap: wrap;
  height: ${({height}): string => `${height}px`};
`;

interface Props<T> {
  tagUsers: User[];
  selectTagUser: (user: User) => void;
  messages: T[];
  borderColor?: string;
  backgroundColor?: string;
  fontColor?: string;
  onEndReached?: () => void;
  keyboardOffset?: number;
  renderItem: ListRenderItem<T>;
  keyExtractor?: (item: T, index: number) => string;
  openedOptionView?: React.ReactElement;
  closedOptionView?: React.ReactElement;
  emptyItem?: React.ReactElement;
  renderViewMenu?: () => React.ReactElement;
  message?: string;
  onChangeMessage?: (text: string) => void;
  onChangeCursor?: (item: {start: number; end: number}) => void;
  onKeyPress?: TextInputProps['onKeyPress'];
  placeholder?: string;
  placeholderTextColor?: string;
  renderSendButton?: () => React.ReactElement;
}

const MENU_HEIGHT = 56;

function Shared<T>(props: Props<T>): React.ReactElement {
  const input1 = useRef<TextInput>();
  const input2 = useRef<TextInput>();

  const {
    selectTagUser,
    tagUsers,
    messages,
    borderColor,
    backgroundColor,
    fontColor,
    keyboardOffset,
    renderItem,
    keyExtractor,
    emptyItem,
    renderViewMenu,
    openedOptionView,
    closedOptionView,
    message,
    onChangeMessage,
    onChangeCursor,
    placeholder,
    placeholderTextColor,
    renderSendButton,
    onEndReached,
    onKeyPress: onKeyPress,
  } = props;

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  const renderTagItem: ListRenderItem<User> = ({item}) => (
    <TagUserListItem tagUser={item} selectTagUser={selectTagUser} />
  );

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
            <View style={{height: showMenu ? MENU_HEIGHT + 80 : 28}} />
          }
        />
        {tagUsers.length > 0 ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              bottom: showMenu ? MENU_HEIGHT + 50 : MENU_HEIGHT,
              height: tagUsers.length * 70 > 250 ? 250 : tagUsers.length * 70,
            }}
          >
            <FlatList
              data={tagUsers}
              renderItem={renderTagItem}
              style={{flex: 2}}
            />
          </View>
        ) : null}
        {!showMenu ? (
          <StyledViewChat
            style={{
              borderColor: borderColor,
              backgroundColor,
            }}
          >
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
              onSelectionChange={({
                nativeEvent: {
                  selection: {start, end},
                },
              }) => {
                if (onChangeCursor) onChangeCursor({start, end});
              }}
            />
            <StyledTouchMenu
              testID="touch-menu"
              onPress={(): void => {
                Keyboard.dismiss();
                setShowMenu(true);
              }}
            >
              {showMenu ? openedOptionView : closedOptionView}
            </StyledTouchMenu>
            {renderSendButton?.()}
          </StyledViewChat>
        ) : null}
      </StyledKeyboardAvoidingView>
      {showMenu ? (
        <InputMenuViewWrapper style={{paddingBottom: insets.bottom}}>
          <StyledViewChat
            style={{
              borderColor: borderColor,
              backgroundColor: backgroundColor,
            }}
          >
            <StyledInputChat
              // @ts-ignore
              ref={input2}
              showSoftInputOnFocus={false}
              onFocus={(): void => {
                setShowMenu(false);

                setTimeout(() => {
                  input1.current?.focus();
                });
              }}
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
              onPress={(): void => setShowMenu(false)}
            >
              {showMenu ? openedOptionView : closedOptionView}
            </StyledTouchMenu>
            <View
              style={{
                position: 'absolute',
                right: 8,
              }}
            >
              {renderSendButton?.()}
            </View>
          </StyledViewChat>
          <MenuView
            testID="view-menu"
            height={MENU_HEIGHT}
            style={{
              backgroundColor: backgroundColor,
            }}
          >
            {renderViewMenu?.()}
          </MenuView>
        </InputMenuViewWrapper>
      ) : null}
    </>
  );
}

Shared.defaultProps = {
  selectTagUser: (): void => {},
  tagUsers: [],
  messages: [],
  keyboardOffset: 0,
  optionView: <View />,
  emptyItem: <View />,
  renderItem: (): React.ReactElement => <View />,
  renderViewMenu: (): React.ReactElement => <View />,
  message: '',
  onChangeMessage: (_message: string): void => {},
  onChangeCursor: (_param: {start: number; end: number}): void => {},
  placeholder: '',
  renderSendButton: (): React.ReactElement => <View />,
};

export default Shared;
