import {
  FlatList,
  Image,
  Keyboard,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon5, { FA5Style } from '@expo/vector-icons/FontAwesome5';
import React, { useEffect, useRef, useState } from 'react';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import Button from '../shared/Button';
import { Chat } from '../../models/Chat';
import ChatListItem from '../shared/ChatListItem';
import EmptyListItem from '../shared/EmptyListItem';
import { Header } from 'react-navigation';
import { IC_SMILE } from '../../utils/Icons';
import { User } from '../../models/User';
import { getString } from '../../../STRINGS';

const StyledContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
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
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 52px;
  max-height: 100px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const StyledInputChat = styled.TextInput`
  width: 80%;
  font-size: 14px;
  margin-right: 20px;
  padding-left: 48px;
  color: black;
  background-color: ${({ theme }) => theme.colors.background};
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
  background-color: ${({
    theme: {
      colors: { paleGray },
    },
  }) => paleGray};
  flex-direction: row;
  flex-wrap: wrap;
  height: ${({ height }) => height};
`;

interface Props extends ThemeProps<DefaultTheme> {
  navigation: any;
}

interface State {
  isLoading: boolean;
  showMenu: boolean;
  message: string;
  chats: Chat[];
}

function Screen(props: Props, state: State) {
  let keyboardShowListener: any;

  const input1 = useRef(null);
  const input2 = useRef(null);
  const [keyboardHeight, setKeyboardHeight] = useState(258);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([
    new Chat('', new User('0', 'sender111', ''), 'hello1'),
    new Chat(
      '',
      new User('0', 'sender111', ''),
      'Hello2. This is long message. This is long message. This is long message.This is long message. This is long message. This is long message. This is long message. This is long message. This is long message. This is long message. This is long message.',
    ),
    new Chat('', new User('1', 'sender2222', ''), 'hello'),
    new Chat('', new User('2', 'sender2222', ''), 'hello'),
    new Chat(
      '',
      new User('2', 'sender2222', ''),
      'hello. This is my long message. This is my long message. This is my long message. This is my long message. This is my long message. This is my long message. This is my long message. This is my long message. This is my long message.',
    ),
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
    return () => {
      if (keyboardShowListener) {
        keyboardShowListener.remove();
      }
    };
  });

  const renderItem = ({ item, index }: any) => {
    return (
      <ChatListItem
        prevItem={index > 0 ? chats[index - 1] : null}
        item={item}
      />
    );
  };

  const sendChat = () => {};

  const {
    theme: {
      colors: { text, cloudyBlue },
    },
  } = props;

  return (
    <StyledContainer>
      <StyledKeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT}
        behavior={Platform.select({
          android: null,
          ios: 'padding',
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
          keyExtractor={(item, index) => index.toString()}
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
              onFocus={() => setShowMenu(false)}
              multiline={true}
              placeholder={getString('WRITE_MESSAGE')}
              placeholderTextColor={cloudyBlue}
              value={message}
              defaultValue={message}
              onChangeText={(text) => setMessage(text)}
            />
            <StyledTouchMenu
              testID='touch_menu'
              onPress={() => setShowMenu(true)}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={IC_SMILE}
              />
            </StyledTouchMenu>
            <Button testID='btn_chat' isLoading={isLoading} onPress={sendChat}>
              {getString('SEND')}
            </Button>
          </StyledViewChat>
        ) : null}
      </StyledKeyboardAvoidingView>
      {showMenu ? (
        <StyledViewBottom>
          <StyledViewChat>
            <StyledInputChat
              ref={input2}
              onFocus={() => setShowMenu(false)}
              multiline={true}
              placeholder={getString('WRITE_MESSAGE')}
              placeholderTextColor={cloudyBlue}
              value={message}
              defaultValue={message}
            />
            <StyledTouchMenu
              testID='touch_menu'
              onPress={() => setShowMenu(false)}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={IC_SMILE}
              />
            </StyledTouchMenu>
            <Button testID='btn_chat' isLoading={isLoading} onPress={sendChat}>
              {getString('SEND')}
            </Button>
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
                <Icon5 name='camera' size={36} color={text} light />
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
                <Icon5 name='image' size={40} color={text} light />
              </TouchableOpacity>
            </View>
          </StyledViewMenu>
        </StyledViewBottom>
      ) : null}
    </StyledContainer>
  );
}

export default withTheme(Screen);
