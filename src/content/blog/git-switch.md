---
title: Using Git Switch to Move Changes to a New Branch
date: 2023-02-02
description: 'How to move changes from a branch to another branch using Git Swtich'
slug: 'git-switch'
path: '/blog/git-switch'
draft: false
tags: ['git', 'programming']
lastmod: false
thumbnail: '/images/git-switch/cover.png'
---

Imagine a typical workday where you open your laptop, ready to dive into your tasks. You scan through the task board, check the assignments, and select one to start working on.

As you progress through the task, you devise a solution and begin writing the code. Suddenly, you realize a major problem: you forgot to switch to a new branch before making changes. You've unintentionally modified the `main` branch or some other important branch where you shouldn't have made any changes. Panic sets in as you realize you've already written hundreds of lines of code, and undoing those changes seems daunting.

Fortunately, there is a solution to this common predicament using the `git switch` command. It is a command introduced in Git version 2.23 in 2019. Its purpose is to provide a more intuitive and user-friendly alternative to the well-known git checkout command.

To switch from the `main` branch to a new branch, simply execute the following command:

```bash
git switch -c "<new branch>"
```

Here, `<new-branch-name>` is a placeholder for the desired name of your new branch. For instance, if you want to create a branch called `feat/add-new-color`, you would run:

```bash
git switch -c "feat/add-new-color"
```

When you press enter, Git will create a new branch named `feat/add-new-color` with all the changes you've made up to that point. The `main` branch will remain untouched, without any modifications.

It's important to note that if you have already committed changes to the main branch, those changes will still exist in both the new branch and the main branch. Therefore, you will still need to clean up the main branch by reverting or amending the commits, or creating a new commit that removes the unintended changes.

By utilizing the `git switch` command, you can avoid accidentally modifying the wrong branch and keep your version control history clean and organized.
