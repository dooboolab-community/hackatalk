import { MailDataRequired, send } from '@sendgrid/mail';
import { mutationField, stringArg } from '@nexus/schema';

import { getUserId } from '../../utils/auth';

const { SENDGRID_EMAIL } = process.env;

export const createReport = mutationField('createReport', {
  type: 'Report',
  args: {
    reportedUserId: stringArg({ required: true }),
    report: stringArg({ nullable: false }),
  },
  resolve: async (_, { reportedUserId, report }, ctx) => {
    const userId = getUserId(ctx);

    const msg: MailDataRequired = {
      to: 'hackatalk@gmail.com',
      from: SENDGRID_EMAIL,
      subject: `${ctx.request.req.t('USER_REPORTED')} - ${reportedUserId}`,
      text: `The user (${userId}) have been reported.\n\nmessage: ${report}`,
    };

    await send(msg);

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
