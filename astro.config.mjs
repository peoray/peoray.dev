import { defineConfig } from 'astro/config'
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs'

import tailwind from '@astrojs/tailwind'
import robotsTxt from 'astro-robots-txt'
import sitemap from '@astrojs/sitemap'
import image from '@astrojs/image'
import mdx from '@astrojs/mdx'
import inspectUrls from '@jsdevtools/rehype-url-inspector'
import react from '@astrojs/react'
import compress from 'astro-compress'
import partytown from '@astrojs/partytown'
import prefetch from '@astrojs/prefetch'

export default defineConfig({
  site: 'https://peoray.dev',
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [
        inspectUrls,
        {
          selectors: ['a[href]'],
          inspectEach(url) {
            url.node.properties.target = '_blank'
          },
        },
      ],
    ],
  },
  integrations: [
    tailwind(),
    robotsTxt(),
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    mdx(),
    react(),
    partytown({
      // Adds dataLayer.push as a forwarding-event.
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    prefetch(),
    compress(),
  ],
  legacy: {
    astroFlavoredMarkdown: true,
  },
})
