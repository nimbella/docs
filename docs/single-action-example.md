---
id: single-action
title: Single Action Example
sidebar_label: Single Action Example
---

## Example: Create and deploy a project with a single action

Let’s start with a really simple example that shows the basics of creating the source code for an action, placing it in a directory structure for a project, and deploying the project. This project needs no configuration and creates actions automatically based on the project directory structure.

In the simplest implementation of a project, each action corresponds to a single source file. In this example:

*   A `Hello World` print function is placed in a file named _hello.js_.
*   A project named `example1` is created and deployed to your namespace.

**To create and deploy a project to print Hello World (simplest form):**

```
> nim project create example1
> nim project deploy example1
Deploying project '/path/to/example1'
  to namespace '...'
  on host 'https://...nimbella.io'
Deployment status recorded in 'example1/.nimbella'

Deployed actions:
  - hello
> nim action invoke hello
{
  "greeting": "Hello stranger!"
}
```
So, what just happened?  As a result, of `nim project create`, `nim` generated a project and added a sample to it called `hello.js`.  Specifically, in your current directory, it created

```
example1/packages/default/hello.js
example1/web
```

We address the purpose of the `web` directory in [Adding static web content](web-content.md) and the `packages` directory later in this section.

As a result of `nim project deploy`, the project was deployed to your namespace and the result was an action called `hello`.  To record the status of that deployment, `nim` created

```
example1/.nimbella/...
```

The `nim action invoke` step invoked the just-deployed action.

THe `nim project create` command has some other features that will come up in other examples.  But, `nim project create` is only a convenience.

To make the process less magical and more hands-on, remove the entire `example1` from your local filesystem and let's start over, without using `nim project create`, emphasizing that a Nimbella project, no matter how it is created and modified, is just an area in your local file system.

**Create and deploy a project to print Hello World (more manually):**

(1) Create _hello.js_ with the following code:

```nodejs
function main(args) { return { msg: 'Hello World' } }
```

(2) Create a project directory with the following command:

```
> mkdir -p example1/packages/demo
```

The [project directory structure](projects.md) sets the name of the project (`example1`), a _packages_ directory, and the package qualifier (`demo`).  There is no `web` directory this time; `web` is not required if you aren't adding web content.

(3) Copy the JavaScript file into the `demo` directory with the following command.

```
> cp hello.js example1/packages/demo
```

(4) Deploy the project.

```
> nim project deploy example1
Deploying project '/path/to/example1'
  to namespace '...'
  on host 'https://...nimbella.io'

Deployed actions:
  - demo/hello
```

(5)  Invoke the deployed action.

```
> nim action invoke demo/hello
{
  "msg": "Hello World"
}
```

Here’s a diagram of the project structure that was created in this procedure.

<center id="fig2"><img src="./fig2-nim-example1-project-directory-structure.svg" height="300"/></center>
<center>**Figure 1: Directory structure of the example1 project**</center>

**Notes:**

*   The `project deploy` command activates the deployer, which names the action automatically based on the source code file (`hello`), prepended by the package qualifier (`demo`).
*   If you want an action to have a simple name (no package qualification), put it in a package directory called _default_. In that case, no package qualifier is prepended. See [Project Directory Structure](projects.md).  When `nim` generates a sample in `nim project create` it uses this feature.
*   The correct runtime for the source code file is determined according to the file suffix.  The command `nim info --runtimes` will list the supported runtimes.  At this time, the list does not include file suffixes.  See [Nimbella Deployer Supported Runtimes for Actions](deployer-features.md#nimbella-deployer-supported-runtimes-for-actions) for a list that includes suffixes.
*   Project configuration occurs automatically when it can, but see [Adding Project Configuration](configuration.md) for complex projects.

**Next steps:**

*   To add web content to your project, see [Adding static web content](web-content.md).
*   If you need to add build steps, see [Incorporating build steps for actions and web content](building.md).
*   Read more about [deploying projects](deployer-features.md).
*   Look at a somewhat more complex [example QR code project with both an action and static web content](https://github.com/nimbella/demo-projects/tree/master/qrcode).
