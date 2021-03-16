import {
  ImageSourcePropType,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {graphql, useFragment} from 'react-relay/hooks';

import CheckBox from './CheckBox';
import {FontAwesome} from '@expo/vector-icons';
import {IC_NO_IMAGE} from '../../utils/Icons';
import React from 'react';
import {UserListItem_user$key} from '../../__generated__/UserListItem_user.graphql';
import {getString} from '../../../STRINGS';
import styled from 'styled-components/native';
import {useTheme} from 'dooboo-ui';

const fragment = graphql`
  fragment UserListItem_user on User {
    id
    photoURL
    nickname
    name
    statusMessage
    isOnline
    hasBlocked
  }
`;

interface Props {
  testID?: string;
  style?: ViewStyle;
  user: UserListItem_user$key;
  onPress?: () => void;
  onLongPress?: () => void;
  showCheckBox?: boolean;
  showStatus?: boolean;
  checked?: boolean;
}

const Container = styled.View`
  width: 100%;
`;

const Wrapper = styled.View`
  background-color: ${({theme}) => theme.itemBackground};
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.backgroundDark};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;

const ImageWrapper = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const StatusTag = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 25px;
`;

const StyledImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const StyledText = styled.Text`
  margin-left: 12px;
  width: 200px;
  font-size: 14px;
  font-weight: bold;
  color: ${({theme}) => theme.text};
`;

const StyledRightText = styled.Text`
  position: absolute;
  right: 20px;
  font-size: 12px;
  color: ${({theme}) => theme.secondaryText};
  max-width: 120px;
  border-width: 0.3px;
  border-color: ${({theme}) => theme.lineColor};
  padding: 4px 8px;
`;

function Shared({
  showCheckBox = false,
  showStatus = false,
  checked = false,
  onPress,
  onLongPress,
  testID,
  user,
}: Props): React.ReactElement {
  const {
    photoURL = '',
    nickname,
    name,
    statusMessage,
    isOnline,
    hasBlocked,
  } = useFragment(fragment, user);

  const {theme} = useTheme();

  const photoURLObj: ImageSourcePropType | null =
    typeof photoURL === 'string' ? {uri: photoURL} : photoURL;

  return (
    <Container>
      <TouchableOpacity
        testID={testID}
        activeOpacity={0.5}
        onPress={onPress}
        onLongPress={onLongPress}>
        <Wrapper>
          <ImageWrapper>
            <StyledImage
              resizeMode="cover"
              source={photoURL && photoURLObj ? photoURLObj : IC_NO_IMAGE}
            />
            {showStatus ? (
              <StatusTag
                style={{backgroundColor: isOnline ? '#00D4AB' : '#AFB4C3'}}
              />
            ) : null}
            {hasBlocked ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}>
                <FontAwesome
                  name="ban"
                  size={16}
                  color={hasBlocked ? 'red' : 'white'}
                />
              </View>
            ) : null}
          </ImageWrapper>
          <StyledText numberOfLines={1}>
            {nickname || name || getString('NO_NAME')}
          </StyledText>
          {showCheckBox ? (
            <CheckBox
              containerStyle={{
                position: 'absolute',
                right: 20,
              }}
              backgroundColor={theme.background}
              checkColor={theme.text}
              inActiveColor={theme.inactiveColor}
              activeColor={theme.checkBackground}
              hasChecked={checked}
              onToggle={onPress}
            />
          ) : statusMessage ? (
            <StyledRightText>{statusMessage}</StyledRightText>
          ) : null}
        </Wrapper>
      </TouchableOpacity>
    </Container>
  );
}

Shared.defaultProps = {
  user: {
    id: '',
    name: '',
    photoURL: null,
    statusMessage: '',
    isOnline: false,
    friends: [],
    channels: [],
    createdAt: undefined,
    updatedAt: undefined,
  },
};

export default Shared;
