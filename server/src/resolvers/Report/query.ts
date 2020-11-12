import { queryField, stringArg } from '@nexus/schema';

export const reports = queryField('reports', {
  type: 'Report',
  nullable: false,
  list: true,

  args: {
    userId: stringArg({ nullable: true }),
  },

  resolve: (_, { userId }, ctx) => {
    return ctx.prisma.report.findMany({
      where: { userId },
    });
  },
});
