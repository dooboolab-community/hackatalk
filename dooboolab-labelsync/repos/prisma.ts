import { repo, label, colors } from "label-sync";

/**
 * Label configuration used internally by Prisma team. Labels are grouped
 * by their intention (e.g. bug/*, kind/*, process/*) and give
 * great base for issue triaging.
 */

export const prisma = repo({
  config: {
    removeUnconfiguredLabels: false,
  },
  labels: [
    /* Bugs */
    label({
      name: "bug/0-needs-info",
      color: colors.danger,
      description: "More information is needed for reproduction.",
    }),
    label({
      name: "bug/1-repro-available",
      color: colors.danger,
      description: "A reproduction exists and needs to be confirmed.",
    }),
    label({
      name: "bug/2-confirmed",
      color: colors.danger,
      description: "We have confirmed that this is a bug.",
    }),
    /* Kind */
    label({
      name: "kind/bug",
      color: colors.neutral,
      description: "A reported bug.",
    }),
    label({
      name: "kind/regression",
      color: colors.neutral,
      description: "A reported bug in functionality that used to work before.",
    }),
    label({
      name: "kind/feature",
      color: colors.neutral,
      description: "A request for a new feature.",
    }),
    label({
      name: "kind/improvement",
      color: colors.neutral,
      description: "An improvement to existing feature and code.",
    }),
    label({
      name: "kind/docs",
      color: colors.neutral,
      description: "A documentation change is required.",
    }),
    label({
      name: "kind/discussion",
      color: colors.neutral,
      description: "Discussion is required.",
    }),
    label({
      name: "kind/question",
      color: colors.neutral,
      description: "Developer asked a question. No code changes required.",
    }),
    /* Process triaging. */
    label({
      name: "process/candidate",
      color: colors.shiny,
      description: "Candidate for next Milestone.",
    }),
    label({
      name: "process/next-milestone",
      color: colors.shiny,
      description: "Issue earmarked for next Milestone.",
    }),
    label({
      name: "process/product",
      color: colors.shiny,
      description:
        "Temporary label to export products issues from the Engineering process",
    }),
  ],
});
