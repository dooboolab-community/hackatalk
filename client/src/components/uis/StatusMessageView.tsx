import {Animated, TouchableOpacity} from 'react-native';
import type {FC, MutableRefObject} from 'react';
import React, {useEffect, useRef, useState} from 'react';

import {Icon} from 'dooboo-ui';
import styled from '@emotion/native';

type StyledTextProps = {
  isStatusMessageExpanded: Boolean;
};

type Props = {
  statusMessage: String;
  transitionOpacity: MutableRefObject<Animated.Value>;
  modalLayout: {
    width: number;
    height: number;
  };
  isStatusMessageExpanded: boolean;
  handleAnim: () => void;
};

const StyledTextStatusMessage = styled.Text<StyledTextProps>`
  font-size: 12px;
  color: white;
  align-self: center;
  text-align: center;
  font-weight: ${(props) =>
    props.isStatusMessageExpanded ? 'bold' : 'normal'};
`;

export const MAX_STATUS_MESSAGE_LINES = 10;

const StatusMessageView: FC<Props> = ({
  statusMessage,
  transitionOpacity,
  modalLayout,
  isStatusMessageExpanded,
  handleAnim,
}) => {
  const [bodyHeight, setBodyHeight] = useState(0);

  const [showArrow, setShowArrow] = useState<{show: Boolean; length: number}>({
    show: false,
    length: 0,
  });

  const [textLayoutWidth, setTextLayoutWidth] = useState(0);

  const transition = useRef(new Animated.Value(140)).current;

  useEffect(() => {
    if (!isStatusMessageExpanded) {
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
    } else {
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStatusMessageExpanded, bodyHeight]);

  useEffect(() => {
    const statusMessageLength = statusMessage.split('\n').length;
    if (textLayoutWidth >= 195 || statusMessageLength > 2) {
      setShowArrow({show: true, length: statusMessageLength});
    } else if (!isStatusMessageExpanded) {
      setShowArrow({show: false, length: statusMessageLength});
    }
  }, [statusMessage, textLayoutWidth, isStatusMessageExpanded]);

  return (
    <Animated.View
      testID="view-animated"
      style={{
        position: 'absolute',
        overflow: 'hidden',
        transform: [{translateY: transition}],
        backgroundColor: 'transparent',
        zIndex: 100,
        top: (modalLayout.height || 260) - 260,
        width: 200,
      }}
      onLayout={(event) => setBodyHeight(event.nativeEvent.layout.height)}
    >
      <TouchableOpacity
        testID="touchable-statusMessageView"
        onPress={handleAnim}
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {showArrow.show && !isStatusMessageExpanded && (
          <Icon
            name="ChevronUpAlt"
            size={12}
            color="white"
            style={{marginBottom: 4}}
          />
        )}
        <StyledTextStatusMessage
          testID="text-main"
          isStatusMessageExpanded={isStatusMessageExpanded}
          numberOfLines={isStatusMessageExpanded ? MAX_STATUS_MESSAGE_LINES : 2}
          ellipsizeMode="tail"
          onTextLayout={(event) => {
            if (event.nativeEvent.lines.length) {
              setTextLayoutWidth(
                event.nativeEvent.lines[event.nativeEvent.lines.length - 1]
                  .width,
              );
            }
          }}
        >
          {statusMessage}
        </StyledTextStatusMessage>
        {isStatusMessageExpanded &&
          showArrow.length > MAX_STATUS_MESSAGE_LINES && (
            <StyledTextStatusMessage
              testID="text-end"
              isStatusMessageExpanded={isStatusMessageExpanded}
            >
              ...
            </StyledTextStatusMessage>
          )}
        {showArrow.show && isStatusMessageExpanded && (
          <Icon
            name="ChevronDownAlt"
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
