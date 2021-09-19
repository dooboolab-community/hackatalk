import {
  ImageSourcePropType,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {graphql, useFragment} from 'react-relay';

import CheckBox from './CheckBox';
import {FontAwesome} from '@expo/vector-icons';
import {IC_NO_IMAGE} from '../../utils/Icons';
import React from 'react';
import {UserListItem_user$key} from '../../__generated__/UserListItem_user.graphql';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';
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
  style?: ViewStyle;
  user: UserListItem_user$key;
  onPress?: () => void;
  onLongPress?: () => void;
  showCheckBox?: boolean;
  showStatus?: boolean;
  checked?: boolean;
  isMyself?: boolean;
}

const Container = styled.View`
  width: 100%;
`;

const Wrapper = styled.View<{isMyself?: boolean}>`
  background-color: ${({theme}) => theme.itemBackground};
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${(props) =>
    props.isMyself ? props.theme.disabled : props.theme.backgroundDark};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;

const ImageWrapper = styled.View<{isMyself?: boolean}>`
  width: ${(props) => (props.isMyself ? '50px' : '40px')};
  height: ${(props) => (props.isMyself ? '50px' : '40px')};
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

const StyledImage = styled.Image<{isMyself?: boolean}>`
  width: ${({isMyself}) => (isMyself ? '50px' : '40px')};
  height: ${(props) => (props.isMyself ? '50px' : '40px')};
  border-radius: ${(props) => (props.isMyself ? '25px' : '20px')}; ;
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
  color: ${({theme}) => theme.textSecondaryColor};
  max-width: 120px;
  padding: 4px 8px;
  overflow: hidden;
`;

function Shared({
  showCheckBox = false,
  showStatus = false,
  checked = false,
  onPress,
  onLongPress,
  user,
  isMyself,
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
        testID="peer-button"
        activeOpacity={0.5}
        onPress={onPress}
        delayPressIn={130}
        onLongPress={onLongPress}
      >
        <Wrapper isMyself={isMyself} testID="userListItem-wrapper">
          <ImageWrapper isMyself={isMyself}>
            <StyledImage
              resizeMode="cover"
              source={photoURL && photoURLObj ? photoURLObj : IC_NO_IMAGE}
              isMyself={isMyself}
            />
            {showStatus && !isMyself && (
              <StatusTag
                style={{backgroundColor: isOnline ? '#00D4AB' : '#AFB4C3'}}
              />
            )}
            {hasBlocked && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                <FontAwesome
                  name="ban"
                  size={16}
                  color={hasBlocked ? 'red' : 'white'}
                />
              </View>
            )}
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
          ) : (
            <StyledRightText numberOfLines={1} ellipsizeMode={'tail'}>
              {statusMessage || ''}
            </StyledRightText>
          )}
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
