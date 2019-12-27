import React, { ReactElement, useState } from 'react';

import Button from '../shared/Button';
import { DefaultNavigationProps } from '../../types';
import { EditText } from '@dooboo-ui/native';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/native-theme';

const StyledSafeAreaView = styled.View`
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
  navigation: DefaultNavigationProps<'FindPw'>;
}

function Page(props: Props): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [isFindPw, setIsFindPw] = useState<boolean>(false);
  let timer: number;

  const { theme } = useThemeContext();

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const onFindPw = (): void => {
    if (email === '') {
      setErrorEmail(getString('EMAIL_REQUIRED'));
      return;
    }
    setIsFindPw(true);
    timer = setTimeout(() => {
      setIsFindPw(false);
      clearTimeout(timer);
      if (props.navigation) {
        props.navigation.navigate('SignUp');
      }
    }, 1000);
  };

  return (
    <StyledSafeAreaView>
      <Wrapper>
        <EditText
          testID="EMAIL_INPUT"
          textStyle={{
            color: theme.fontColor,
          }}
          label={getString('EMAIL')}
          placeholder="hello@example.com"
          placeholderTextColor="#ADB5BD"
          value={email}
          onChangeText={(text: string): void => {
            setEmail(text);

            if (!validateEmail(text)) {
              setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
              return;
            }
            setErrorEmail('');
          }}
          style={{ marginTop: 20 }}
          errorText={errorEmail}
          onSubmitEditing={onFindPw}
        />
        <ButtonWrapper>
          <Button
            testID="btnFindPw"
            isLoading={isFindPw}
            onPress={onFindPw}
            containerStyle={{ padding: 5 }}
          >
            {getString('FIND_PW')}
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </StyledSafeAreaView>
  );
}

export default Page;
