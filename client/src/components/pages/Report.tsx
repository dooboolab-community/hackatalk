import {Alert, Platform, SafeAreaView} from 'react-native';
import {Button, EditText, useTheme} from 'dooboo-ui';
import {
  MainStackNavigationProps,
  MainStackParamList,
} from '../navigations/MainStackNavigator';
import React, {FC, useState} from 'react';
import type {
  ReportCreateReportMutation,
  ReportCreateReportMutationResponse,
} from '../../__generated__/ReportCreateReportMutation.graphql';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import styled, {css} from '@emotion/native';

import {Report} from '../../types/graphql';
import {createReport} from '../../relay/queries/Report';
import {getString} from '../../../STRINGS';
import {showAlertForError} from '../../utils/common';
import {useMutation} from 'react-relay';

const InnerContainer = styled.View`
  padding: 0 24px;
  width: 100%;
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  /* align-self: stretch; */

  flex-direction: column;
`;

const ReportScreen: FC = () => {
  const navigation = useNavigation<MainStackNavigationProps<'Report'>>();

  const {
    params: {name, userId},
  } = useRoute<RouteProp<MainStackParamList, 'Report'>>();

  const {theme} = useTheme();
  const [message, setMessage] = useState('');

  const [commitReport, isInFlight] =
    useMutation<ReportCreateReportMutation>(createReport);

  const handleReport = (): void => {
    const mutationConfig = {
      variables: {
        reportedUserId: userId,
        report: message,
      },
      onError: (error: Error): void => {
        showAlertForError(error);
      },
      onCompleted: (response: ReportCreateReportMutationResponse) => {
        const {report} = response.createReport as Report;

        setMessage('');

        if (report) {
          Alert.alert(getString('SUCCESS'), getString('REPORT_SENT'));
          navigation.goBack();
        }
      },
    };

    commitReport(mutationConfig);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingBottom: 20,
      }}
    >
      <StyledKeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          default: undefined,
        })}
      >
        <InnerContainer>
          <EditText
            key="report-input"
            testID="input-status"
            style={{
              marginTop: 40,
              minHeight: 80,
            }}
            styles={{
              container: {
                borderColor: theme.text,
              },
            }}
            textInputProps={{
              multiline: true,
            }}
            focusColor={theme.text}
            secureTextEntry
            onChangeText={(txt: string): void => setMessage(txt)}
            labelText={name}
            value={message}
            placeholder={getString('REPORT_DESCRIPTION')}
          />
        </InnerContainer>
        <Button
          onPress={handleReport}
          loading={isInFlight}
          styles={{
            container: [
              css`
                height: 44px;
                border-width: 1px;
                border-radius: 0px;
                margin-left: 24px;
                margin-right: 24px;
              `,
              {
                backgroundColor: theme.button,
                borderColor: theme.button,
              },
            ],
            text: {
              color: theme.textContrast,
              fontSize: 14,
              fontWeight: 'bold',
            },
          }}
          text={getString('REPORT')}
        />
      </StyledKeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReportScreen;
