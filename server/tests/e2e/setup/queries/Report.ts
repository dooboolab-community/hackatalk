export const createReportMutation = /* GraphQL */`
  mutation createReport($reportedUserId: String! $report: String!) {
    createReport(reportedUserId: $reportedUserId report: $report) {
      user {
        email
      }
      reportedUser {
        email
      }
    }
  }
`;
