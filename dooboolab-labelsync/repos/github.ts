import { repo, label } from "label-sync";

/**
 * Default collection of label in a Github repository.
 */
export const github = repo({
  config: {
    removeUnconfiguredLabels: false,
  },
  labels: [
    label({
      name: "bug",
      color: "#d73a4a",
      description: "Something isn't working",
    }),
    label({
      name: "documentation",
      color: "#0075ca",
      description: "Improvements or additions to documentation",
    }),
    label({
      name: "duplicate",
      color: "#cfd3d7",
      description: "This issue or pull request already exists",
    }),
    label({
      name: "enhancement",
      color: "#a2eeef",
      description: "New feature or request",
    }),
    label({
      name: "good first issue",
      color: "#7057ff",
      description: "Good for newcomers",
    }),
    label({
      name: "help wanted",
      color: "#008672",
      description: "Extra attention is needed",
    }),
    label({
      name: "invalid",
      color: "#e4e669",
      description: "This doesn't seem right",
    }),
    label({
      name: "question",
      color: "#d876e3",
      description: "Further information is requested",
    }),
    label({
      name: "wontfix",
      color: "#000000",
      description: "This will not be worked on",
    }),
  ],
});
