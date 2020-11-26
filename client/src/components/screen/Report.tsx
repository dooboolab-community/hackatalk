import { Alert, Platform, SafeAreaView } from 'react-native';
import { Button, EditText } from 'dooboo-ui';
import {
  MainStackNavigationProps,
  MainStackParamList,
} from '../navigation/MainStackNavigator';
import React, {
  ReactElement,
  useState,
} from 'react';
import type {
  ReportCreateReportMutation,
  ReportCreateReportMutationResponse,
} from '../../__generated__/ReportCreateReportMutation.graphql';
import {
  graphql,
  useMutation,
} from 'react-relay/hooks';

import { Report } from '../../types/graphql';
import { RouteProp } from '@react-navigation/core';
import { getString } from '../../../STRINGS';
import { showAlertForError } from '../../utils/common';
import styled from 'styled-components/native';
import { useThemeContext } from '@dooboo-ui/theme';

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

const createReport = graphql`
  mutation ReportCreateReportMutation($reportedUserId: String! $report: String!) {
    createReport(
      reportedUserId: $reportedUserId
      report: $report
    ) {
      report
    }
  }
`;

export interface Props {
  navigation: MainStackNavigationProps<'Report'>;
  route: RouteProp<MainStackParamList, 'Report'>;
}

function Report(props: Props): ReactElement {
  const { navigation } = props;
  const { theme } = useThemeContext();
  const [message, setMessage] = useState('');
  const { route: { params: { name, userId } } } = props;

  const [commitReport, isInFlight] = useMutation<ReportCreateReportMutation>(createReport);

  const handleReport = (): void => {
    const mutationConfig = {
      variables: {
        reportedUserId: userId,
        report: message,
      },
      onError: (error: any): void => {
        showAlertForError(error);
      },
      onCompleted: (response: ReportCreateReportMutationResponse) => {
        const { report } = response.createReport as Report;

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
            style={{ marginTop: 40 }}
            textInputProps={{
              style: {
                minHeight: 80,
              },
            }}
            borderColor={theme.font}
            focusColor={theme.focused}
            placeholderTextColor={theme.placeholder}
            secureTextEntry
            onChangeText={(txt: string): void => setMessage(txt)}
            label={name}
            value={message}
            placeholder={getString('REPORT_DESCRIPTION')}
            multiline={true}
          />
        </InnerContainer>
        <Button
          onPress={handleReport}
          loading={isInFlight}
          style={{
            root: {
              width: '100%',
              paddingHorizontal: 20,
            },
            button: {
              backgroundColor: theme.btnPrimary,
              borderWidth: 0,
              height: 48,
              width: '100%',
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
}

export default Report;
