import { list, nonNull, queryField, stringArg } from 'nexus';

export const reports = queryField('reports', {
  type: list('Report'),

  args: {
    userId: nonNull(stringArg()),
  },

  resolve: (_, { userId }, ctx) => {
    return ctx.prisma.report.findMany({
      where: { userId },
    });
  },
});
