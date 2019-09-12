import Icon5, { FA5Style } from '@expo/vector-icons/FontAwesome5';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationScreenProp, NavigationStateRoute } from 'react-navigation';
import React, { Component, useEffect, useState } from 'react';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import Button from '../shared/Button';
import { IC_MASK } from '../../utils/Icons';
import TextInput from '../shared/TextInput';
import { getString } from '../../../STRINGS';

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: column;
  align-items: center;
`;

const StyledScrollView = styled.ScrollView`
  align-self: stretch;
`;

const StyledWrapper = styled.View`
  margin-top: 48px;
  width: 78%;
  flex-direction: column;
  align-items: center;
`;

const StyledBtnWrapper = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 48px;
`;

interface Props extends ThemeProps<DefaultTheme> {
  navigation: any;
}

interface State {
  isUpdating: boolean;
  displayName: string;
  statusMsg: string;
}

function Screen(props: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    if (isUpdating) {
      try {
        props.navigation.goBack();
      } catch (err) {
        console.error(err);
      } finally {
        setIsUpdating(false);
      }
    }
  }, [isUpdating]);

  const onLogout = () => {
    props.navigation.navigate('AuthStackNavigator');
  };

  const onUpdate = () => {
    setIsUpdating(true);
  };

  const onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'DISPLAY_NAME':
        setDisplayName(text);
        break;
      case 'STATUS_MSG':
        setStatusMsg(text);
        break;
    }
  };

  const onPressImg = () => {};

  const {
    theme: {
      colors: { text },
    },
  } = props;

  return (
    <StyledContainer>
      <StyledScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledWrapper>
          <TouchableOpacity activeOpacity={0.5} onPress={onPressImg}>
            <Icon5 name='meh' size={80} color={text} light />
          </TouchableOpacity>
          <TextInput
            testID='input_name'
            style={{ marginTop: 80 }}
            txtLabel={getString('NAME')}
            txtHint={getString('NAME')}
            txt={displayName}
            onTextChanged={(text) => onTextChanged('DISPLAY_NAME', text)}
            placeholderTextColor={text}
          />
          <TextInput
            testID='input_status'
            style={{ marginTop: 24 }}
            txtLabel={getString('STATUS_MSG')}
            txtHint={getString('STATUS_MSG')}
            txt={statusMsg}
            onTextChanged={(text) => onTextChanged('STATUS_MSG', text)}
            placeholderTextColor={text}
          />
          <StyledBtnWrapper>
            <Button testID='logout_btn' onPress={onLogout} isWhite>
              {getString('LOGOUT')}
            </Button>
            <View style={{ width: 8 }} />
            <Button
              testID='update_btn'
              isLoading={isUpdating}
              onPress={onUpdate}
            >
              {getString('UPDATE')}
            </Button>
          </StyledBtnWrapper>
        </StyledWrapper>
      </StyledScrollView>
    </StyledContainer>
  );
}

export default withTheme(Screen);
