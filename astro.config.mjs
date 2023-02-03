import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import image from '@astrojs/image';

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
import inspectUrls from '@jsdevtools/rehype-url-inspector';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
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
            url.node.properties.target = '_blank';
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
  ],
  legacy: {
    astroFlavoredMarkdown: true,
  },
});
