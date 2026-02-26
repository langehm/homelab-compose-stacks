import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/homelab-compose-stacks/',
  title: "Homelab compose stacks",
  description: "A collection of compose stack for usage in homelabs with usefull services and their corresponding configuration.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Get started', link: '/getting-started' },
          { text: 'Disclaimer', link: '/disclaimer' }
        ]
      }
    ],

    outline: {
      level: "deep"
    },

    search: {
      provider: "local"
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
