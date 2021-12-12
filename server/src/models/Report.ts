import {Report as ReportNexus} from 'nexus-prisma/*';
import {objectType} from 'nexus';

export const Report = objectType({
  name: ReportNexus.$name,
  description: ReportNexus.$description,
  definition(t) {
    t.field(ReportNexus.id);
    t.field(ReportNexus.report);
    t.field(ReportNexus.createdAt);
    t.field(ReportNexus.updatedAt);
    t.field(ReportNexus.deletedAt);

    t.field(ReportNexus.user);
    t.field(ReportNexus.reportedUser);
  },
});
