---
id: deploy-from-github
title: Deploy from GitHub
sidebar_label: Deploy from GitHub
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Nimbella gives you the ability to deploy your applications and serverless functions that are on your GitHub.

To indicate you want to deploy from GitHub, use a project path that starts with one of the following.

```yaml
github:
git@github.com:
https://github.com/
```

The deployer supports all three prefix styles to align with developer habits and URLs copied from elsewhere: all three are equivalent and authenticate to GitHub in the same way.

### Specifying what you want from GitHub

The process is similar to how you normally deploy your code. You start by running `nim project deploy` in your command prompt. But instead of providing the local folder path, you provide the link for GitHub.

You follow the prefix with the “owner” (GitHub account), repository, the path to the project within the repository (if any), and specific branch or commit (if not `master`). For example,

```
nim project deploy git@github.com:/my-account/my-repo-with-project/#dev
```

To test what it's like to deploy an app from GitHub, run this command to deploy the [Page Visits demo app](https://github.com/nimbella/demo-projects/tree/master/visits).

```
nim project deploy github:nimbella/demo-projects/visits
```

After you run the command, copy and paste your DNS domain into your browser (`<namespace>-host.nimbella.io`).

<img alt="Docusaurus with Keytar" src={useBaseUrl('/static/img/deploy-with-github-visits.gif')} />
