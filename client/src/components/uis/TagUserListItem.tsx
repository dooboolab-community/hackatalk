import {
  ImageSourcePropType,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

import {IC_NO_IMAGE} from '../../utils/Icons';
import React from 'react';
import {getString} from '../../../STRINGS';
import styled from '@emotion/native';

interface Props {
  style?: ViewStyle;
  onPress?: () => void;
  tagUser: {
    readonly id: string;
    readonly nickname: string | null;
    readonly name: string | null;
    readonly photoURL: string | null;
  } | null;
  showTageUsers: (
    users: ({
      readonly id: string;
      readonly nickname: string | null;
      readonly name: string | null;
      readonly photoURL: string | null;
    } | null)[],
  ) => void;
  selectdTagUser: (
    user: {
      readonly id: string;
      readonly nickname: string | null;
      readonly name: string | null;
      readonly photoURL: string | null;
    } | null,
  ) => void;
}

const Container = styled.View`
  width: 100%;
`;

const Wrapper = styled.View`
  background-color: ${({theme}) => theme.card};
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;

const ImageWrapper = styled.View`
  width: ${() => '40px'};
  height: ${() => '40px'};
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.Image<{isMe?: boolean}>`
  width: ${() => '40px'};
  height: ${() => '40px'};
  border-radius: ${() => '20px'}; ;
`;

const StyledText = styled.Text`
  margin-left: 12px;
  width: 200px;
  font-size: 14px;
  font-weight: bold;
  color: ${({theme}) => theme.text};
`;

function Shared({
  tagUser,
  showTageUsers,
  selectdTagUser,
}: Props): React.ReactElement {
  const photoURLObj: ImageSourcePropType | null =
    typeof tagUser?.photoURL === 'string' ? {uri: tagUser?.photoURL} : null;

  return (
    <Container>
      <TouchableWithoutFeedback
        onPress={() => {
          showTageUsers([]);
          selectdTagUser(tagUser);
        }}
      >
        <Wrapper testID="userListItem-wrapper">
          <ImageWrapper>
            <StyledImage
              resizeMode="cover"
              source={tagUser?.photoURL ? photoURLObj : IC_NO_IMAGE}
            />
          </ImageWrapper>
          <StyledText numberOfLines={1}>
            {tagUser?.nickname || tagUser?.name || getString('NO_NAME')}
          </StyledText>
        </Wrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
}

Shared.defaultProps = {
  showTageUsers: (): void => {},
  selectdTagUser: (): void => {},
};

export default Shared;
