import * as yup from 'yup';

import {
  Container,
  ErrorText,
  InnerContainer,
  StyledButtonWrapper,
  StyledScrollView,
  StyledTextInput,
} from './styles';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import React, { ReactElement, memo, useCallback } from 'react';

import { Alert } from 'react-native';
import Button from '../../shared/Button';
import { getString } from '../../../../STRINGS';
import useForm from 'react-hook-form';

interface Props {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

const schema = yup.object().shape({
  email: yup.string()
    .email(getString('EMAIL_FORMAT_NOT_VALID'))
    .required(getString('EMAIL_REQUIRED')),
});

function FindPW(): ReactElement {
  const {
    register,
    errors,
    setValue,
    handleSubmit,
    formState: {
      touched,
    },
    getValues,
    reset,
  } = useForm({
    validationSchema: schema,
  });
  const onSubmit = useCallback(({ email }) => {
    Alert.alert(
      'Find Password',
      `password reset link has been sent to your email: ${email}.`
    );
    reset({ email: '' });
  }, []);
  const onTextChanged = useCallback((text: string): void | Promise<boolean> => {
    setValue('email', text, true);
  }, []);
  const errorMessage = errors.email && errors.email.message;

  return (
    <Container>
      <StyledScrollView>
        <InnerContainer>
          <StyledTextInput
            testID="findPw_email_input"
            style={{ marginTop: 8 }}
            txtLabel={getString('EMAIL')}
            txtHint={getString('EMAIL')}
            txt={getValues().email}
            ref={register({ name: 'email' })}
            onTextChanged={onTextChanged}
            error={errorMessage}
          />
          {!!errors.email && <ErrorText isError={!!errors.email}>{errors.email.message}</ErrorText>}
          <StyledButtonWrapper>
            <Button
              testID="btnFindPwConfirm"
              isDisabled={(!(touched && touched.length) || !!errorMessage)}
              width="100%"
              containerStyle={{ flexDirection: 'column' }}
              onPress={handleSubmit(onSubmit)}
            >
              {getString('PASSWORD_RESET')}
            </Button>
          </StyledButtonWrapper>
        </InnerContainer>
      </StyledScrollView>
    </Container>
  );
}

export default memo(FindPW);
