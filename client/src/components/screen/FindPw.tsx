import { Button, EditText } from 'dooboo-ui';
import React, { ReactElement, useState } from 'react';
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

function Page({ navigation }: Props): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [findingPw, setFindingPw] = useState<boolean>(false);

  const { theme } = useThemeContext();
  // const [findPassword] = useMutation<{ findPassword: boolean }, MutationFindPasswordInput>(MUTATION_FIND_PASSWORD);

  const navigateToSignIn = (): void => navigation.navigate('SignIn');

  const onFindPw = async (): Promise<void> => {
    if (!validateEmail(email)) {
      setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
      return;
    }

    try {
      setFindingPw(true);
      // const result = await findPassword({ variables: { email } });
      // if (result.data?.findPassword) {
      //   Alert.alert('', getString('PASSWORD_RESET_EMAIL_SENT'), [
      //     {
      //       text: getString('OK'),
      //       onPress: navigateToSignIn,
      //     },
      //   ]);
      // }
    } catch ({ graphQLErrors }) {
      showAlertForError(graphQLErrors);
    } finally {
      setFindingPw(false);
    }
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
            isLoading={findingPw}
            onPress={onFindPw}
            containerStyle={{ height: 52, backgroundColor: theme.btnPrimary }}
            textStyle={{ color: theme.btnPrimaryFont }}
            text={getString('FIND_PW')}
          />
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

export default Page;
