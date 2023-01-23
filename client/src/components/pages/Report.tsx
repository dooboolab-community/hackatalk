import {Alert, Platform, SafeAreaView} from 'react-native';
import {Button, EditText, useTheme} from 'dooboo-ui';
import type {
  MainStackNavigationProps,
  MainStackParamList,
} from '../navigations/MainStackNavigator';
import React, {useState} from 'react';
import type {
  ReportCreateReportMutation,
  ReportCreateReportMutation$data,
} from '../../__generated__/ReportCreateReportMutation.graphql';
import styled, {css} from '@emotion/native';
import {useNavigation, useRoute} from '@react-navigation/core';

import type {FC} from 'react';
import type {Report} from '../../types/graphql';
import type {RouteProp} from '@react-navigation/core';
import {createReport} from '../../relay/queries/Report';
import {getString} from '../../../STRINGS';
import {normalizeErrorString} from '../../relay/util';
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
      onError: (error: Error) => {
        showAlertForError(normalizeErrorString(error));
      },
      onCompleted: (response: ReportCreateReportMutation$data) => {
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
        backgroundColor: theme.bg.basic,
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
                borderColor: theme.text.basic,
              },
            }}
            multiline
            colors={{focused: theme.text.basic}}
            secureTextEntry
            onChangeText={(txt: string): void => setMessage(txt)}
            label={name}
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
                backgroundColor: theme.button.primary.bg,
                borderColor: theme.button.primary.bg,
              },
            ],
            text: {
              color: theme.text.contrast,
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
