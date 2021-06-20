---
id: components
title: Components
sidebar_label: Components
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Creating components

To create additional components to `HackaTalk`, you can easily run `dooboo page` command. To do that you need to first install [dooboo-cli](https://www.npmjs.com/package/dooboo-cli).

### Using [dooboo-cli](https://www.npmjs.com/package/dooboo-cli)

[dooboo-cli](https://www.npmjs.com/package/dooboo-cli) has been updated to **version 3** in Dec 2019. You can read about it in the [medium post](https://medium.com/dooboolab/announcing-dooboo-cli-v3-5c9fceeb2ac4).

However, we've migrated to **version 6** template which manages components into `navigations`, `pages`, and `uis` instead of `navigation`, `screen` and `ui`.

<img src={useBaseUrl('img/dooboo-cli-5.png')} alt="dooboo-cli-v5 sample commands" />

* You can see how easily you can create sample screens and tests files.

## Types

We are organizing our main components into three different characteristcs which are `navigation`, `page`, and `ui`.

### Navigation

The navigation components are group of screen components. However, we recommend to nest navigation component inside the `page` component if your have complex navigation structure.

#### For exmaple
<img src={useBaseUrl('img/nested-navigation-structure.png')} alt="dooboo-cli-v5 sample commands" width='300' />

The above structure is easier to search for the component you are looking for if you have many nested navigations.

### Page

The page component is mostly a full-screen-sized component that has the size of the device's screen. Sometimes when there are `tabs`, it may be a smaller unit. However, the page components will not include each other.

### UI

The ui components are mostly reusable components which focus on UI layer. They are components like `Button`, `EditText`, `Calendar` and so on. Many page components reuse these components.
