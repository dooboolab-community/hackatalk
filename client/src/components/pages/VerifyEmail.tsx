import {Button, useTheme} from 'dooboo-ui';
import React, {FC, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/core';
import type {
  UserVerifyEmailMutation,
  UserVerifyEmailMutation$data,
} from '../../__generated__/UserVerifyEmailMutation.graphql';

import {Alert} from 'react-native';
import {AuthStackParamList} from '../navigations/AuthStackNavigator';
import CustomLoadingIndicator from '../uis/CustomLoadingIndicator';
import {getString} from '../../../STRINGS';
import {normalizeErrorString} from '../../relay/util';
import {sendVerification} from '../../relay/queries/User';
import {showAlertForError} from '../../utils/common';
import styled from '@emotion/native';
import {useMutation} from 'react-relay';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 24px;
`;

const StyledText = styled.Text`
  color: ${({theme}) => theme.text};
  font-size: 18px;
  text-align: center;
  line-height: 28px;
`;

const StyledHighlightText = styled.Text`
  font-size: 24px;
  color: ${({theme}) => theme.primary};
`;

const Page: FC = () => {
  const {
    params: {email},
  } = useRoute<RouteProp<AuthStackParamList, 'VerifyEmail'>>();

  const {theme} = useTheme();

  const [loading, setLoading] = useState<boolean>(false);

  const [commitEmail, isInFlight] =
    useMutation<UserVerifyEmailMutation>(sendVerification);

  const mutationConfig = {
    variables: {
      email,
    },
    onCompleted: (response: UserVerifyEmailMutation$data) => {
      if (response.sendVerification) {
        return Alert.alert(getString('RESENT_VERIFICATION_EMAIL'));
      }

      Alert.alert(
        getString('ERROR'),
        getString('RESENT_VERIFICATION_EMAIL_FAILED'),
      );
    },
    onError: (error: any) => {
      showAlertForError(normalizeErrorString(error));
    },
  };

  const sendVerificationLink = async (): Promise<void> => {
    try {
      setLoading(true);
      commitEmail(mutationConfig);
    } catch (err: any) {
      Alert.alert(
        getString('ERROR'),
        getString('RESENT_VERIFICATION_EMAIL_FAILED'),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <StyledText
        style={{
          marginBottom: 24,
        }}
      >
        {getString('VERIFICATION_EMAIL_SENT')}
      </StyledText>
      <StyledHighlightText>{email}</StyledHighlightText>
      <Button
        testID="btn-next"
        onPress={sendVerificationLink}
        style={{marginTop: 80}}
        styles={{
          container: {
            backgroundColor: theme.primary,
            borderWidth: 0,
            height: 48,

            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            marginHorizontal: 40,
            color: theme.textContrast,
            fontSize: 16,
            textAlign: 'center',
          },
        }}
        text={getString('RESEND_EMAIL')}
        loading={isInFlight}
      />
      {loading ? <CustomLoadingIndicator /> : null}
    </Container>
  );
};

export default Page;
