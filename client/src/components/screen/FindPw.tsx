import { Button, EditText } from 'dooboo-ui';
import type {
  FindPwMutation,
  FindPwMutationResponse,
} from '../../__generated__/FindPwMutation.graphql';
import React, { ReactElement, useState } from 'react';
import { graphql, useMutation } from 'react-relay/hooks';
import { showAlertForError, validateEmail } from '../../utils/common';

import { Alert } from 'react-native';
import { AuthStackNavigationProps } from '../navigation/AuthStackNavigator';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }): string => theme.background};
`;

const Wrapper = styled.View`
  margin: 44px;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
`;

interface Props {
  navigation: AuthStackNavigationProps<'FindPw'>;
}

const findPasswordMutation = graphql`
  mutation FindPwMutation($email: String!) {
    findPassword(email: $email)
  }
`;

function Page({ navigation }: Props): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');

  const [commitFindPassword, isInFlight] = useMutation<FindPwMutation>(
    findPasswordMutation,
  );

  const { theme } = useThemeContext();

  const onFindPw = async (): Promise<void> => {
    if (!validateEmail(email)) {
      setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));

      return;
    }

    const mutationConfig = {
      variables: { email },
      onError: (error: Error): void => {
        showAlertForError(error);
      },
      onCompleted: (response: FindPwMutationResponse) => {
        const result = response.findPassword;

        if (result) {
          Alert.alert(
            getString('SUCCESS'),
            getString('PASSWORD_RESET_EMAIL_SENT'),
          );

          navigation.goBack();
        }
      },
    };

    commitFindPassword(mutationConfig);
  };

  return (
    <Container>
      <Wrapper>
        <EditText
          testID="input-email"
          errorTestID="error-email"
          textStyle={{
            color: theme.fontColor,
          }}
          borderColor={theme.font}
          focusColor={theme.focused}
          placeholderTextColor={theme.placeholder}
          label={getString('EMAIL')}
          placeholder="hello@example.com"
          value={email}
          onChangeText={(text: string): void => {
            setEmail(text);
            setErrorEmail('');
          }}
          style={{ marginTop: 20 }}
          errorText={errorEmail}
          onSubmitEditing={onFindPw}
        />
        <ButtonWrapper>
          <Button
            testID="btn-find-pw"
            loading={isInFlight}
            onPress={onFindPw}
            style={{
              root: {
                height: 52,
                backgroundColor: theme.btnPrimary,
              },
              text: {
                color: theme.btnPrimaryFont,
              },
            }}
            text={getString('FIND_PW')}
          />
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

export default Page;
