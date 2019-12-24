import React, { ReactElement, useState } from 'react';

import { Alert } from 'react-native';
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

const StyledWrapper = styled.View`
  margin: 44px;
`;

const StyledButtonWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
`;

interface Props {
  navigation: DefaultNavigationProps<'FindPW'>;
}

function Page(props: Props): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [isFindPW, setIsFindPW] = useState<boolean>(false);
  let timer: number;

  const { theme } = useThemeContext();

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const onFindPW = (): void => {
    if (email === '') {
      setErrorEmail(getString('EMAIL_REQUIRED'));
      return;
    }
    setIsFindPW(true);
    timer = setTimeout(() => {
      setIsFindPW(false);
      clearTimeout(timer);
      if (props.navigation) {
        props.navigation.navigate('Login');
      }
    }, 1000);
  };

  return (
    <StyledSafeAreaView>
      <StyledWrapper>
        <EditText
          testID="EMAIL_INPUT"
          textStyle={{
            color: theme.fontColor,
          }}
          label={getString('EMAIL')}
          placeholder="hello@example.com"
          placeholderTextColor="#ADB5BD"
          text={email}
          onChangeText={(text: string): void => {
            if (!validateEmail(text)) {
              setErrorEmail(getString('EMAIL_FORMAT_NOT_VALID'));
              return;
            }
            setErrorEmail('');
            setEmail(text);
          }}
          style={{ marginTop: 20 }}
          errorText={errorEmail}
          onSubmitEditing={onFindPW}
        />
        <StyledButtonWrapper>
          <Button
            testID="btnFindPW"
            isLoading={isFindPW}
            onPress={onFindPW}
            containerStyle={{ padding: 5 }}
          >
            {getString('FIND_PW')}
          </Button>
        </StyledButtonWrapper>
      </StyledWrapper>
    </StyledSafeAreaView>
  );
}

export default Page;
