---
id: nim-creating-project
title: Creating your project
sidebar_label: Creating your project
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Creating your project template with the Nimbella CLI

With the Nimbella CLI, you can create a project template that you can use to instantly start building your project.

To create a project template, run this command in your command prompt:

```shell
nim project create <project-name>
```

After running this command in your command prompt, you will see a message stating your project is now available.
The message is similar to the following text, with your chosen project name replacing the placeholder `<project-name>` shown below.

```
A sample project called '<project-name>' was created for you.
You may deploy it by running the command shown on the next line:
  nim project deploy <project-name>
```

### Creating a YAML file for your project

**NOTE**: What makes Nimbella standout is that you don't need a YAML file for most simple projects. But if you want to customize specific things you are deploying, you can build a `.yml` file for it.

To generate a `.yml` file when you create a project. Run the command:

```shell
nim project create folder_name --config
```

The `--config` flag tells the CLI to generate a `.yml` template you can use for your project. You should see this template inside of your project folder:

```yaml
targetNamespace: ''
cleanNamespace: false
bucket: {}
parameters: {}
environment: {}
packages:
  - name: default
    shared: false
    clean: false
    environment: {}
    parameters: {}
    annotations: {}
    actions:
      - name: hello
        clean: false
        binary: false
        main: ''
        runtime: 'nodejs:default'
        web: true
        webSecure: false
        parameters: {}
        environment: {}
        annotations: {}
        limits: {}
```

### Basics of the project structure.

After creating the project folder, you'll see that it contains two folders. A `web` folder to add directories and files with static web content and a `packages` folder to create serverless functions.

[Click here to learn more about the project structure you just created.](https://github.com/nimbella/docs/blob/master/docs/projects.md)
