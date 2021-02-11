import {
  AuthStackNavigationProps,
  AuthStackParamList,
} from '../navigations/AuthStackNavigator';
import {Button, LoadingIndicator, useTheme} from 'dooboo-ui';
import React, {ReactElement, useState} from 'react';
import type {
  UserVerifyEmailMutation,
  UserVerifyEmailMutationResponse,
} from '../../__generated__/UserVerifyEmailMutation.graphql';

import {Alert} from 'react-native';
import {RouteProp} from '@react-navigation/core';
import {getString} from '../../../STRINGS';
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

interface Props {
  navigation: AuthStackNavigationProps<'VerifyEmail'>;
  route: RouteProp<AuthStackParamList, 'VerifyEmail'>;
}

function Page(props: Props): ReactElement {
  const {theme} = useTheme();

  const {
    route: {
      params: {email},
    },
  } = props;

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
        return Alert.alert(getString('RESENT_VERIFICATION_EMAIL'));

      Alert.alert(
        getString('ERROR'),
        getString('RESENT_VERIFICATION_EMAIL_FAILED'),
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
        }}>
        {getString('VERIFICATION_EMAIL_SENT')}
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
        text={getString('RESEND_EMAIL')}
        loading={isInFlight}
      />
      {loading ? <LoadingIndicator /> : null}
    </Container>
  );
}

export default Page;
