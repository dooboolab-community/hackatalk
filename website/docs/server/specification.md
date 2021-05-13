---
id: specification
title: Specification
sidebar_label: Specification
---

Our development server is open for everyone in [azure websites](https://hackatalk.azurewebsites.net) and we are mainly using graphql. You can checkout our graphql resolvers in [playground](https://hackatalk.azurewebsites.net/graphql). We opened our development server to share and improve `HackaTalk` publically.

We are using [Prisma](https://www.prisma.io) and [nexus](https://nexus.js.org/docs/nexus-prisma) to serve our resolvers.

### Diagram
- These diagrams are for those who want to understand this project's overall structure at a glance.

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('diagrams/server_specification.drawio.svg')} alt="hacaktalk overall structure diagram" />
