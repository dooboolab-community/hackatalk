import { mutationField, stringArg } from '@nexus/schema';

import { getUserId } from '../../utils/auth';

export const createReport = mutationField('createReport', {
  type: 'Report',
  args: {
    reportedUserId: stringArg({ required: true }),
    report: stringArg({ nullable: false }),
  },
  resolve: (_, { reportedUserId, report }, ctx) => {
    const userId = getUserId(ctx);

    return ctx.prisma.report.create({
      data: {
        report,
        user: {
          connect: {
            id: userId,
          },
        },
        reportedUser: {
          connect: {
            id: reportedUserId,
          },
        },
      },
      include: {
        user: true,
        reportedUser: true,
      },
    });
  },
});
