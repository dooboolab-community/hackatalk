import { Alert, TouchableOpacity } from 'react-native';
import { AuthStackNavigationProps, AuthStackParamList } from '../navigation/AuthStackNavigator';
import { Button, LoadingIndicator } from '@dooboo-ui/native';
import React, { ReactElement, useState } from 'react';

import { RouteProp } from '@react-navigation/core';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

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

function Page(props: Props): ReactElement {
  const { theme } = useThemeContext();
  const { navigation, route: { params: { email } } } = props;
  const [loading, setLoading] = useState<boolean>(false);
  // const [sendVerification] =
  //   useMutation<{ sendVerification: boolean }, MutationSendVerificationInput>(MUTATION_SEND_VERIFICATION);

  // const sendVerificationLink = async (): Promise<void> => {
  //   try {
  //     setLoading(true);
  //     const { data: emailVerificationData } = await sendVerification({
  //       variables: {
  //         email,
  //       },
  //     });

  //     if (emailVerificationData?.sendVerification) {
  //       return Alert.alert(getString('RESENT_VERIFICATION_EMAIL'));
  //     }
  //     Alert.alert(getString('ERROR'), getString('RESENT_VERIFICATION_EMAIL_FAILED'));
  //   } catch (err) {
  //     Alert.alert(getString('ERROR'), getString('RESENT_VERIFICATION_EMAIL_FAILED'));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        // onPress={sendVerificationLink}
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
