import * as Yup from 'yup';

import {
  ButtonToRight,
  ErrorText,
  InnerContainer,
  SignUpFormValues,
  StyledButtonWrapper,
  StyledSafeAreaView,
  StyledScrollView,
  StyledTextInput,
} from './styles';
import React, { ReactElement, memo, useCallback, useMemo } from 'react';

import { Alert } from 'react-native';
import Button from '../../shared/Button';
import { getString } from '../../../../STRINGS';
import useForm from 'react-hook-form';

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

const getLabelName = (key: string): string => {
  if (key === 'confirmPassword') {
    return getString('CONFIRM_PASSWORD');
  }
  return getString(key.toUpperCase());
};

export const initialValues: SignUpFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  status: '',
};

function SignUpPage(): ReactElement {
  const {
    register,
    errors,
    setValue,
    handleSubmit,
    formState: { touched },
    watch,
    reset,
  } = useForm<SignUpFormValues>({
    validationSchema: signUpValidationSchema,
  });
  const onTextChanged = useCallback(
    (label: string, text: string): void | Promise<boolean> => {
      setValue(
        label as 'email' | 'password' | 'confirmPassword' | 'name' | 'status',
        text,
        true,
      );
    },
    [setValue],
  );
  const onSignUpSubmit = useCallback(
    ({ email, password, name, status }): void => {
      Alert.alert(
        'Signed Up',
        `You've signed up with 
        email: ${email},
        password: ${password},
        name: ${name},
        status: ${status}
        successfully!
      `,
      );
      reset(initialValues);
    },
    [],
  );
  const values: SignUpFormValues = useMemo(() => watch(), [watch]);

  return (
    <StyledSafeAreaView>
      <StyledScrollView>
        {Object.keys(initialValues).map((key: string) => {
          const label = key as keyof SignUpFormValues;
          const error = errors[label];
          const errorMessage = error && error.message;
          return (
            <InnerContainer key={label}>
              <StyledTextInput
                ref={register({ name: label })}
                testID={`${label}_input`}
                txt={values[label]}
                txtLabel={getLabelName(label)}
                txtHint={getLabelName(label)}
                isPassword={label.toLowerCase().endsWith('password')}
                onTextChanged={(text: string): void | Promise<boolean> =>
                  onTextChanged(label, text)
                }
                error={errorMessage}
              />
              {!!error && (
                <ErrorText isError={!!error}>{errorMessage}</ErrorText>
              )}
            </InnerContainer>
          );
        })}
        <StyledButtonWrapper>
          <ButtonToRight>
            <Button
              testID="btnSignUpConfirm"
              isDisabled={
                !(touched && touched.length) || !!Object.keys(errors).length
              }
              onPress={handleSubmit(onSignUpSubmit)}
            >
              {getString('REGISTER')}
            </Button>
          </ButtonToRight>
        </StyledButtonWrapper>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
}

export default memo(SignUpPage);
