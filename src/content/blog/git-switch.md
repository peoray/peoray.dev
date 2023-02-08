---
title: Using Git Switch to move changes to a new branch
date: 2023-02-16
description: 'How to move changes from a branch to another branch using Git Swtich'
slug: 'git-switch'
path: '/blog/git-switch'
draft: false
tags: ['git', 'programming']
lastmod: false
thumbnail: '/images/git-switch/cover.png'
---

Imagine a typical day, you open your laptop ready to work, you look through the tasks board, check the ones assigned to you and pick one to start with.

After running through the issue, you come up with a solution and start to write the code for it. Suddenly, you realize there is a problem, you didn't checkout to a new branch before starting and have been making changes in the `main` branch or some other important branch you are not suppose to make changes to. At this point, you've probably written 100s LOC and you can't imagine undoing the changes you've made already.

I was in this exact scenario recently. Thankfully, after some googling, I came across [git switch](https://git-scm.com/docs/git-switch). It is a command that came out in 2019 in git 2.23. It was introduced to eventually provide a better interface for the well-known git checkout.

If we want to switch from the `main` branch to a new branch, all we have to to do is run:

```bash
git switch -c "<new branch>"

# <new branch> is a placeholder what whatever you want to name your branch

git switch -c "feat/add-new-color"

```

When you press enter, a new branch named `feat/add-new-color` will be created with the changes you've saved. The main branch will go back as it is without the changes. If you run `git status` on the main branch, you'll see that no changes have been made.

For clarity, if you already committed to main, those changes are both in your new branch and in main. So you still have to clean up the main branch.
