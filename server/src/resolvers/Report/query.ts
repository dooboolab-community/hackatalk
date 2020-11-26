import { list, queryField, stringArg } from '@nexus/schema';

export const reports = queryField('reports', {
  type: list('Report'),

  args: {
    userId: stringArg(),
  },

  resolve: (_, { userId }, ctx) => {
    return ctx.prisma.report.findMany({
      where: { userId },
    });
  },
});
