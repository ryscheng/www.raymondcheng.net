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
  //trailingSlash: true,

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
          editUrl: "https://github.com/ryscheng/www.raymondcheng.net/tree/main/docusaurus/",
        },
        blog: {
          path: "./posts",
          routeBasePath: "/posts",
          showReadingTime: true,
          editUrl: "https://github.com/ryscheng/www.raymondcheng.net/tree/main/docusaurus/",
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
          type: "dropdown",
          label: "Blog",
          position: "left",
          items: [
            {
              label: "Popular",
              to: "/posts/tags/popular",
            },
            {
              label: "Recent",
              to: "/posts",
            },
            {
              label: "Guides",
              to: "/posts/tags/guides",
            },
            {
              label: "Projects",
              to: "/posts/tags/projects",
            },
            {
              label: "Thoughts",
              to: "/posts/tags/thoughts",
            },
            {
              label: "Life",
              to: "/posts/tags/life",
            },
            {
              label: "Web",
              to: "/posts/tags/web",
            },
            {
              label: "Security",
              to: "/posts/tags/security",
            },
            {
              label: "Decentralization",
              to: "/posts/tags/decentralization",
            },
            {
              label: "Hardware",
              to: "/posts/tags/hardware",
            },
            {
              label: "Food",
              to: "/posts/tags/food",
            },
            {
              label: "Recreation",
              to: "/posts/tags/recreation",
            },
          ],
        },
        {
          type: "docSidebar",
          sidebarId: "mainSidebar",
          position: "left",
          label: "Bio",
        },
        {
          type: "dropdown",
          label: "About",
          position: "left",
          items: [
            {
              label: "Human Being",
              to: "/about/me/human",
            },
            {
              label: "Hacker & Entrepreneur",
              to: "/about/me/hacker",
            },
            {
              label: "Student & Teacher",
              to: "/about/me/education",
            },
            {
              label: "Scientist & Writer",
              to: "/about/me/writer",
            },
            {
              label: "Realtor",
              to: "/about/me/realtor",
            },
            {
              label: "Builder",
              to: "/about/me/builder",
            },
            {
              label: "Traveler",
              to: "/about/me/traveler",
            },
            {
              label: "Mountaineer",
              to: "/about/me/mountaineer",
            },
            {
              label: "Chef & Bartender",
              to: "/about/me/chef",
            },
            {
              label: "Pilot",
              to: "/about/me/pilot",
            },
            {
              label: "Seaman",
              to: "/about/me/seaman",
            },
            {
              label: "Diver",
              to: "/about/me/diver",
            },
            {
              label: "Biker",
              to: "/about/me/biker",
            },
            {
              label: "Dancer",
              to: "/about/me/dancer",
            },
          ],
        },
        {
          type: "dropdown",
          label: "Projects",
          position: "left",
          items: [
            {
              label: "Current projects",
              to: "/about/category/current-work",
            },
            {
              label: "Mature work",
              to: "/about/category/mature-projects",
            },
            {
              label: "Hacks",
              to: "/about/category/hacks",
            },
          ],
        },
        {
          type: "dropdown",
          label: "Publications",
          position: "left",
          items: [
            {
              label: "Papers",
              to: "/about/publications/papers",
            },
            {
              label: "Talks",
              to: "/about/publications/talks",
            },
            {
              label: "Press",
              to: "/about/publications/press",
            },
          ],
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
              label: "Blog",
              to: "/posts/tags/popular",
            },
            {
              label: "Bio",
              to: "/about",
            },
            {
              label: "About",
              to: "/about/category/about-me",
            },
            {
              label: "Projects",
              to: "/about/category/projects",
            },
            {
              label: "Publications",
              to: "/about/category/publications",
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
    algolia: {
      appId: "2RZMLKJO11",
      apiKey: "033564583db11d180d207d01d137cdfa",
      indexName: "raymondcheng",
      contextualSearch: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
