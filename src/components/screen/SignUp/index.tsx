import * as Yup from 'yup';

import {
  ButtonToRight,
  FormikInput,
  Props,
  SignUpFormValues,
  StyledButtonWrapper,
  StyledForm,
  StyledSafeAreaView,
  StyledScrollView,
} from './styles';
import { Formik, FormikActions, FormikProps } from 'formik';
import React, { ReactElement, memo } from 'react';

import { Alert } from 'react-native';
import Button from '../../shared/Button';
import { getString } from '../../../../STRINGS';
import { useThemeContext } from '../../../providers/ThemeProvider';
import { withTheme } from 'styled-components/native';

const signUpValidationSchema = Yup.object({
  email: Yup.string()
    .email(getString('EMAIL_FORMAT_NOT_VALID'))
    .required(getString('EMAIL_REQUIRED')),
  password: Yup.string()
    .min(6, getString('PASSWORD_MIN'))
    .required(getString('PASSWORD_REQUIRED')),
  confirmPassword: Yup.string()
    .min(6, getString('PASSWORD_MIN'))
    .oneOf([Yup.ref('password'), null], getString('PASSWORD_MUST_MATCH'))
    .required(getString('PASSWORD_REQUIRED')),
  name: Yup.string()
    .min(3, getString('NAME_MIN'))
    .required(getString('NAME_REQUIRED')),
  status: Yup.string(),
});

const onSignUpSubmit = (
  {
    email,
    password,
    name,
    status,
  }: SignUpFormValues,
  {
    resetForm,
    setSubmitting,
  }: FormikActions<SignUpFormValues>,
): void => {
  Alert.alert(
    'Signed Up',
    `You've signed up with 
      email: ${email},
      password: ${password},
      name: ${name},
      status: ${status}
      successfully!
    `
  );
  setSubmitting(false);
  resetForm();
};

const getLabelName = (key: string): string => {
  if (key === 'confirmPassword') {
    return getString('CONFIRM_PASSWORD');
  }
  return getString(key.toUpperCase());
};

const getInputType = (key: string): string => {
  if (key.endsWith('password')) {
    return 'password';
  } else if (key === 'email') {
    return 'email';
  }
  return 'text';
};

function SignUpPage(props: Props): ReactElement {
  const { theme } = useThemeContext();
  return (
    <StyledSafeAreaView>
      <StyledScrollView>
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            status: '',
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={(values, actions): void => onSignUpSubmit(values, actions)}
        >
          {({ isValid, values, handleSubmit }: FormikProps<SignUpFormValues>): ReactElement => (
            <StyledForm testID="formTest">
              {Object.keys(values).map((key: string) => (
                <FormikInput
                  key={key}
                  label={key}
                  name={key}
                  type={getInputType(key)}
                  placeholder={getLabelName(key)}
                  placeholderTextColor={theme.placeholder}
                />
              ))}
              <StyledButtonWrapper>
                <ButtonToRight>
                  <Button
                    testID="btnSignUpConfirm"
                    isDisabled={!isValid}
                    onPress={handleSubmit}
                  >
                    {getString('REGISTER')}
                  </Button>
                </ButtonToRight>
              </StyledButtonWrapper>
            </StyledForm>
          )}
        </Formik>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};
SignUpPage.displayName = 'SignUp';

export default memo(withTheme(SignUpPage));
