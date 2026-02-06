import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { img } from 'framer-motion/client';

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
  deploymentBranch: 'main',

  onBrokenLinks: 'warn',

  clientModules: ['./src/client-modules/sidebar-scroll.ts'],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  // Markdown config - hooks are the preferred location for handling markdown link
  // behaviour; `onBrokenMarkdownLinks` is deprecated at the top level and will be
  // removed in Docusaurus v4. Move it into `markdown.hooks` to silence the deprecation warning.
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
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

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/GetStarted/Overview',
            from: ['/'],
          },
        ],
      },
    ],
    // 'docusaurus-markdown-source-plugin',
  ],

  themeConfig: {
    // Replace with your project's social card

    navbar: {
      // title: 'SVAHNAR DOCS',
      logo: {
        alt: 'SVAHNAR',
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
        // {to: '/guides', label: 'Guides', position: 'left'},
        // {to: '/releasenotes', label: 'Release notes', position: 'left'},
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
      // pick a built-in theme
      theme: prismThemes.vsLight,     // light mode code style
      darkTheme: prismThemes.vsDark,  // dark mode code style


    },
    footer: {
      // style: 'dark',

      links: [
        {
          items: [
            {
              html: `
<style>
/* basic sizing */
.theme-logo img { height: 40px; display: inline-block; }

/* default: show light, hide dark */
.theme-logo .logo-dark { display: none; }

/* dark theme selectors: try several common selectors that Docusaurus or themes use */
html[data-theme="dark"] .theme-logo .logo-light,
html.theme-dark .theme-logo .logo-light,
html.dark .theme-logo .logo-light,
:root.dark .theme-logo .logo-light {
  display: none;
}
html[data-theme="dark"] .theme-logo .logo-dark,
html.theme-dark .theme-logo .logo-dark,
html.dark .theme-logo .logo-dark,
:root.dark .theme-logo .logo-dark {
  display: inline-block;
}

/* optional: keep images accessible and responsive */
.theme-logo img { vertical-align: middle; }
</style>

<span class="theme-logo">
  <img class="logo-light" src="/img/light.svg" alt="logo (light)" />
  <img class="logo-dark"  src="/img/dark.svg"  alt="logo (dark)" />
</span>
              `,
            },
          ],

        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: '/docs/GetStarted/Overview',
            },
            {
              label: 'Quickstart',
              to: '/docs/GetStarted/Quickstart',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/orgs/Svahnar/repositories',
            },
            {
              label: 'Website',
              href: 'https://www.svahnar.com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Get Help',
              href: 'https://www.svahnar.com/contact',
            },
            {
              label: 'Privacy',
              href: 'https://www.svahnar.com/policies/privacy-policy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SVAHNAR.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
