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

import {Report} from '../../types/graphql';
import {createReport} from '../../relay/queries/Report';
import {getString} from '../../../STRINGS';
import {showAlertForError} from '../../utils/common';
import styled from '@emotion/native';
import {useMutation} from 'react-relay';

const InnerContainer = styled.View`
  padding: 0 24px;
  flex: 1;
  width: 100%;
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-self: stretch;
  flex-direction: column;
  align-items: center;
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
      }}>
      <StyledKeyboardAvoidingView
        behavior={Platform.select({
          ios: 'padding',
          default: undefined,
        })}>
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
            focusColor={theme.focused}
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
            container: {
              width: '100%',
              paddingHorizontal: 20,
              backgroundColor: theme.btnPrimary,
              borderWidth: 0,
              height: 48,
            },
            text: {
              color: theme.btnPrimaryFont,
              fontSize: 16,
            },
          }}
          text={getString('REPORT')}
        />
      </StyledKeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReportScreen;
