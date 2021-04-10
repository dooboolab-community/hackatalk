import {Button, LoadingIndicator, useTheme} from 'dooboo-ui';
import React, {FC, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/core';
import type {
  UserVerifyEmailMutation,
  UserVerifyEmailMutationResponse,
} from '../../__generated__/UserVerifyEmailMutation.graphql';

import {Alert} from 'react-native';
import {AuthStackParamList} from '../navigations/AuthStackNavigator';
import {fbt} from 'fbt';
import {sendVerification} from '../../relay/queries/User';
import {showAlertForError} from '../../utils/common';
import styled from 'styled-components/native';
import {useMutation} from 'react-relay/hooks';

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

  const [commitEmail, isInFlight] = useMutation<UserVerifyEmailMutation>(
    sendVerification,
  );

  const mutationConfig = {
    variables: {
      email,
    },
    onCompleted: (response: UserVerifyEmailMutationResponse) => {
      if (response.sendVerification)
        return Alert.alert(
          fbt(
            'Email verification link has been resent',
            'email verification resent',
          ).toString(),
        );

      Alert.alert(
        fbt('Error', 'error').toString(),
        fbt(
          'Email has not sent. Please check the email address once more.',
          'failed sending email verification',
        ).toString(),
      );
    },
    onError: (error: any): void => {
      showAlertForError(error);
    },
  };

  const sendVerificationLink = async (): Promise<void> => {
    try {
      setLoading(true);
      commitEmail(mutationConfig);
    } catch (err) {
      Alert.alert(
        fbt('Error', 'error').toString(),
        fbt(
          'Email has not sent. Please check the email address once more.',
          'failed sending email verification',
        ),
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
        }}>
        <fbt desc="varification email sent">
          Verification link has been sent. Please check your email. If you have
          not received an email please check out your spam inbox.
        </fbt>
      </StyledText>
      <StyledHighlightText>{email}</StyledHighlightText>
      <Button
        testID="btn-next"
        onPress={sendVerificationLink}
        style={{marginTop: 80}}
        styles={{
          container: {
            width: '100%',
            paddingHorizontal: 20,
            backgroundColor: theme.btnPrimary,
            borderWidth: 0,
            height: 48,
          },
          text: {
            color: theme.btnPrimaryFont,
            fontSize: 16,
          },
        }}
        text={fbt('Resent Email', 'resent email').toString()}
        loading={isInFlight}
      />
      {loading ? <LoadingIndicator /> : null}
    </Container>
  );
};

export default Page;
