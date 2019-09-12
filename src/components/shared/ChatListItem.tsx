import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import { Chat } from '../../models/Chat';
import Icon5 from '@expo/vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { User } from '../../models/User';
import moment from 'moment';

const StyledWrapperPeer = styled.View<{ isSame: boolean }>`
  min-height: 48px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 8px;
  margin-top: ${({ isSame }) => (isSame ? 0 : 20)}px;
`;

const StyledImageSender = styled.Image`
  width: 32px;
  height: 32px;
`;

const StyledTextPeerMessageContainer = styled.View`
  margin-right: 8px;
  background-color: ${({ theme }) => theme.colors.subBackground};
  border-radius: 3px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: 12px;
  shadow-color: ${({
    theme: {
      colors: { paleGray },
    },
  }) => paleGray};
  shadow-offset: 0 2px;
  margin-vertical: 4px;
`;

const StyledTextPeerMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledTextPeerName = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`;

const StyledTextPeerDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 20px;
`;

const StyledWrapperMy = styled.View`
  min-height: 48px;
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledTextDate = styled.Text`
  font-size: 12px;
  color: ${({
    theme: {
      colors: { cloudyBlue },
    },
  }) => cloudyBlue};
  margin-top: 4px;
  margin-right: 20px;
`;

const StyledTextMessage = styled.Text`
  font-size: 14px;
  color: white;
`;

const StyledLinearGradient = styled(LinearGradient)`
  margin-horizontal: 20px;
  margin-left: 8px;
  padding: 12px;
  border-radius: 3px;
`;

interface Props extends ThemeProps<DefaultTheme> {
  item: Chat;
  prevItem?: Chat;
  onPressPeerImage?: VoidFunction;
}

interface ImageSenderProps {
  photoURL?: string;
  isSamePeerMsg: boolean;
  text: string;
}

const myFakeUid = '2'; // TODO: temporary

const ImageSenderComp: FC<IImageSenderProps> = ({
  photoURL,
  isSamePeerMsg,
  text,
}) => {
  if (photoURL !== '') {
    return <StyledImageSender source={{ uri: photoURL }} />;
  } else if (isSamePeerMsg) {
    return <View style={{ width: 40 }} />;
  }
  return <Icon5 name='meh' size={40} color={text} light />;
};

function Shared({
  item: {
    sender: { uid, displayName, photoURL },
    message,
    created,
  },
  prevItem,
  onPressPeerImage,
  theme: {
    colors: { text, dodgerBlue },
  },
}: Props) {
  const isSamePeerMsg = prevItem && prevItem.sender.uid === uid;
  if (uid !== myFakeUid) {
    // peer message
    return (
      <StyledWrapperPeer isSame={isSamePeerMsg}>
        <View style={{ marginRight: 8 }}>
          <TouchableOpacity testID='peer_image' onPress={onPressPeerImage}>
            <ImageSenderComp
              photoURL={photoURL}
              isSamePeerMsg={isSamePeerMsg}
              text={text}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column' }}>
          {isSamePeerMsg ? (
            <View />
          ) : (
            <StyledTextPeerName>{displayName}</StyledTextPeerName>
          )}
          <StyledTextPeerMessageContainer>
            <StyledTextPeerMessage>{message}</StyledTextPeerMessage>
          </StyledTextPeerMessageContainer>
          <StyledTextPeerDate>
            {created
              ? `${moment(created).hour()} : ${moment(created).minutes()}`
              : '0 : 0'}
          </StyledTextPeerDate>
        </View>
      </StyledWrapperPeer>
    );
  }
  return (
    <StyledWrapperMy>
      <StyledLinearGradient
        start={{ x: 0.2, y: 0.4 }}
        end={{ x: 1.0, y: 0.8 }}
        locations={[0, 0.85]}
        colors={['rgb(100,152,212)', dodgerBlue]}
      >
        <StyledTextMessage>{message}</StyledTextMessage>
      </StyledLinearGradient>
      <StyledTextDate>
        {created
          ? `${moment(created).hour()} : ${moment(created).minutes()}`
          : '0 : 0'}
      </StyledTextDate>
    </StyledWrapperMy>
  );
}

Shared.defaultProps = {
  item: new Chat('', new User('', '', '', ''), ''),
};

export default withTheme(Shared);
