---
id: commands
title: Nim Commands
sidebar_label: Nim Commands
---

## nim command overview

The Nimbella Command Line Tool (nim) is your primary portal to Nimbella services. Typing `nim` at a command prompt produces the latest version of help output, similar to the following.

```
> nim
A comprehensive CLI for the Nimbella stack

VERSION
  nimbella-cli/0.1.15 darwin-x64 node-v13.12.0

USAGE
  $ nim [COMMAND]

COMMANDS
  action      work with actions
  activation  work with activations
  auth        manage Nimbella and GitHub credentials
  doc         display the full documentation of this CLI
  help        display help for nim
  info        show information about this version of 'nim'
  key-value   work with key-value store
  namespace   work with namespaces
  objects     work with objects store
  package     work with packages
  project     manage and deploy Nimbella projects
  route       work with routes
  rule        work with rules
  trigger     work with triggers
  update      update the nim CLI
  web         work with web contents
  workbench   open Nimbella workbench with login or command
```

These commands fall into four categories, described in the following sections.

**Note:** In some of the help output from `nim` (as shown) there are colon separators between parts of the command.  This happens because nim is based on [oclif](https://github.com/oclif), the Open CLI Framework from Heroku, which requires them. However, nim has logic to allow blank separators, so you can also use these commands with blank separators, as in these examples:

```
> nim auth list
> nim project deploy
```

If you find a case in which a blank separator doesn't work in nim, please [report it as an issue](https://github.com/nimbella/nimbella-cli/issues) or use a colon separator.


### 1 Credential management to access Nimbella namespaces

The `auth` subtree lets you manage Nimbella credentials for Nimbella _namespaces_, as described in the section [Nimbella Namespaces](namespaces.md).

The `nim auth` subtree has its own set of commands, as follows.

```
> nim auth
manage Nimbella and GitHub credentials

USAGE
  $ nim auth:COMMAND

COMMANDS
  auth:current  Get current namespace with optional details
  auth:export   Make a token for switching to another machine or web browser
  auth:github   manage GitHub accounts
  auth:list     List all your Nimbella namespaces
  auth:login    Gain access to a Nimbella namespace
  auth:logout   Drop access to a Nimbella namespace
  auth:switch   Switch to a different Nimbella namespace
```


### 2 Project-level deployment commands

The `nim project` subtree has three commands:

*   `create`
*   `deploy`
*   `watch`

These subcommands operate on logical groupings of resources (web content, storage, and APIs) that make up typical applications. Such a grouping is called a _project_ and is described more in [About Nimbella Projects](deployer-overview.md).

The `project:deploy` command controls the Nimbella _deployer_, which operates on projects. Much of the rest of this document concerns itself with projects and the deployer.

Help output for the `nim project` command:

```
> nim project
manage and deploy Nimbella projects

USAGE
  $ nim project:COMMAND

COMMANDS
  project:create  Create a Nimbella Project
  project:deploy  Deploy Nimbella projects
  project:watch   Watch Nimbella projects, deploying incrementally on change
```

Help output for the `nim project create` command:

```
> nim project create
Create a Nimbella Project

USAGE
  $ nim project:create [PROJECT]

ARGUMENTS
  PROJECT  project path in the file system

OPTIONS
  -c, --clientCode                           Generates client code
  -i, --id=id                                API specs id/name/path
  -k, --key=key                              Key to access the source API
  -l, --language=go|js|ts|py|java|swift|php  [default: js] Language for the project (creates sample project unless source is specified)
  -o, --overwrite                            Overwrites the existing nimbella project directory if it exists
  -s, --source=postman|openapi               API specs source
  -u, --updateSource                         Sync updated API specs back to source
  -v, --verbose                              Greater detail in error messages
  --config                                   Generate template config file
  --help                                     Show help
```

See the [Example: Create and deploy a project with a single action](single-action-example.md) for an example of using the project create command.

Help output for the `nim project deploy` command:

```
> nim project deploy
Deploy Nimbella projects

USAGE
  $ nim project:deploy [PROJECTS]

ARGUMENTS
  PROJECTS  one or more paths to projects

OPTIONS
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host to use
  --auth=auth            OpenWhisk auth token to use
  --env=env              path to environment file
  --exclude=exclude      project portions to exclude
  --help                 Show help
  --include=include      project portions to include
  --incremental          Deploy only changes since last deploy
  --insecure             Ignore SSL Certificates
  --target=target        the target namespace
  --verbose-build        Display build details
  --verbose-zip          Display start/end of zipping phase for each action
  --web-local=web-local  a local directory to receive web deploy, instead of uploading
  --yarn                 Use yarn instead of npm for node builds

```

See the [Example: Create and deploy a project with a single action](single-action-example.md) for an example of using the project deploy command.

Help output for the `nim project watch` command:

```
> nim project watch
Watch Nimbella projects, deploying incrementally on change

USAGE
  $ nim project:watch [PROJECTS]

ARGUMENTS
  PROJECTS  one or more paths to projects

OPTIONS
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host to use
  --auth=auth            OpenWhisk auth token to use
  --env=env              path to environment file
  --exclude=exclude      project portions to exclude
  --help                 Show help
  --include=include      project portions to include
  --insecure             Ignore SSL Certificates
  --target=target        the target namespace
  --verbose-build        Display build details
  --verbose-zip          Display start/end of zipping phase for each action
  --web-local=web-local  a local directory to receive web deploy, instead of uploading
  --yarn                 Use yarn instead of npm for node builds
```

See [Project watching](deployer-features.md#project-watching-for-incremental-deployment) for an example of how to use this command for incremental deployment which facilitates faster project development.

### 3 Entity management commands

The `action`, `activation`, `key-value`, `namespace`, `objects`, `package`, `route`, `rule`, `trigger`, and `web` commands each manage the corresponding type of entity in your namespace.

If you’re an [Apache OpenWhisk](https://openwhisk.apache.org) developer, see [Entity Management commands in nim vs. wsk](nim-vs-wsk.md#entity-management-commands-in-nim-vs.-wsk) for a comparison of entity management commands.


### 4 Supporting commands

The `doc`, `help`, `info`, `update`, and `workbench` commands provide the following supporting services:

*   `doc`: Displays the documentation set for the nim CLI.
*   `help`: Displays help for nim.
*   `info`: Displays information about the version of nim that is installed.
*   `update`: Updates to the latest version of nim.
*   `workbench`: Manages the Nimbella Workbench for you.

The Nimbella Workbench is described in [The Nimbella Workbench](workbench.md)

**Note:** `nim update` works only when nim is installed [using the recommended installation method for use from a shell](install.md#install-nim-for-shell-invocation-globally). It does not work when nim is installed [as a dependency using npm or yarn](install.md#install-nim-as-a-dependency).
