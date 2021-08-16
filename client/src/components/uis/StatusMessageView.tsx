import {Animated, Easing, TouchableOpacity} from 'react-native';
import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';

import styled from '@emotion/native';

// import {useRef} from 'react';

// const Container = styled.View`
//   /* left: 0px; */
//   position: absolute;

//   width: 200px;
//   background-color: transparent;
//   /* flex-direction: column; */
//   /* align-items: center; */
//   justify-content: flex-end;
// `;

const StyledTextstatusMessage = styled.Text`
  /* position: absolute; */
  left: 0;
  font-size: 12px;
  color: white;
  margin-top: 8px;
  /* align-self: center; */
  margin-bottom: 8px;
`;

type Props = {
  statusMessage: String | null;
};

const StatusMessageView: FC<Props> = (props: Props) => {
  const [opened, setOpened] = useState(false);

  const transition = useRef(new Animated.Value(140)).current;

  const {statusMessage} = props;

  // if (!statusMessage) return null;

  // const splits = statusMessage.split('\n');

  // if (splits.length < 3)
  //   <StyledTextstatusMessage numberOfLines={2} ellipsizeMode={'tail'}>
  //     {statusMessage}
  //   </StyledTextstatusMessage>;

  // const data: Datum[] = [
  //   {title: splits.slice(0, 2).join('\n'), bodies: splits.slice(2)},
  // ];

  useLayoutEffect(() => {
    if (!opened) {
      console.log('will !opened transition:', transition);

      Animated.timing(transition, {
        toValue: 140,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      // return () => {};
    } else {
      console.log('will opened transition:', transition);

      Animated.timing(transition, {
        toValue: 50,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      console.log('unmount');
    };
  }, [opened]);

  // // console.log('check if null');
  // if (!statusMessage) return null;

  // console.log('is not null');

  const _handleAnim: () => void = () => setOpened(!opened);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [{translateY: transition}],
        width: 200,
        backgroundColor: 'transparent',
      }}>
      <TouchableOpacity onPress={_handleAnim}>
        <StyledTextstatusMessage
          {...(!opened && {numberOfLines: 2, ellipsizeMode: 'tail'})}
          // numberOfLines={2}
          // ellipsizeMode={'tail'}
        >
          {`${opened}${statusMessage}`}
        </StyledTextstatusMessage>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default StatusMessageView;
