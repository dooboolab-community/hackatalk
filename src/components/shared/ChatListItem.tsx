import React, { SFC } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ChatProps } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

const WrapperPeer = styled.View<{ isSame: boolean }>`
  min-height: 48px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 8px;
  margin-top: ${({ isSame }): number => (isSame ? 8 : 20)}px;
`;

const StyledImageSender = styled.Image`
  width: 32px;
  height: 32px;
`;

const StyledTextPeerMessageContainer = styled.View`
  margin-right: 8px;
  background-color: ${({ theme }): string => theme.background};
  border-radius: 3px;
  border-width: 1px;
  border-color: ${({ theme }): string => theme.lineColor};
  padding: 12px;
  width: 100%;
`;

const StyledTextPeerMessage = styled.Text`
  font-size: 14px;
  color: ${({ theme }): string => theme.fontColor};
`;

const StyledTextPeerName = styled.Text`
  font-size: 12px;
  color: ${({ theme }): string => theme.fontColor};
  margin-bottom: 2px;
`;

const StyledTextPeerDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }): string => theme.fontColor};
  margin-right: 20px;
  margin-top: 4px;
`;

const WrapperMy = styled.View`
  min-height: 48px;
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledTextDate = styled.Text`
  font-size: 12px;
  color: ${({ theme }): string => theme.status};
  margin-top: 4px;
  margin-right: 20px;
`;

const StyledTextMessage = styled.Text`
  font-size: 14px;
  color: white;
`;

const StyledLinearGradient = styled(LinearGradient)`
  margin-right: 20px;
  margin-left: 28px;
  padding: 12px;
  border-radius: 3px;
`;

interface Props {
  item: ChatProps;
  prevItem?: ChatProps;
  onPressPeerImage?: () => void;
  testID?: string;
}

interface ImageSenderProps {
  photoURL?: string;
  isSamePeerMsg: boolean;
  fontColor: string;
}

const myFakeUid = '2'; // TODO: temporary

const ImageSenderComp: SFC<ImageSenderProps> = ({
  photoURL,
  isSamePeerMsg,
  fontColor,
}) => {
  if (photoURL !== '') {
    return <StyledImageSender source={{ uri: photoURL }} />;
  } else if (isSamePeerMsg) {
    return <View style={{ width: 40 }} />;
  }
  return (
    <View style={{ width: 40 }}>
      <Ionicons name="ios-person" size={40} color={fontColor} />
    </View>
  );
};

function Shared(props: Props): React.ReactElement {
  const { theme } = useThemeContext();
  const {
    item: {
      sender: { uid, displayName, photoURL },
      messageType,
      // @ts-ignore
      message,
      created,
    },
    prevItem,
    onPressPeerImage,
    testID,
  } = props;
  const isSamePeerMsg = prevItem && prevItem.sender.uid === uid;
  if (uid !== myFakeUid) {
    // peer message
    return (
      <WrapperPeer isSame={!!isSamePeerMsg}>
        <View style={{ marginRight: 8, width: 40 }}>
          <TouchableOpacity testID={testID} onPress={onPressPeerImage}>
            <ImageSenderComp
              photoURL={photoURL}
              isSamePeerMsg={!!isSamePeerMsg}
              fontColor={theme.fontColor}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', maxWidth: '90%' }}>
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
      </WrapperPeer>
    );
  }
  return (
    <WrapperMy>
      <StyledLinearGradient
        start={[0.7, 0.4]}
        end={[1.0, 0.6]}
        locations={[0, 1]}
        colors={[theme.primary, theme.primaryLight]}
      >
        <StyledTextMessage>{message}</StyledTextMessage>
      </StyledLinearGradient>
      <StyledTextDate>
        {created
          ? `${moment(created).hour()} : ${moment(created).minutes()}`
          : '0 : 0'}
      </StyledTextDate>
    </WrapperMy>
  );
}

Shared.defaultProps = {
  item: {
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
};

export default Shared;
