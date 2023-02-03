---
title: 'How to Run Multiple NPM Scripts Using Concurrently'
description: 'How to use concurrently to run multiple npm scripts with a single script'
date: 2019-06-12T12:50:03+01:00
draft: false
slug: 'using-concurrently'
path: '/blog/using-concurrently'
tags: ['npm', 'node']
lastmod: false
thumbnail: '/images/blog/using-concurrently/cover.png'
---

Nowadays, while building applications with Javascript, you'd need to run different scripts on the terminal. For instance, if you are building a SPA (Single Page Application) with React with a Nodejs API, very often you would need to start the node.js server as well as your React application so you can view it on the browser.

```json
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client"
```

> **NB:** This `package.json` file is the one in the server directory and not the one in the client folder.

This would require you to open multiple terminal tabs and run `npm run client` and <br> `npm run server`. Overtime, this can get tiring.

To save time, you can run both commands using a single script. All you need is to use a package called [concurrently](https://github.com/kimmobrunfeldt/concurrently).

### What is Concurrently?

Concurrently is an npm package that allows you to run multiple commands on your terminal concurrently.

### How to use it?

To use concurrently, you need to install it via [npm](https://www.npmjs.com/package/concurrently) with the command:

```bash
npm install --save-dev concurrently
```

The `--save-dev` flag will tell npm to install it as a devDependency.

To then add it as an npm script, you will add it in your `package.json` file:

```json
"script-name": concurrently "one process" "another process"
```

Using the example above, in order to use concurrently to start up our React application and Node server, you will need to add a script in the server's `package.json` file:

```json
    "client-install": "npm install --prefix client",
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
```

Now when you run `npm run dev` in the terminal, it will start both the React app and Node server for you.

For more information, check out the official [docs](https://github.com/kimmobrunfeldt/concurrently/#readme).
