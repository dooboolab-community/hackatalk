import {
  FlatList,
  Image,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { useEffect, useRef, useState } from 'react';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import Button from '../shared/Button';
import { Chat } from '../../types';
import ChatListItem from '../shared/ChatListItem';
import Constants from 'expo-constants';
import EmptyListItem from '../shared/EmptyListItem';
import { Header } from 'react-navigation-stack';
import { IC_SMILE } from '../../utils/Icons';
import { Ionicons } from '@expo/vector-icons';
import { getString } from '../../../STRINGS';

const StyledContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: column;
  align-items: center;
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
`;

const StyledViewChat = styled.View`
  width: 100%;
  border-top-width: 0.5px;
  border-color: ${({ theme }): string => theme.lineColor};
  background-color: ${({ theme }): string => theme.background};
  min-height: 52px;
  max-height: 52;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const StyledInputChat = styled.TextInput`
  width: 80%;
  font-size: 14px;
  margin-right: 20px;
  padding-left: 48px;
  color: black;
  background-color: ${({ theme }): string => theme.background};
`;

const StyledTouchMenu = styled.TouchableOpacity`
  position: absolute;
  left: 10;
  height: 100%;
  min-width: 20px;
  justify-content: center;
`;

const StyledViewBottom = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const StyledViewMenu = styled.View<{ height: number }>`
  background-color: ${({ theme }): string => theme.inactiveColor};
  flex-direction: row;
  flex-wrap: wrap;
  height: ${({ height }): number => height};
`;

interface Props extends ThemeProps<DefaultTheme> {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  isLoading: boolean;
  showMenu: boolean;
  message: string;
  chats: Chat[];
}

function Screen(props: Props): React.ReactElement {
  let keyboardShowListener: any;

  // TODO: typings
  const input1 = useRef<any | null>();
  const input2 = useRef<any | null>();

  const [keyboardHeight, setKeyboardHeight] = useState(258);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '',
      sender: {
        uid: '0',
        displayName: 'sender111',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
      },
      message: 'hello1',
    },
    {
      id: '',
      sender: {
        uid: '2',
        displayName: 'sender111',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
      },
      message:
        'Hello2. This is long message. This is long message.This is long message.' +
        'This is long message. This is long message. This is long message.' +
        'This is long message. This is long message.' +
        'This is long message. This is long message. This is long message.',
    },
    {
      id: '',
      sender: {
        uid: '0',
        displayName: 'sender111',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
      },
      message: 'hello',
    },
    {
      id: '',
      sender: {
        uid: '0',
        displayName: 'sender111',
        thumbURL: '',
        photoURL: '',
        statusMsg: '',
      },
      message: 'hello2',
    },
  ]);

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
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: Chat;
    index: number;
  }): React.ReactElement => {
    return (
      <ChatListItem
        prevItem={index > 0 ? chats[index - 1] : undefined}
        item={item}
      />
    );
  };

  const sendChat = (): void => {};

  const { theme } = props;

  const keyboardOffset = Constants.statusBarHeight + Header.HEIGHT;

  return (
    <StyledContainer>
      <StyledKeyboardAvoidingView
        keyboardVerticalOffset={keyboardOffset}
        behavior={Platform.select({
          android: undefined,
          ios: 'padding',
        })}
      >
        <FlatList
          style={{ alignSelf: 'stretch' }}
          // prettier-ignore
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
          ListEmptyComponent={
            <EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>
          }
        />
        {!showMenu ? (
          <StyledViewChat>
            <StyledInputChat
              testID='input_chat'
              ref={input1}
              onFocus={(): void => setShowMenu(false)}
              multiline={true}
              placeholder={getString('WRITE_MESSAGE')}
              placeholderTextColor={theme.status}
              value={message}
              defaultValue={message}
              onChangeText={(text): void => setMessage(text)}
            />
            <StyledTouchMenu
              testID='touch_menu'
              onPress={(): void => setShowMenu(true)}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={IC_SMILE}
              />
            </StyledTouchMenu>
            <Button
              style={{
                width: 60,
                height: 36,
                marginRight: 8,
              }}
              testID='btn_chat'
              isLoading={isLoading}
              onClick={sendChat}
              text={getString('SEND')}
            />
          </StyledViewChat>
        ) : null}
      </StyledKeyboardAvoidingView>
      {showMenu ? (
        <StyledViewBottom>
          <StyledViewChat>
            <StyledInputChat
              ref={input2}
              onFocus={(): void => setShowMenu(false)}
              multiline={true}
              placeholder={getString('WRITE_MESSAGE')}
              placeholderTextColor={theme.btnPrimary}
              value={message}
              defaultValue={message}
            />
            <StyledTouchMenu
              testID='touch_menu'
              onPress={(): void => setShowMenu(false)}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={IC_SMILE}
              />
            </StyledTouchMenu>
            <Button
              testID='btn_chat'
              isLoading={isLoading}
              onClick={sendChat}
              text={getString('SEND')}
            />
          </StyledViewChat>
          <StyledViewMenu testID='viewMenu' height={keyboardHeight}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  marginLeft: 16,
                  marginTop: 2,
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name='ios-camera'
                  size={36}
                  color={theme ? theme.fontColor : '#3d3d3d'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 16,
                  marginTop: 4,
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name='md-images'
                  size={36}
                  color={theme ? theme.fontColor : '#3d3d3d'}
                />
              </TouchableOpacity>
            </View>
          </StyledViewMenu>
        </StyledViewBottom>
      ) : null}
    </StyledContainer>
  );
}

export default withTheme(Screen);
