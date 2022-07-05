# Contributing Guide

Welcome to keepsecrets, In this project we aim to build a product that allows to share secrets in a safe way.

Born out of the need to share sensitive information during the quarantine of 2020, this project aims to become one of the best ways to share secrets.

This document describes our development process. Following these guidelines shows that you respect the time and effort of the developers managing this project. In return, you will be shown respect in addressing your issue, reviewing your changes, and incorporating your contributions.

> Please, don't use the issue tracker for support questions. Instead use: Discord, Twitter or email

**Table of Contents:**

1. [Code of Conduct](#code-of-conduct)
2. [Important Resources](#important-resources)
2. [Questions](#questions)
3. [Feature Requests](#feature-requests)
4. [Reporting Bugs](#reporting-bugs)
5. [Contributing Code](#contributing-code)
    1. [Getting Started](#getting-started)
    1. [Development Process](#development-process)
    1. [Testing](#testing)
    1. [Style Guidelines](#style-guidelines)
    1. [Code Formatting Rules](#code-formatting)
    1. [Whitespace Cleanup](#whitespace-cleanup)
1. [Pull Request Guidelines](#pull-request-process)
    1. [Review Process](#review-process)
    1. [Addressing Feedback](#addressing-feedback)
1. [Community](#community)


## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct][0]. We expect all contributors to follow the [Code of Conduct][0] and to treat fellow humans with respect.


## Important Resources

* Project: https://github.com/orgs/keep-secrets/projects/1

## Questions

Any questions regarding keepsecrets can be asked in different places, twitter, discord or email are the preferred ones.

Please avoid using issues as a discussion forum.

## Feature Requests

Provide information on the process for requesting new features. Do you have a specific label that should be applied? Is sign-off needed?

If you have a road map, goals, works in progress, or a development philosophy, make sure to share the information. Try to make sure that users have enough information to evaluate whether a feature request is appropriate for your project up front. Examples:

> Please create a new GitHub issue for any major changes and enhancements that you wish to make. Please provide the feature you would like to see, why you need it, and how it will work. Discuss your ideas transparently and get community feedback before proceeding.

> Major Changes that you wish to contribute to the project should be discussed first in an GitHub issue that clearly outlines the changes and benefits of the feature.

> Small Changes can directly be crafted and submitted to the GitHub Repository as a Pull Request. See the section about Pull Request Submission Guidelines, and for detailed information the core development documentation.

## Reporting Bugs

**If you find a security vulnerability, do NOT open an issue. Email girlazote@gmail.com instead.**

Ask contributors to check before filing a new issue. Also, provide any references to FAQs or debugging guides that you might have.

> Before you submit your issue, please [search the issue archive][6] - maybe your question or issue has already been identified or addressed.

Tell contributors how to file a useful bug report. What information do you need? (e.g. version, architecture, log files, expected behavior, observed behavior).

> If you find a bug in the source code, you can help us by [submitting an issue to our GitHub issue tracker][6]. Even better, you can submit a Pull Request with a fix.


## Contributing Code

This section is used to get new contributors up and running with dependencies, development, testing, style rules, formatting rules, and other things they should know.

If you have a label for beginner issues, talk about that here so they know where to look:

> Unsure where to begin contributing to Atom? You can start by looking through these beginner and help-wanted issues: Beginner issues - issues which should only require a few lines of code, and a test or two. Help wanted issues - issues which should be a bit more involved than beginner issues.

Working on your first open source project or pull request? Here are some helpful tutorials:

* [How to Contribute to an Open Source Project on GitHub][2]
* [Make a Pull Request][3]
* [First Timers Only][4]

### Getting Started

Some requirements are necessary to run the code and some are necessary.:
- node.js 14.0.0 or higher
- npm 8.0.0 or higher
- docker 4.0.0 or higher

In order to execute the project, the easiest way is, without a doubt, to execute the following commands:
```
git clone <project>
cd <project>/src && npm install && cd ..
docker-compose up
```

### Development Process

In order to start the development of any new feature that is in the project, the first thing to do is to find something available on the keepsecrets organisation's github project.

Once we find an available task, let's imagine that the ticket is called **"delete old secrets"**, we create a branch from main with the following naming.

```
git checkout -b feature/delete-old-secrets
```

> From then on the development has to follow the style guide set out in the code and follow the principles of the clean architecture.


### Testing

If you add code you need to add tests! We’ve learned the hard way that code without tests is undependable. If your pull request reduces our test coverage because it lacks tests then it will be rejected.

All functionalities must be tested at least on a unitary basis.

### Style Guidelines

Our style guide is given by eslint, with the google preset, to check if your code passes the style guide check enter the following command, in the project
```
npm run lint
```
If some errors appear, you can try automatic linting.
```
npm run lint -- --fix
```
If errors still occur, they must be corrected manually.

### Code Formatting

For the moment nothing to add here, the style guide is enough.

### Whitespace Cleanup

Don’t mix code changes with whitespace cleanup! If you are fixing whitespace, include those changes separately from your code changes. If your request is unreadable due to whitespace changes, it will be rejected.

> Please submit whitespace cleanups in a separate pull request.

### Git Commit Guidelines

Commits are something personal. Merge commits are something else, that definition will be given in the pull request process.

## Pull Request Process

All pull requests must comply with the following.

- The merge commit has to be named the same as the branch, in order to be able to find the ticket faster and to know what should be done.
- In the merge commit description you have to specify what has been done and how it has been tested.
- Before merging: the entire branch must be rebased with main.
- Before merging: the whole branch must be squashed.
- The PR cannot be merged if there are unresolved issues.

### Review Process

The main focus of the code review should be on a few very specific points.
- Create the code as semantic as possible.
- Follow clean architecture guide lines
- Test everything

Comments must be left based on a category, there are 3 types of comments.
- Green: Code suggestions, do not have to be applied.
- Yellow: Something goes against the guidlines and the change must be enforced.
- Red: Something is so wrong, that the work must be permanently blocked and a conversation about what has been done must be held.

## Community

- Discord: [Discord](https://discord.com/invite/mAFY5GsK7z)
- Twitter: [GiRLaZoTe](https://twitter.com/girlazote)
- Email: girlazote@gmail.com

