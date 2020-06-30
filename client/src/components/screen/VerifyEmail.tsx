import { Alert, TouchableOpacity } from 'react-native';
import { AuthStackNavigationProps, AuthStackParamList } from '../navigation/AuthStackNavigator';
import { Button, LoadingIndicator } from 'dooboo-ui';
import React, { ReactElement, useState } from 'react';
import type { VerifyEmailMutation, VerifyEmailMutationResponse } from '../../__generated__/VerifyEmailMutation.graphql';
import { graphql, useMutation } from 'react-relay/hooks';

import { RouteProp } from '@react-navigation/core';
import { getString } from '../../../STRINGS';
import { showAlertForError } from '../../utils/common';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 24px;
`;

const StyledText = styled.Text`
  font-size: 18px;
  text-align: center;
  line-height: 28px;
`;

const StyledHighlightText = styled.Text`
  font-size: 24px;
  color: ${({ theme }): string => theme.primary};
`;

const StyledTextLine = styled(StyledText)`
  text-decoration-line: underline;
`;

interface Props {
  navigation: AuthStackNavigationProps<'VerifyEmail'>;
  route: RouteProp<AuthStackParamList, 'VerifyEmail'>;
}

const sendVerification = graphql`
  mutation VerifyEmailMutation($email: String!) {
    sendVerification(email: $email)
  }
`;

function Page(props: Props): ReactElement {
  const { theme } = useThemeContext();
  const { navigation, route: { params: { email } } } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [commitEmail, isInFlight] = useMutation<VerifyEmailMutation>(sendVerification);

  const mutationConfig = {
    variables: {
      email,
    },
    onCompleted: async (response: VerifyEmailMutationResponse): Promise<void> => {
      if (response.sendVerification) {
        return Alert.alert(getString('RESENT_VERIFICATION_EMAIL'));
      }
      Alert.alert(getString('ERROR'), getString('RESENT_VERIFICATION_EMAIL_FAILED'));
    },
    onError: (error: any): void => {
      showAlertForError(error?.graphQLErrors);
    },
  };

  const sendVerificationLink = async (): Promise<void> => {
    try {
      setLoading(true);
      commitEmail(mutationConfig);
    } catch (err) {
      Alert.alert(getString('ERROR'), getString('RESENT_VERIFICATION_EMAIL_FAILED'));
    } finally {
      setLoading(false);
    }
  };

  const pressNext = (): void => {
    navigation.goBack();
  };

  return (
    <Container>
      <StyledText style={{
        marginBottom: 24,
      }}>{getString('VERIFICATION_EMAIL_SENT')}</StyledText>
      <StyledHighlightText>{email}</StyledHighlightText>
      <TouchableOpacity
        testID="touch-email"
        onPress={sendVerificationLink}
        style={{
          marginTop: 24,
        }}
      >
        <StyledTextLine>{getString('RESEND_EMAIL')}</StyledTextLine>
      </TouchableOpacity>
      <Button
        testID="btn-next"
        onPress={pressNext}
        containerStyle={{
          width: '100%',
          paddingHorizontal: 20,
          marginTop: 80,
        }}
        style={{
          backgroundColor: theme.btnPrimary,
          borderWidth: 0,
          height: 48,
          width: '100%',
        }}
        textStyle={{
          color: theme.btnPrimaryFont,
          fontSize: 16,
        }}
        text={getString('RETURN_TO_SIGNIN')}
        isLoading={isInFlight}
      />
      {
        loading
          ? <LoadingIndicator/>
          : null
      }
    </Container>
  );
}

export default Page;
