---
id: integrate-with-backend
title: Integrate with backend
sidebar_label: Integrate with backend
---

Our server is hosted on [azure websites](https://hackatalk.azurewebsites.net) and we are mainly using graphql. You can checkout our graphql resolver in [playground](https://hackatalk.azurewebsites.net/graphql). Our development server is opened for everyone who wants to understand how `HackaTalk` works.

## Graphql Client

We are using [Relay](https://relay.dev) as our graphql client. Since we are only trying to use [react-hook](https://reactjs.org/docs/hooks-intro.html) in our project, we're only considering using `relay-hook` either which is current in [relay experimental](https://relay.dev/docs/en/experimental/a-guided-tour-of-relay). Please do not get confused with [relay-hooks](https://github.com/relay-tools/relay-hooks) which is different library.
