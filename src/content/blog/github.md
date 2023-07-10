---
title: How to Change Your Repository's Language on GitHub
description: Learn how to change your repository's language detection on Github.
date: 2023-04-13
slug: 'change-language-github'
path: '/blog/change-language-github'
draft: false
tags: ['astro']
lastmod: false
thumbnail: ''
---

I recently moved my website from [Gatsby to Astro](/blog/rebuilding-with-astro). In the process, I also created an RSS feed for my blog. Instead of the default no CSS styling, I wanted it to look better and came across a way to style my RSS feed. Similarly to how we use CSS to style our HTML, we can use XSLT to style our XML.

After writing the code and ensuring it works as expected, I pushed my changes to GitHub. I notice that the language detection for the repo was displaying `XSLT`  instead of Astro which it was showing before the recent update to the repo.

After much googling, I found out that Github uses a tool called [Linguist](https://github.com/github/linguist) to detect the languages you used based on file extensions in your repo. We can tell Linguist to exclude certain files from its calculations by configuring a `.gitattributes` file in the root of the repo.

In my case, I had to do this:

```bash
# .gitattributes
public/rss/* linguist-vendored
```

In my `.gitattributes` file, I added a linguist-vendored entry for the directory I want to exclude. The linguist-vendored attribute tells Linguist to ignore any file in that directory. Doing this fixed the issue for me and my repo's language became Astro again.

It is important to note that I'm describing an issue I encountered and what I did to fix it. It is likely that you might face a different issue. I encourage you to look at Lingust documentation to see various way you can alter the language of your repo.
