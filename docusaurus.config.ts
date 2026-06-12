import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
// framer-motion img import removed (unused)

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
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SVAHNAR', // Usually your GitHub org/user name.
  projectName: 'DOCUMENTATION', // Usually your repo name.
  deploymentBranch: 'main',

  onBrokenLinks: 'throw',

  clientModules: ['./src/client-modules/sidebar-scroll.ts', './src/client-modules/gtag-shim.ts'],

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
        // gtag: {
        //   trackingID: 'G-50T925X4N9',
        // },
        sitemap: {
          changefreq: 'daily',
          priority: 0.8,
          lastmod: 'date',
          ignorePatterns: ['/search'],
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-50T925X4N9',
        anonymizeIP: true,
      },
    ],
    // Note: Homepage redirect is handled by src/pages/index.* instead
    // '@docusaurus/plugin-client-redirects' removed: root redirect conflicted with trailingSlash
  ],


  themeConfig: {
    image: 'https://content.svahnar.com/website/seo/opengraph/og-main.webp', // Default OG image for all pages


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
      links: [
        {
          items: [
            {
              html: `
<div class="footer-brand-container">
  <span class="theme-logo">
    <img class="logo-light" src="/img/light.svg" alt="logo (light)" />
    <img class="logo-dark"  src="/img/dark.svg"  alt="logo (dark)" />
  </span>

  <div class="footer-social-links">
    <a href="https://linkedin.com/company/svahnar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="footer-social-link">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-76.1-46.39-76.1-46.4 0-53.5 36.2-53.5 73.6V448h-92.68V148.9h89V189.8h1.3c12.4-23.4 42.7-48.2 87.9-48.2 94 0 111.37 61.9 111.37 142.3V448z"></path></svg>
    </a>
    <a href="https://x.com/svahnar/" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" class="footer-social-link">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
    </a>
    <a href="https://github.com/svahnar/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="footer-social-link">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.5 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5.7 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-.7zm-14.4-19.3c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
    </a>
    <a href="https://www.youtube.com/@SVAHNAR" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="footer-social-link">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>
    </a>
  </div>
</div>
              `,
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About',
              href: 'https://www.svahnar.com/about',
            },
            {
              label: 'Newsroom',
              href: 'https://svahnar.com/news',
            },
            {
              label: 'Blogs',
              href: 'https://svahnar.com/blog',
            },
            {
              label: 'Cookbook',
              href: 'https://svahnar.com/cookbook',
            },
            {
              label: 'Brand Assets',
              href: 'https://svahnar.com/brand/assets',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Docs',
              to: '/docs/GetStarted/Overview',
            },
            {
              label: 'Status',
              href: 'https://status.svahnar.com',
            },
            {
              label: 'Pricing',
              href: 'https://www.svahnar.com/pricing',
            },
          ],
        },
        {
          title: 'Help',
          items: [
            {
              label: 'Community',
              href: 'https://community.svahnar.com/',
            },
            {
              label: 'Contact',
              href: 'https://www.svahnar.com/contact',
            },
          ],
        },
        {
          title: 'Terms & Policies',
          items: [
            {
              label: 'Privacy Policy',
              href: 'https://www.svahnar.com/policies/privacy-policy',
            },
            {
              label: 'Terms of Service',
              href: 'https://www.svahnar.com/policies/terms-of-service',
            },
          ],
        },
      ],
      copyright: `Built by <a href="https://www.svahnar.com/contact" target="_blank" rel="noopener noreferrer">SVAHNAR 2026</a>`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
