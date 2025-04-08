import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'SVAHNAR Docs',
  tagline: 'Developer Documentation',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.svahnar.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SVAHNAR', // Usually your GitHub org/user name.
  projectName: 'DOCUMENTATION', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // createRedirects is not supported in the current version of @docusaurus/preset-classic
          // If needed, consider using a plugin or middleware for handling redirects.
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    navbar: {
      // title: 'SVAHNAR DOCS',
      logo: {
        alt: 'My Site Logo',
        src: 'img/light.svg', // Logo for light theme
        srcDark: 'img/dark.svg', // Logo for dark theme
        href: 'https://www.svahnar.com', // URL to redirect when the logo is clicked
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docSidebar', // Updated to match the defined sidebar in sidebars.ts
          position: 'left',
          label: 'Docs',
        },
        {to: '/guides', label: 'Guides', position: 'left'},
        {to: '/releasenotes', label: 'Release notes', position: 'left'},
        {
          href: 'https://github.com/orgs/Svahnar/repositories',
          className: 'header-github-link',
          position: 'right',
          'aria-label': 'GitHub repository',
        },
      ],
    },
// footer: {
//   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Tutorial',
    //           to: '/docs/intro',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Stack Overflow',
    //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
    //         },
    //         {
    //           label: 'Discord',
    //           href: 'https://discordapp.com/invite/docusaurus',
    //         },
    //         {
    //           label: 'X',
    //           href: 'https://x.com/docusaurus',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: '/blog',
    //         },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/facebook/docusaurus',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    // },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
