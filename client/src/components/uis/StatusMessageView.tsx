import {Animated, TouchableOpacity} from 'react-native';
import React, {FC, MutableRefObject, useEffect, useRef, useState} from 'react';

import {Icon} from 'dooboo-ui';
import styled from '@emotion/native';

type StyledTextProps = {
  opened: Boolean;
};

type Props = {
  statusMessage: String;
  transitionOpacity: MutableRefObject<Animated.Value>;
  modalLayout: {
    width: number;
    height: number;
  };
  opened: boolean;
  handleAnim: () => void;
};

const StyledTextstatusMessage = styled.Text<StyledTextProps>`
  font-size: 12px;
  color: white;
  align-self: center;
  font-weight: ${(props) => (props.opened ? 'bold' : 'normal')};
`;

const MAX_STATUS_MESSAGE_LINES = 10;

const StatusMessageView: FC<Props> = (props: Props) => {
  const [bodyHeight, setBodyHeight] = useState(0);

  const [seeMore, setSeeMore] = useState<{show: Boolean; length: number}>({
    show: false,
    length: 0,
  });

  const [textLayoutWidth, setTextLayoutWidth] = useState(0);

  const transition = useRef(new Animated.Value(140)).current;

  const {statusMessage, transitionOpacity, modalLayout, opened, handleAnim} =
    props;

  useEffect(() => {
    if (!opened)
      Animated.parallel([
        Animated.spring(transition, {
          toValue: 140,
          useNativeDriver: true,
        }),
        Animated.spring(transitionOpacity.current, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    else
      Animated.parallel([
        Animated.spring(transition, {
          toValue: 300 - (110 + bodyHeight),
          useNativeDriver: true,
        }),

        Animated.spring(transitionOpacity.current, {
          toValue: 0.7,
          useNativeDriver: true,
        }),
      ]).start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, bodyHeight]);

  useEffect(() => {
    const statusMessageLength = statusMessage?.split('\n').length;

    if (textLayoutWidth >= 195 || statusMessageLength > 2)
      setSeeMore({show: true, length: statusMessageLength || 0});
    else setSeeMore({show: false, length: statusMessageLength || 0});
  }, [statusMessage, textLayoutWidth]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [{translateY: transition}],
        backgroundColor: 'transparent',
        zIndex: 100,
        left: 20 + ((modalLayout?.width || 200) - 200) / 2,
        top: (modalLayout?.height || 260) - 260,
        width: 200,
      }}
      onLayout={(event) => setBodyHeight(event.nativeEvent.layout.height)}>
      <TouchableOpacity
        onPress={handleAnim}
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {seeMore.show && !opened && (
          <Icon
            name="chevron-up-light"
            size={12}
            color="white"
            style={{marginBottom: 4}}
          />
        )}
        <StyledTextstatusMessage
          opened={opened}
          numberOfLines={!opened ? 2 : MAX_STATUS_MESSAGE_LINES}
          ellipsizeMode="tail"
          onTextLayout={(event) => {
            setTextLayoutWidth(
              event.nativeEvent.lines[event.nativeEvent.lines.length - 1].width,
            );
          }}>
          {statusMessage}
        </StyledTextstatusMessage>
        {opened && seeMore.length > MAX_STATUS_MESSAGE_LINES && (
          <StyledTextstatusMessage opened={opened}>...</StyledTextstatusMessage>
        )}
        {seeMore.show && opened && (
          <Icon
            name="chevron-down-light"
            size={12}
            color="white"
            style={{marginTop: 4}}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default StatusMessageView;
