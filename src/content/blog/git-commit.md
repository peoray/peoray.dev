---
title: How to Modify your Last Commit with Git Amend
description: Learn how to modify your last commit using the Git Amend command.
pubDate: 2023-04-27
lastmod: 2025-04-27
slug: 'git-commit-amend'
path: '/blog/git-commit-amend'
draft: false
tags: ['git']
thumbnail: ''
---

If you're like me, you're probably using git every day in your work. Chances are that when making commits for work done, you realize you misspelt something in the Git commit message. Or maybe you need to make a change to another file that really should be part of that commit.

Fortunately, Git provides the `git amend` command that allows you to make changes to the most recent commit in your repository.
We'll take a look at some of the commands and scenarios that I have encountered.

## Modifying Commit Messages

To modify the last commit message, you can use the following command:

```bash
git commit --amend
```

This will open up your default editor (Vim or nano) and allow you to edit the message. This will replace the last commit with a new one with the new message.

Alternatively, you can set the commit message directly in the command line without opening up the editor:

```bash
git commit --amend -m "New Message"
```

Adding the `-m` option allows you to pass in a new message from the command line without being prompted to open an editor.
It is suitable for committing short messages as titles. If your commit message is multi-line or contains a body as a description, the first option is better as it opens the editor to modify the entire message.

Make sure you don't have any working copy changes staged before doing this or they will get committed too (unstaged changes will not get committed).

## Adding New Changes to an Existing Commit

What if you don't want to change the commit message, but just want to add a new file or make changes to the commit?

To amend a commit to only include new changes in the CLI, you will first need to stage any changes from your working directory that you want in the new commit.

```bash
git add . # to stage current changes you want to add
git add file.txt # if you just want to add a particular file/folder, whatever the case may be
```

> Note: This can also include changes to existing files that you have already committed.

To include new changes without altering the commit message, use:

```bash
git commit --amend --no-edit
```

The `--no-edit` flag enables amending the commit without modifying its message. The resulting commit will replace the incomplete one.

To solely modify the commit message without altering the commit itself, use the `--only` flag or its shortcut `-o` with `commit --amend`:

```bash
git commit --amend -o -m "New commit message"
```

This will only update only the commit message but disregards any already staged changes.

## Important Notes

However, keep two important details in mind:

1. `git ammed` only works with the very last commit. If you notice your mistake only after adding another commit, it won't help you much.

1. It rewrites the commit history in your repository, creating a completely new commit object. Consequently, avoid amending commits that have already been published to a remote repository. Altering these commits might disrupt your colleagues who have based their work on them.

Therefore, use `git amend` whenever you want to modify your very last and unpushed commit.
