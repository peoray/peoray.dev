---
title: 'How to Implement a Not Found Route in Vue 3'
description: 'Learn how to handle catch-all routes and create a custom 404 page in Vue 3 applications using Vue Router 4'
date: 2023-03-02
slug: 'vue-router-catch-all'
path: '/blog/vue-router-catch-all'
draft: false
tags: ['vue', 'programming']
thumbnail: ''
---

If you have been working with Vue 3 and Vue Router, you might have noticed that the way to handle catch-all routes for 404 pages has changed in Vue Router 4 compared to the previous versions.

In Vue 2 and Vue Router 3, the recommended approach to handle catch-all routes was as follows:

```js
import Vue from 'vue';
import Router from 'vue-router';
import NotFoundComponent from './NotFoundComponent.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    // Your other routes
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
});

export default router;
```

In this approach, the "NotFoundComponent" will be rendered for any unmatched URLs. You can create a dedicated component to display a custom "404 Not Found" page or handle the situation according to your application's requirements.

It's important to note that in this version, the catch-all route should be defined as the last route in your route configuration. Vue Router will match routes in the order they are defined, and the catch-all route acts as a fallback for any unmatched routes.

However, with the introduction of Vue Router 4, a [breaking change](https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes) was made that requires a different approach for catch-all routes. The change was implemented to improve flexibility and allow more control over the routing configuration.

To handle catch-all routes in Vue Router 4 with Vue 3, you need to follow the updated approach:

```js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // Your other routes
  {
    path: '/:catchAll(.*)*',
    component: NotFoundComponent
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

```

In Vue Router 4, when a URL is a match against the routes, the router will look for the first route that matches the URL pattern, regardless of its position in the routes array. If a route matches, the associated component will be rendered, and the router will stop searching for further matches.

The main change is in the definition of the catch-all route itself. Instead of using <code>**path: '*\'**</code>, we now use <code>**path: '/:catchAll(.\*)\*'**</code> to define a dynamic segment named catchAll. This segment is then assigned the value of `(.\*)\*`, which matches any number of characters and slashes.

It's important to note that the catch-all route does not necessarily need to be the last property in the routes array in Vue Router 4. Unlike in Vue Router 3, the order of routes in Vue Router 4 is not significant for matching.

However, it is generally recommended to place the catch-all route as the last route in the routes array to ensure that it acts as a fallback for unmatched routes. Placing it at the end makes it easier to manage and understand the routing configuration.

Remember to adjust the NotFoundComponent to match your own component or page that should be displayed when a route doesn't match any other defined routes.
