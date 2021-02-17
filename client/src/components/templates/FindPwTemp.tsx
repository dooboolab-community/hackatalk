import {Button, EditText, useTheme} from 'dooboo-ui';
import React, {FC, ReactElement, useState} from 'react';
import type {
  UserFindPwMutation,
  UserFindPwMutationResponse,
} from '../../__generated__/UserFindPwMutation.graphql';
import {showAlertForError, validateEmail} from '../../utils/common';

import {Alert} from 'react-native';
import {AuthStackNavigationProps} from '../navigations/AuthStackNavigator';
import {PayloadError} from 'relay-runtime';
import {findPasswordMutation} from '../../relay/queries/User';
import {getString} from '../../../STRINGS';
import styled from 'styled-components/native';
import {useMutation} from 'react-relay/hooks';

const Container = styled.View`
  flex: 1;
  padding: 0 32px;
  background-color: ${({theme}) => theme.background};
`;

const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: 20px;
`;

interface Props {
  email: string;
  setEmail: (str: string) => void;
  onFindPassword: () => void;
  onChangePassword: (str: string) => void;
  isFindingPassword?: boolean;
  errorEmail?: string;
  setErrorEmail?: (str: string) => void;
}

const Page: FC<Props> = ({
  email,
  setEmail,
  errorEmail,
  setErrorEmail,
  onChangePassword,
  onFindPassword,
  isFindingPassword,
}) => {
  const {theme} = useTheme();

  return (
    <Container>
      <EditText
        testID="input-email"
        style={{marginVertical: 20}}
        styles={{
          container: {
            borderColor: theme.text,
          },
          input: {
            color: 'red',
          },
        }}
        focusColor={theme.focused}
        labelText={getString('EMAIL')}
        placeholderTextColor={theme.placeholder}
        placeholder="hello@example.com"
        value={email}
        onChangeText={onChangePassword}
        errorText={errorEmail}
        onSubmitEditing={onFindPassword}
      />
      <ButtonWrapper>
        <Button
          testID="btn-find-pw"
          loading={isFindingPassword}
          onPress={onFindPassword}
          styles={{
            container: {
              height: 52,
              backgroundColor: theme.btnPrimary,
              borderWidth: 1,
            },
            text: {
              color: theme.btnPrimaryFont,
            },
            hovered: {
              borderColor: theme.text,
            },
          }}
          text={getString('FIND_PW')}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default Page;
