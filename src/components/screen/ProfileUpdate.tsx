import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import Button from '../shared/Button';
import { Ionicons } from '@expo/vector-icons';
import TextInput from '../shared/TextInput';
import { getString } from '../../../STRINGS';

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
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
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

function Screen(props: Props): React.ReactElement {
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    if (isUpdating) {
      try {
        if (props.navigation) {
          props.navigation.goBack();
        }
      } catch (err) {
        // console.error(err);
      } finally {
        setIsUpdating(false);
      }
    }
  }, [isUpdating]);

  const onLogout = (): void => {
    if (props.navigation) {
      props.navigation.navigate('AuthStackNavigator');
    }
  };

  const onUpdate = (): void => {
    setIsUpdating(true);
  };

  const onTextChanged = (type: string, text: string): void => {
    // prettier-ignore
    switch (type) {
    case 'DISPLAY_NAME':
      setDisplayName(text);
      break;
    case 'STATUS_MSG':
      setStatusMsg(text);
      break;
    }
  };

  const onPressImg = (): void => {};

  const { theme } = props;

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
            <Ionicons
              name='ios-person'
              size={80}
              color={theme ? theme.fontColor : '#3d3d3d'}
            />
          </TouchableOpacity>
          <TextInput
            testID='input_name'
            style={{ marginTop: 80 }}
            txtLabel={getString('NAME')}
            txtHint={getString('NAME')}
            txt={displayName}
            onTextChanged={(text: string): void =>
              onTextChanged('DISPLAY_NAME', text)
            }
            placeholderTextColor={theme.placeholder}
          />
          <TextInput
            testID='input_status'
            style={{ marginTop: 24 }}
            txtLabel={getString('STATUS_MSG')}
            txtHint={getString('STATUS_MSG')}
            txt={statusMsg}
            onTextChanged={(text: string): void =>
              onTextChanged('STATUS_MSG', text)
            }
            placeholderTextColor={theme.placeholder}
          />
          <StyledBtnWrapper>
            <Button
              containerStyle={{
                flex: 1,
              }}
              style={{
                backgroundColor: '#e6677e',
                borderColor: theme.lineColor,
              }}
              testID='logout_btn'
              onClick={onLogout}
              text={getString('LOGOUT')}
            />
          </StyledBtnWrapper>
        </StyledWrapper>
      </StyledScrollView>
    </StyledContainer>
  );
}

export default withTheme(Screen);
