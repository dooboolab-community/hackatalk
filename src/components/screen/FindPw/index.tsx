import * as yup from 'yup';

import { Container, ErrorText, InnerContainer, StyledButtonWrapper, StyledScrollView } from './styles';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import React, { ReactElement, memo, useCallback } from 'react';

import { Alert } from 'react-native';
import Button from '../../shared/Button';
import TextInput from '../../shared/TextInput';
import { getString } from '../../../../STRINGS';
import useForm from 'react-hook-form';

interface Props {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email(getString('EMAIL_FORMAT_NOT_VALID'))
    .required(getString('EMAIL_REQUIRED')),
});

function FindPw(): ReactElement {
  const {
    register,
    errors,
    setValue,
    handleSubmit,
    formState: { touched },
    watch,
    reset,
  } = useForm({
    validationSchema: schema,
  });
  const onSubmit = useCallback(({ email }) => {
    Alert.alert(
      'Find Password',
      `password reset link has been sent to your email: ${email}.`,
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
          <TextInput
            testID="findPw_email_input"
            style={{ marginTop: 8 }}
            txtLabel={getString('EMAIL')}
            txtHint={getString('EMAIL')}
            txt={watch('email', '')}
            ref={register({ name: 'email' })}
            onTextChanged={onTextChanged}
            error={errorMessage}
          />
          {!!errors.email && (
            <ErrorText isError={!!errors.email}>
              {errors.email.message}
            </ErrorText>
          )}
          <StyledButtonWrapper>
            <Button
              testID="btnFindPwConfirm"
              isDisabled={!(touched && touched.length) || !!errorMessage}
              onPress={handleSubmit(onSubmit)}
              width="100%"
              containerStyle={{ flexDirection: 'row' }}
            >
              {getString('PASSWORD_RESET')}
            </Button>
          </StyledButtonWrapper>
        </InnerContainer>
      </StyledScrollView>
    </Container>
  );
}

export default memo(FindPw);
