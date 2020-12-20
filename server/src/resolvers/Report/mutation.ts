import SendGridMail, { MailDataRequired } from '@sendgrid/mail';
import { mutationField, nonNull, stringArg } from 'nexus';

const { SENDGRID_EMAIL } = process.env;

export const createReport = mutationField('createReport', {
  type: 'Report',

  args: {
    reportedUserId: nonNull(stringArg()),
    report: nonNull(stringArg()),
  },

  resolve: async (_, { reportedUserId, report }, { prisma, request, userId }) => {
    const msg: MailDataRequired = {
      to: 'hackatalk@gmail.com',
      from: SENDGRID_EMAIL,
      subject: `${request.req.t('USER_REPORTED')} - ${reportedUserId}`,
      text: `The user (${userId}) has reported ${reportedUserId}.\n\nmessage: ${report}.`,
    };

    await SendGridMail.send(msg);

    return prisma.report.create({
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
