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
`;

const StyledButtonWrapper = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-top: 16px;
`;

interface Props extends ThemeProps<DefaultTheme> {
  navigation: any;
}

interface State {
  email: string;
  isLoading: boolean;
}

function Screen(props: Props) {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  const onTextChanged = (type: string, text: string) => {
    switch (type) {
      case 'EMAIL':
        setEmail(text);
        break;
    }
  };

  const onSendLink = () => {
    setLoading(true);
  };

  const { theme } = props;

  return (
    <StyledContainer>
      <StatusBar isDarkContent={false} />
      <StyledScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledWrapper>
          <TextInput
            testID='input_email'
            style={{ marginTop: 8 * theme.ratio }}
            txtLabel={getString('EMAIL')}
            txtHint={getString('EMAIL')}
            txt={email}
            onTextChanged={(text) => onTextChanged('EMAIL', text)}
            placeholderTextColor={theme.colors.text}
          />
          <StyledButtonWrapper>
            <Button
              testID='btnSendLink'
              isLoading={isLoading}
              onPress={() => onSendLink()}
            >
              {getString('SEND_LINK')}
            </Button>
          </StyledButtonWrapper>
        </StyledWrapper>
      </StyledScrollView>
    </StyledContainer>
  );
}

export default withTheme(Screen);
