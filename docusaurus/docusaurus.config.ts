import {themes as prismThemes} from "prism-react-renderer";
import type {Config} from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Raymond Cheng",
  tagline: "Bringing privacy and funk to the people",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://www.raymondcheng.net",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often "/<projectName>/"
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren"t using GitHub pages, you don"t need these.
  organizationName: "ryscheng", // Usually your GitHub org/user name.
  projectName: "www.raymondcheng.net", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  onDuplicateRoutes: "throw",

  // Even if you don"t use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "./about",
          routeBasePath: "/about",
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/ryscheng/www.raymondcheng.net/blob/main/docusaurus/",
        },
        blog: {
          path: "./posts",
          routeBasePath: "/posts",
          showReadingTime: true,
          editUrl: "https://github.com/ryscheng/www.raymondcheng.net/blob/main/docusaurus/",
          feedOptions: {
            type: "rss",
          },
          blogSidebarCount: "ALL",
          postsPerPage: "ALL",
        },
        gtag: {
          trackingID: "G-ZVCB4PT25W",
          anonymizeIP: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project"s social card
    image: "img/me.jpg",
    metadata: [
      {name: 'keywords', content: 'raymond, cheng, founder, startup, research, science, open source, software, education'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    navbar: {
      title: "Raymond Cheng",
      logo: {
        alt: "Logo",
        src: "img/me.jpg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "mainSidebar",
          position: "left",
          label: "About",
        },
        {
          to: "/posts",
          label: "Blog",
          position: "left"
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Sections",
          items: [
            {
              label: "About",
              to: "/about",
            },
            {
              label: "Blog",
              to: "/posts",
            },
          ],
        },
        {
          title: "Links",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/ryscheng",
            },
            {
              label: "Product Hunt",
              href: "https://www.producthunt.com/@raymondcheng00",
            },
            {
              label: "Google Scholar",
              href: "https://scholar.google.com/citations?user=q0XfvU0AAAAJ&hl=en&oi=ao",
            },
            {
              label: "DBLP",
              href: "http://dblp.uni-trier.de/pers/hd/c/Cheng_0001:Raymond",
            },
            {
              label: "Realtor",
              href: "https://linktr.ee/raymondcheng_realty",
            },
            {
              label: "AngelList",
              href: "https://angel.co/u/ryscheng",
            },
          ],
        },
        {
          title: "Follow",
          items: [
            {
              label: "Substack",
              href: "https://ryscheng.substack.com/",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/RaymondCheng00",
            },
            {
              label: "Instagram",
              href: "https://instagram.com/ryscheng/",
            },
            {
              label: "YouTube",
              href: "https://www.youtube.com/c/RaymondCheng00",
            },
            {
              label: "Hype Machine",
              href: "http://hypem.com/djmontagged",
            },
            {
              label: "SoundCloud",
              href: "https://soundcloud.com/djmontaggedyourmommy",
            },
          ],
        },
        {
          title: "Connect",
          items: [
            {
              label: "Email",
              href: "mailto:0wl2uszb@duck.com",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/ryscheng",
            },
            {
              label: "Facebook",
              href: "https://www.facebook.com/ryscheng",
            },
            {
              label: "Snapchat",
              href: "https://www.snapchat.com/add/ryscheng",
            },
          ],
        },
        
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ryscheng`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
