import React, { useEffect, useState } from 'react';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import Button from '../shared/Button';
import StatusBar from '../shared/StatusBar';
import TextInput from '../shared/TextInput';
import { getString } from '../../../STRINGS';

const StyledContainer = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: column;
  align-items: center;
`;

const StyledScrollView = styled.ScrollView`
  align-self: stretch;
`;

const StyledWrapper = styled.View`
  margin-top: 40px;
  width: 78%;

  flex-direction: column;
  align-items: center;
`;

const StyledButtonWrapper = styled.View`
  margin-top: 24px;
  width: 100%;
  align-items: flex-end;
`;

interface Props extends ThemeProps<DefaultTheme> {
  navigation: any;
}

interface State {
  isRegistering: boolean;
  email: string;
  pw: string;
  displayName: string;
  statusMsg: string;
}

function Screen(props: Props, state: State) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const { theme } = props;

  useEffect(() => {
    if (isRegistering) {
      setIsRegistering(false);
    }
  }, [isRegistering]);

  const onRegister = () => {
    setIsRegistering(true);
  };

  const onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        setEmail(text);
        break;
      case 'PW':
        setPw(text);
        break;
      case 'NAME':
        setDisplayName(text);
        break;
      case 'STATUS_MSG':
        setStatusMsg(text);
        break;
    }
  };

  return (
    <StyledContainer>
      <StatusBar isDarkContent={true} />
      <StyledScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledWrapper>
          <TextInput
            testID='email_input'
            style={{ marginTop: 8 }}
            txtLabel={getString('EMAIL')}
            txtHint={getString('EMAIL')}
            txt={email}
            onTextChanged={(text) => onTextChanged('EMAIL', text)}
            placeholderTextColor={theme.colors.text}
          />
          <TextInput
            testID='pw_input'
            style={{ marginTop: 24 }}
            txtLabel={getString('PASSWORD')}
            txtHint={getString('PASSWORD')}
            txt={pw}
            onTextChanged={(text) => onTextChanged('PW', text)}
            placeholderTextColor={theme.colors.text}
            isPassword={true}
          />
          <TextInput
            testID='name_input'
            style={{ marginTop: 24 }}
            txtLabel={getString('NAME')}
            txtHint={getString('NAME')}
            txt={displayName}
            onTextChanged={(text) => onTextChanged('NAME', text)}
            placeholderTextColor={theme.colors.text}
          />
          <TextInput
            testID='status_input'
            style={{ marginTop: 24 }}
            txtLabel={getString('STATUS_MSG')}
            txtHint={getString('STATUS_MSG')}
            txt={statusMsg}
            onTextChanged={(text) => onTextChanged('STATUS_MSG', text)}
            placeholderTextColor={theme.colors.text}
          />
          <StyledButtonWrapper>
            <Button
              testID='register'
              isLoading={isRegistering}
              onPress={() => onRegister()}
            >
              {getString('REGISTER')}
            </Button>
          </StyledButtonWrapper>
        </StyledWrapper>
      </StyledScrollView>
    </StyledContainer>
  );
}

export default withTheme(Screen);
