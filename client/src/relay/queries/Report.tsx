import {graphql} from 'react-relay';

export const createReport = graphql`
  mutation ReportCreateReportMutation(
    $reportedUserId: String!
    $report: String!
  ) {
    createReport(reportedUserId: $reportedUserId, report: $report) {
      report
    }
  }
`;
