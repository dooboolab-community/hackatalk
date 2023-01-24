import {Button, Typography} from 'dooboo-ui';
import {DevSettings, View} from 'react-native';
import React, {useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import type {ReactElement} from 'react';
import {getString} from '../../STRINGS';
import styled from '@emotion/native';

const Container = styled.SafeAreaView`
  margin: 0 24px;

  flex: 1;
  justify-content: center;
`;

export const handleError = (error: any, stack?: string): void => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.error(stack, error);
  }
};

interface Props {
  error: Error;
  resetError: Function;
}

export default function FallbackComponent({resetError}: Props): ReactElement {
  useEffect(() => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('push_token');

    resetError();
  }, [resetError]);

  return (
    <Container>
      <>
        <Typography.Heading1>{getString('ERROR_OCCURED')}</Typography.Heading1>
      </>
      <View style={{height: 32}} />
      <Button
        size="large"
        onPress={() => resetError()}
        text={getString('TRY_AGAIN')}
      />
      <View style={{height: 12}} />
      {__DEV__ ? (
        <Button
          style={{marginBottom: 32}}
          size="large"
          onPress={() => DevSettings.reload()}
          text={getString('RELOAD')}
        />
      ) : null}
    </Container>
  );
}
