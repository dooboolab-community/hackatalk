# LabelSync TypeScript configuration.

Hey there! Welcome to LabelSync. We have scaffolded the configuration file for you. Check it out!

### Setting up LabelSync

1. Create a repository on Github and name it `dooboolab-labelsync`.
1. Commit your configuration (this repository) to Github.
1. Head over to [LabelSync Manager Github Application](https://github.com/apps/labelsync-manager) and make sure that you install it in all repositories that you have configured.

### LabelSync library cheat sheet

**Methods:**

- `labelsync`: used as a configuration entry point. Outputs yaml version of your configuration to the root of your repository.
- `repo`: used to configure a single repository
- `label`: used to create a single label

**Presets:**

Check out `colors` property with a set of common colors for labels, and `type`, `note`, `impact`, `effort`, `needs`, `scope` and `communtiy` label templates to get up to speed more quickly. Label templates all prepend their name to the name of your label and already pack a nice color of our choosing.

```ts
function labelsync({
  /* Repositories represent a repo-name:config dictionary */
  repos: { [repo: string]: Repository }
}): Configuration

/* Repo */
function repo({
  config?: {
    /* removes unconfigured labels from repository to keep it clean */
    removeUnconfiguredLabels?: boolean
  }
  /* list of labels that we get using label method below */
  labels: Label[]
})

/* Label */
function label(name: string, color: string)
function label({
  /* name of the label */
  name: string
  /* color in hex format */
  color: string
  description?: string
  /* old names of this label */
  alias?: string[]
  /* siblings of the label */
  siblings?: string[]
})
```
