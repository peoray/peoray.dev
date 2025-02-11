---
title: How to Open a Markdown Link in a New Tab in Astro
description: Learn how to configure Astro to open markdown links in new tabs for better user experience.
pubDate: 2023-03-30
# updatedDate: ''
slug: 'astro-open-link-new-tab'
path: '/blog/astro-open-link-new-tab'
draft: false
tags: ['astro']
thumbnail: ''
---

As I was working on moving my website from [Gatsby to Astro](/blog/rebuilding-with-astro), I encountered the need to adjust how my markdown links are opened. I wanted to provide a seamless user experience by opening them in different tabs. By default, Astro opens all links in the same tab, which doesn't align with my desired behaviour.

One solution is to switch to the `.mdx` file format and use a custom component with the `target="_blank"` attribute. However, this approach may not be ideal if you already have several articles in the `.md` file format and don't want to spend time converting them as was my case.

After exploring various solutions, I discovered an approach that allowed me to achieve the desired link behaviour without the need to switch to the `.mdx` file format. This solution involved leveraging a rehype plugin to process the resulting HTML from Markdown. We are using a plugin since it is not possible yet to customize `.md` with Astro components.

First, install the [@jsdevtools/rehype-url-inspector](https://github.com/JS-DevTools/rehype-url-inspector) package by running the following command:

```bash
# or use your package manager
npm install @jsdevtools/rehype-url-inspector
```

Next, in your Astro project configuration file, usually `astro.config.mjs`, import the plugin and add it as a `rehypePlugin` in the `markdown` section:

```js
import inspectUrls from "@jsdevtools/rehype-url-inspector";

export default defineConfig({
  // ...other configuration options
  markdown: {
    rehypePlugins: [
      [
        inspectUrls, {
          selectors: ["a[href]"],
          inspectEach(url) {
            url.node.properties.target = "_blank";
          }
        }
      ]
    // ...other markdown configuration options
    ],
  },
  // ...other configuration options
});
```

Let's break down what's happening in the code:

- We import the `inspectUrls` function from the `@jsdevtools/rehype-url-inspector` package.
- In the `markdown` section of the configuration, we define the `rehypePlugins` array.
- Inside `rehypePlugins`, we provide the `inspectUrls` plugin along with its configuration options.
- We specify the `selectors` option as `["a[href]"]` to target all anchor (`<a>`) elements with an `href` attribute.
- For each matched URL, we modify the `target` property of the link node to `_blank`, which opens the link in a new tab.

That's it! With this configuration, Astro will process the Markdown-generated HTML using the `inspectUrls` plugin and modify the link properties accordingly.

This approach provides a more elegant solution compared to switching to `.mdx` files and using custom components. It allows you to maintain your existing `.md` files while achieving the desired link behaviour.
