---
title: 'Git Tip: How to Easily Switch to Your Last Known Branch'
description: ' Discover a handy Git tip that allows you to effortlessly switch back to your last known branch without remembering its name'
pubDate: 2023-02-16
slug: 'git-checkout'
path: '/blog/git-checkout'
draft: false
tags: ['git', 'programming']
thumbnail: ''
---

As a developer working with Git, it's common to switch between different branches while working on multiple features or fixing bugs. Sometimes, you may find yourself in a situation where you need to switch back to the last branch you were working on, but you can't quite remember its name.

To solve this, you would typically list your current local branches using the command:

```bash
git branch
```

This command displays a list of branches available in your repository.

1. Find the branch you want to switch back to from the list and note its name.
1. Use the checkout command to switch to the desired branch:

```bash
# Replace <branch-name> with the name of the branch you want to switch to.
git checkout <branch-name>
```

Fortunately, Git provides a handy shortcut; the `git checkout -` command.

## Using git checkout -

The `git checkout -` command is a shortcut that allows you to switch to the last known branch you were working on. It essentially performs a checkout operation on the branch you were on before the current branch. Let's see how it works in practice:

1. Open your terminal or command prompt and navigate to your Git repository.

1. Ensure that you have uncommitted changes in your current branch. If you have any uncommitted changes, either commit them or stash them before proceeding. Alternatively, you can discard the changes if they are no longer needed. Use `git status` to check the status of your working directory.

1. Run the following command:

```bash
git checkout -
```

This command instructs Git to switch to the last known branch you were working on. Git will now perform the checkout operation, and you will see the output indicating that you have switched to the desired branch.

It's important to note that this command only switches to the last branch you were working on before your current branch, regardless of how many branches you have.

Please keep in mind that if you haven't switched branches yet in your repository, running `git checkout -` will result in an error since there is no previous branch to switch to. Therefore, ensure that you have switched branches at least once before using this command.

By using `git checkout -`, you can quickly navigate back to the branch you were previously working on without the need to remember or search for its name. This can save you time and make your development workflow more efficient.
