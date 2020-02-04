import { Alert, TouchableOpacity } from 'react-native';
import React, { ReactElement } from 'react';

import { Button } from '@dooboo-ui/native';
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

function Page(): ReactElement {
  const { theme } = useThemeContext();

  const sendVerificationLink = (): void => {
    Alert.alert(getString('RESENT_VERIFICATION_EMAIL'));
  };

  const pressNext = (): void => {
    Alert.alert('next');
  };

  return (
    <Container>
      <StyledText style={{
        marginBottom: 24,
      }}>{getString('VERIFICATION_EMAIL_SENT')}</StyledText>
      <StyledHighlightText>dooboolab@gmail.com</StyledHighlightText>
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
        text={getString('NEXT')}
      />
    </Container>
  );
}

export default Page;
