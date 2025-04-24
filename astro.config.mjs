import { defineConfig, sharpImageService } from 'astro/config';
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import inspectUrls from '@jsdevtools/rehype-url-inspector';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	build: {
		format: 'file',
	},
	trailingSlash: 'never',
	prefetch: true,
	image: {
		service: {
			entrypoint: 'astro/assets/services/sharp',
			config: {
				limitInputPixels: false,
			},
		},
	},
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
		sitemap(),
		mdx(),
		react(),
		partytown({
			// Adds dataLayer.push as a forwarding-event.
			config: {
				forward: ['dataLayer.push'],
			},
		}),
		// (await import('@playform/compress')).default(),
	],
});
