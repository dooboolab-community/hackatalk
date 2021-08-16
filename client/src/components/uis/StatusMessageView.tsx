import {Animated, TouchableOpacity} from 'react-native';
import React, {FC, useLayoutEffect, useRef, useState} from 'react';

import styled from '@emotion/native';

const StyledTextstatusMessage = styled.Text`
  font-size: 12px;
  color: white;
  margin-top: 8px;
  align-self: center;
  margin-bottom: 8px;
`;

type Props = {
  statusMessage: String | null;
  transitionOpacity: Animated.Value;
  modalLayout: {
    width: number;
    height: number;
  };
  opened: boolean;
  handleAnim: () => void;
};

const StatusMessageView: FC<Props> = (props: Props) => {
  const [bodyHeight, setBodyHeight] = useState(0);

  const transition = useRef(new Animated.Value(140)).current;

  const {statusMessage, transitionOpacity, modalLayout, opened, handleAnim} =
    props;

  useLayoutEffect(() => {
    if (!opened) {
      Animated.spring(transition, {
        toValue: 140,
        useNativeDriver: true,
      }).start();

      Animated.spring(transitionOpacity, {
        toValue: 0,

        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(transition, {
        toValue: 300 - (110 + bodyHeight),
        useNativeDriver: true,
      }).start();

      Animated.spring(transitionOpacity, {
        toValue: 0.7,
        useNativeDriver: true,
      }).start();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, bodyHeight]);

  if (!statusMessage) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [{translateY: transition}],
        backgroundColor: 'transparent',
        zIndex: 100,
        left: 20 + (modalLayout.width - 200) / 2,
        top: modalLayout.height - 260,
        width: 200,
      }}
      onLayout={(event) => setBodyHeight(event.nativeEvent.layout.height)}>
      <TouchableOpacity onPress={handleAnim}>
        <StyledTextstatusMessage
          numberOfLines={!opened ? 2 : 6}
          ellipsizeMode="tail">
          {`${opened}${statusMessage}`}
        </StyledTextstatusMessage>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default StatusMessageView;
