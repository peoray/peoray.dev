---
title: 'How to Hide Vue Source Map on Browser Devtools'
description: 'How to disable source map or debug mode in production for Vue.js applications'
date: 2019-07-09T11:25:37+01:00
draft: false
slug: 'hide-vue-source-map-code-in-production'
path: '/blog/hide-vue-source-map-code-in-production'
tags: ['vue', 'webpack']
# category: ['Web Development']
template: post
lastmod: false
thumbnail: './images/cover.png'
---

If you have ever created your Vue project using the Vue CLI and deployed to production before, chances are you might not know that your whole code is visible on the devtools.

If you go to **developer tools > Sources in Chrome or developer tools > debugger** in Mozilla, then under `webpack://`, you can see the whole code under the `src` directory. That's because webpack generates source maps which show the original source code and structure.

Now, if you are building a personal project, maybe for learning purposes or as open source, this might not bother you, but if this is an application that real users will use and might contain sensitive data, then it's risky.

In this article, I will show you how to disable it so your code and data won't be exposed.

If you used the Vue CLI to create your project, then follow these steps:

- Create a `vue.config.js` file in the root of your project folder. If you already have it, no need to recreate it again.

- Add the following to the file:

```js
module.exports = {
  productionSourceMap: false,
};
```

What this will do is to tell Webpack to skip the source map generation. Also, setting this to false can speed up production builds.

If you save and deploy your work again, you will notice that the `webpack://` section is gone. Now you don't have to worry about hackers having access to the whole of your code.
