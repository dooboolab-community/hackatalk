import { queryField, stringArg } from '@nexus/schema';

export const reports = queryField('reports', {
  type: 'Report',
  list: true,

  args: {
    userId: stringArg(),
  },

  resolve: (_, { userId }, ctx) => {
    return ctx.prisma.report.findMany({
      where: { userId },
    });
  },
});
