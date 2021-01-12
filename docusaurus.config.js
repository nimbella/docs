module.exports = {
  title: 'Nimbella Docs',
  tagline: 'The tagline of my site',
  url: 'https://docs.nimbella.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'nimbella', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.,
  themeConfig: {
    navbar: {
      title: 'Nimbella Developer Guide',
      logo: {
        alt: 'Nimbella Docs Logo',
        src: 'img/nimbella-logo.svg',
      },
      items: [
        {
          href: 'https://github.com/nimbella/docs',
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
              label: 'Style Guide',
              to: '/',
            },
            {
              label: 'Second Doc',
              to: '/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/nimbella',
            },
            {
              label: 'Slack',
              href: 'https://nimbella.com/slack',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/nimbella',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/nimbella/docs',
            },
          ],
        },
      ],
      copyright: `Copyright © Nimbella, Inc ${new Date().getFullYear()}. All rights reserved. <a href="https://nimbella.com/terms" target="_blank" rel="noreferrer noopener nofollow">Terms</a> | <a href="https://nimbella.com/privacy" target="_blank" rel="noreferrer noopener nofollow">Privacy</a>`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/nimbella/docs/edit/master',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
