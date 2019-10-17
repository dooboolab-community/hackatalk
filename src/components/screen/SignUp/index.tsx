import * as Yup from 'yup';

import { Formik, FormikActions, FormikProps } from 'formik';
import {
  FormikInput,
  Props,
  SignUpFormValues,
  StyledButtonWrapper,
  StyledForm,
  StyledSafeAreaView,
  StyledScrollView,
} from './styles';
import React, { ReactElement, memo } from 'react';

import { Alert } from 'react-native';
import Button from '../../shared/Button';
import { getString } from '../../../../STRINGS';
import { withTheme } from 'styled-components/native';

const signUpValidationSchema = Yup.object({
  email: Yup.string().email(),
  password1: Yup.string()
    .min(6, 'password must be at least 6 characters.')
    .required('password is required'),
  password2: Yup.string()
    .min(6, 'password must be at least 6 characters.')
    .oneOf([Yup.ref('password1'), null], 'passwords must match'),
});

const onSignUpSubmit = (
  {
    email,
    password1,
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
      password: ${password1}
      successfully!
    `
  );
  setSubmitting(false);
  resetForm();
};

const getPlaceholder = (key: string): string => {
  const newKey = key.toUpperCase();
  if (key.startsWith('password')) {
    return `${getString(
      newKey.substring(
        0,
        newKey.length - 1
      )
    )}${newKey.substring(
      newKey.length - 1,
      newKey.length
    )}`;
  }
  return getString(newKey);
};

function SignUpPage({
  theme,
  screenProps: {
    changeTheme,
  },
}: Props): ReactElement {
  return (
    <StyledSafeAreaView>
      <StyledScrollView>
        <Formik
          initialValues={{
            email: '',
            password1: '',
            password2: '',
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={(values, actions): void => onSignUpSubmit(values, actions)}
        >
          {({ values, handleSubmit }: FormikProps<SignUpFormValues>): ReactElement => (
            <StyledForm testID="formTest">
              {Object.keys(values).map((key: string) => (
                <FormikInput
                  key={key}
                  label={key}
                  name={key}
                  type={key.startsWith('password') ? 'password' : 'email'}
                  placeholder={getPlaceholder(key)}
                  placeholderTextColor={theme.placeholder}
                />
              ))}
              <StyledButtonWrapper>
                <Button
                  testID="btnSignUpConfirm"
                  containerStyle={{ flex: 1 }}
                  onPress={handleSubmit}
                  isWhite
                >
                  {getString('REGISTER')}
                </Button>
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
