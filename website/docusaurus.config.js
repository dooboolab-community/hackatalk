/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'HackaTalk',
  tagline: 'Opensource chat app that works on iOS, android and web',
  url: 'https://website.hackatalk.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'dooboolab',
  projectName: 'hackatalk-website',
  onBrokenLinks: 'ignore',
  themeConfig: {
    navbar: {
      title: 'HackaTalk',
      logo: {
        alt: 'HackaTalk',
        src: 'img/logo.png',
      },
      items: [
        { to: '/docs/development/contributing', label: 'Development', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/dooboolab/hackatalk',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Development',
              to: '/docs/development/contributing',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://dooboolab.com/joinSlack',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Medium',
              href: 'https://medium.com/dooboolab',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} dooboolab.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/dooboolab/hackatalk-website/tree/master'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
