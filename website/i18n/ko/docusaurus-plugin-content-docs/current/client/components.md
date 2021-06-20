---
id: components
title: 컴포넌트
sidebar_label: 컴포넌트
---

## Component 만들기

To create additional components to `HackaTalk`, you can easily run `dooboo screen` command. To do that you need to first install [dooboo-cli](https://www.npmjs.com/package/dooboo-cli).

### Using [dooboo-cli](https://www.npmjs.com/package/dooboo-cli)

[dooboo-cli](https://www.npmjs.com/package/dooboo-cli) has been updated to `version 3` in Dec 2019. You can read about it in the [medium post](https://medium.com/dooboolab/announcing-dooboo-cli-v3-5c9fceeb2ac4).

![dooboo-ui](https://miro.medium.com/max/1260/1*Lc60i9R2zi7-xR0VZhESDg.png)

* You can see how easily you can create sample screens and tests files.

## Types

We are organizing our main components into three different characteristcs which are `navigation`, `screen`, and `shared`.

### Navigation

The navigation components are group of screen components.

### Page

The page components are screen unit component which means that it generally has size of the device's screen.

### UI

The ui components are mostly reusable components which focus on UI layer. They are components like `Button`, `EditText`, `Calendar` and so on.