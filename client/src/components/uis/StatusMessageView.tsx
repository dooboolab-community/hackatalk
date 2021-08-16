import {Accordion, Datum} from 'dooboo-ui';
import React, {FC} from 'react';

import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  width: 200px;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledTextstatusMessage = styled.Text`
  font-size: 12px;
  color: white;
  margin-top: 8px;
  align-self: center;
  margin-bottom: 8px;
`;

type Props = {
  statusMessage: String | null;
};

const StatusMessageView: FC<Props> = (props: Props) => {
  const {statusMessage} = props;
  if (!statusMessage) return null;

  // const splits = statusMessage.split('\n');

  // if (splits.length < 3)
  //   <StyledTextstatusMessage numberOfLines={2} ellipsizeMode={'tail'}>
  //     {statusMessage}
  //   </StyledTextstatusMessage>;

  // const data: Datum[] = [
  //   {title: splits.slice(0, 2).join('\n'), bodies: splits.slice(2)},
  // ];

  return (
    <Container>
      <StyledTextstatusMessage
        // numberOfLines={2}
        // ellipsizeMode={'tail'}
        onTextLayout={(event) => console.log(event)}>
        {statusMessage}
      </StyledTextstatusMessage>

      {/* <Accordion
        data={data}
        shouldAnimate={true}
        collapseOnStart={true}
        // dropDownAnimValueList={-300}
        titleContainerStyle={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          height: 50,
          zIndex: 10,
          width: 200,
          alignSelf: 'center',
        }}
        bodyContainerStyle={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          height: 50,
          zIndex: 10,
          width: 200,
          // flexDirection: 'column-reverse',
          alignSelf: 'center',
        }}
        renderTitle={(item) => (
          <StyledTextstatusMessage
            // numberOfLines={2}
            // ellipsizeMode="tail"
            style={{position: 'absolute', left: 20, width: 150}}>
            {item}
          </StyledTextstatusMessage>
        )}
        renderBody={(item) => (
          <StyledTextstatusMessage style={{position: 'absolute', left: 20}}>
            {item}
          </StyledTextstatusMessage>
        )}
      /> */}
    </Container>
  );
};

export default StatusMessageView;
