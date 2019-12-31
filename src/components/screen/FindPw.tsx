import React, { ReactElement, useState } from 'react';

import { AuthStackNavigationProps } from '../navigation/AuthStackNavigator';
import Button from '../shared/Button';
import { EditText } from '@dooboo-ui/native';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';
import { validateEmail } from '../../utils/common';

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

function Page(props: Props): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [findingPw, setFindingPw] = useState<boolean>(false);
  let timer: number;

  const { theme } = useThemeContext();

  const onFindPw = (): void => {
    if (!validateEmail(email)) {
      setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
      return;
    }

    setFindingPw(true);
    timer = setTimeout(() => {
      setFindingPw(false);
      clearTimeout(timer);
      if (props.navigation) {
        props.navigation.navigate('SignIn');
      }
    }, 1000);
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
          label={getString('EMAIL')}
          placeholder="hello@example.com"
          placeholderTextColor={theme.placeholder}
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
            containerStyle={{ padding: 5 }}
          >
            {getString('FIND_PW')}
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

export default Page;
