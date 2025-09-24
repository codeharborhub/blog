// import { default as npm2yarn } from "@docusaurus/remark-plugin-npm2yarn";
import { themes as prismThemes } from "prism-react-renderer";

const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");

const path = require("path");
require("dotenv").config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "CodeHarborHub",
  tagline: "A place to learn and grow",
  favicon: "img/favicon_io/favicon.ico",
  url: process.env.URL || "https://codeharborhub.github.io",
  baseUrl: "/blog/",
  customFields: {
    admin: "Ajay Dhangar",
    superman: "Shivay",
  },

  organizationName: "codeharborhub",
  projectName: "codeharborhub.github.io",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true,
        docs: false,
        blog: {
          routeBasePath: "/",
          showReadingTime: true,
          blogTitle: "CodeHarborHub",
          blogDescription:
            "Welcome to CodeHarborHub blog, a place to learn and grow. We provide accessible and comprehensive educational resources to learners of all levels, from beginners to advanced professionals. Our mission is to empower individuals with the knowledge and skills they need to succeed in today's fast-paced world. Whether you're looking to learn a new skill, advance your career, or simply explore new ideas, CodeHarborHub has something for you.",
          postsPerPage: 6,
          truncateMarker: /<!--\s*(truncate)\s*-->/,
          blogSidebarTitle: "List blog",
          blogSidebarCount: "ALL",
          include: ["**/*.md", "**/*.mdx"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          showReadingTime: true,
          onUntruncatedBlogPosts: "ignore",
          editUrl: "https://github.com/codeharborhub/blog/edit/main/",
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],

          feedOptions: {
            type: "all",
            copyright: `© ${new Date().getFullYear()} CodeHarborHub`,
          },

          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
            remarkMath,
          ],

          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/codeharborhub-social-card.jpg",
      // announcementBar: {
      //   id: "announcementBar",
      //   content:
      //     '📢 Join our <a target="_blank" href="https://www.whatsapp.com/channel/0029Vah6hro8F2pGUhuAcR0B">WhatsApp Channel</a> for the latest updates and collaboration on exciting projects!',
      //   isCloseable: true,
      //   backgroundColor: "#4d5061",
      // },

      metadata: [
        {
          name: "keywords",
          content:
            "CodeHarborHub, Docs, Tutorials, Courses, DSA, Problems, Solutions, Showcase, Community, Blog, Web Dev, Live Editor, Quiz, Tags, Donate, Careers, Team, GitHub, Products, LinkedIn, YouTube, Discord, Twitter, Privacy Policy, Terms of Service, Code of Conduct, Cookie Policy, Licensing, Web Development, React, JavaScript, Python, Java, Tailwind CSS, CPP, NextJs, MATLAB, Julia, HTML, CSS, TypeScript, DSA, Data Structures, Algorithms, Competitive Programming",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@CodesWithAjay" },
        { name: "twitter:creator", content: "@CodesWithAjay" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "CodeHarborHub" },
        {
          property: "og:title",
          content: "CodeHarborHub - A place to learn and grow",
        },
        {
          property: "og:description",
          content:
            "CodeHarborHub is a place to learn and grow. We provide accessible and comprehensive educational resources to learners of all levels, from beginners to advanced professionals.",
        },
        {
          property: "og:image",
          content:
            "https://codeharborhub.github.io/img/codeharborhub-social-card.jpg",
        },
        { property: "og:url", content: "https://codeharborhub.github.io" },
      ],

      algolia: {
        apiKey: "9a235effc3fe5f0b7b18245f309910c5",
        indexName: "codeharborhubio",
        appId: "ZF3MPCPQHR",
        contextualSearch: false,
      },

      navbar: {
        title: "CodeHarborHub",
        logo: {
          alt: "CodeHarborHub Logo",
          src: "img/nav-logo.jpg",
          href: "https://codeharborhub.github.io",
          target: "_self",
        },
        items: [
          {
            label: "All Blogs",
            to: "/",
            activeBaseRegex: "/",
          },
          {
            label: "Authors",
            to: "/authors/",
            activeBaseRegex: "/authors/",
          },
          {
            label: "🏷️ Blog Tags",
            to: "/tags/",
            activeBaseRegex: "/tags/",
          },
          {
            type: "search",
            position: "right",
          },
          {
            href: "https://github.com/codeharborhub",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
        // hideOnScroll: true,
      },
      footer: {
        style: "dark",
        links: [
          {
            title: " ",
            items: [
              {
                html: `
                    <div class="footer_info--container">
                      <img src="/img/nav-logo.jpg" alt="Footer logo" />
                      <span>
                      Our mission at CodeHarborHub is clear: to provide accessible and comprehensive educational resources to learners of all levels, from beginners to advanced professionals.
                      </span>
                    </div>
                  `,
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Tutorials",
                to: "#",
              },
              {
                label: "Courses",
                to: "#",
              },
              {
                label: "DSA Problems",
                to: "#",
              },
              {
                label: "DSA Solutions",
                to: "#",
              },
            ],
          },
          {
            title: "Company",
            items: [
              {
                label: "About",
                to: "#",
              },
              {
                label: "Contact",
                to: "#",
              },
              {
                label: "Careers",
                to: "#",
              },
              {
                label: "Team",
                to: "#",
              },
            ],
          },
          {
            title: "Terms/Conditions",
            items: [
              {
                label: "Privacy Policy",
                to: "#",
              },
              {
                label: "Terms of Service",
                to: "#",
              },
              {
                label: "Code of Conduct",
                to: "#",
              },
              {
                label: "Cookie Policy",
                to: "#",
              },

              {
                label: "License",
                to: "#",
              },
            ],
          },
          {
            title: "Quick Links",
            items: [
              {
                label: "Blog",
                to: "#",
              },
              {
                label: "Community",
                to: "#",
              },
              {
                label: "GitHub",
                href: "https://github.com/codeharborhub",
              },
            ],
          },
          {
            title: "Social Media",
            items: [
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/codeharborhub/",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/@ajay-dhangar",
                icon: "faYoutube",
              },
              {
                label: "Discord",
                href: "https://discord.gg/c53FQn3pRv",
              },
              {
                label: "Twitter(X)",
                href: "https://twitter.com/CodesWithAjay",
              },
            ],
          },
        ],
        logo: {
          alt: "Powered by CodeHarborHub | Product Hunt",
          src: "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=464236&theme=light",
          href: "https://www.producthunt.com/posts/codeharborhub",
        },
        copyright: `Copyright © ${new Date().getFullYear()} CodeHarborHub, Made by <a href="https://github.com/ajay-dhangar/">Ajay Dhangar</a>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          "java",
          "latex",
          "haskell",
          "matlab",
          "PHp",
          "powershell",
          "bash",
          "diff",
          "json",
          "scss",
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
    }),

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid", "@docusaurus/theme-live-codeblock"],

  plugins: [
    [
      "vercel-analytics",
      {
        debug: true,
        mode: "auto",
      },
    ],
    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-MLJNRGC9",
      },
    ],
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-8QK6Y7QDCB",
        anonymizeIP: true,
      },
    ],
    [
      "@docusaurus/plugin-pwa",
      {
        debug: true,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        swCustom: require.resolve("./src/sw.js"),
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/favicon_io/favicon.ico",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json",
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "rgb(37, 194, 160)",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-status-bar-style",
            content: "#000",
          },
          {
            tagName: "link",
            rel: "apple-touch-icon",
            href: "/img/favicon_io/apple-touch-icon.png",
          },
          {
            tagName: "meta",
            name: "msapplication-TileImage",
            content: "/img/favicon_io/android-chrome-192x192.png",
          },
          {
            tagName: "meta",
            name: "msapplication-TileColor",
            content: "#000",
          },
        ],
      },
    ],
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
    [
      path.join(__dirname, "/plugins/my-plugin"),
      {
        settings: "Some20settings",
        api: "Some-API",
        keys: "Some-keys",
      },
    ],
    "docusaurus-plugin-sass",
  ],
};

export default config;
