---
id: deployer-specification
title: Deployer Specification
sidebar_label: Deployer Specification
---

## The Nimbella Deployer Specification and Reference

The _Nimbella Deployer_ is the component you run when you use [`nim project deploy`](nim-cmds/project.md#nim-project-deploy-projects) or [`nim project watch`](nim-cmds/project.md#nim-project-watch-projects).   Its purpose is to take a [_project_](projects.md) (a set of resources on local disk or in GitHub) and deploy it to a [_namespace_](namespaces.md) (a set of resources in the cloud, comprising all or part of your cloud application).

This specification covers the behavior of the deployer with emphasis on completeness and accuracy.  For "how to" information, and conceptual overviews, consult the other documentation under the **Nimbella Project** heading in the sidebar.

## Contents

- [Project location](#project-location)
- [How project contents are determined](#how-project-contents-are-determined)
- [Determining the target namespace](#determining-the-target-namespace)
- [What parts of a project are deployed](#what-parts-of-a-project-are-deployed)
- [Actions](#actions)
    - [Actions and Packages](#actions-and-packages)
    - [Single-file actions](#single-file-actions)
    - [Multi-file actions, build steps, and including artifacts from elsewhere](#multi-file-actions-build-steps-and-including-artifacts-from-elsewhere)
    - [Actions in the project configuration](#actions-in-the-project-configuration)
    - [Action properties](#action-properties)
        - [Runtime](#runtime)
        - [Main entry point](#main-entry-point)
        - [Binary versus text](#binary-versus-text)
        - [Annotations (general)](#annotations-general)
        - [Annotations handled specially](#annotations-handled-specially)
            - [The `web` property](#the-web-property)
            - [The `webSecure` property](#the-webSecure-property)
            - [The `deployer` annotation](#the-deployer-annotation)
        - [Parameters and Environment](#parameters-and-environment)
        - [Limits](#limits)
        - [Overwriting existing actions](#overwriting-existing-actions)
        - [Local versus remote building](#local-versus-remote-building-actions)
    - [Sequences](#sequences)
    - [Package properties](#package-properties)
        - [Granting shared access to a package](#granting-shared-access-to-a-package)
        - [Package annotations](#package-annotations)
        - [Parameters and Environment for a package](#parameters-and-environment-for-a-package)
        - [Ensuring a clean start for a package](#ensuring-a-clean-start-for-a-package)
        - [Setting the web property for all actions of a package](#setting-the-web-property-for-all-actions-of-a-package)
- [Web content](#web-content)
    - [Web content in the project tree](#web-content-in-the-project-tree)
    - [Web content in the project configuration](#web-content-in-the-project-configuration)
    - [Web content properties](#web-content-properties)
        - [Inserting and dropping path segments in every URL](#inserting-and-dropping-path-segments-in-every-url)
        - [Setting the main and error pages](#setting-the-main-and-error-pages)
        - [Ensuring a clean start for web content](#ensuring-a-clean-start-for-web-content)
        - [Controlling CDN cacheing behavior](#controlling-cdn-cacheing-behavior)
        - [Local versus remote building](#local-versus-remote-building-web)
- [Setting Global Properties](#setting-global-properties)
    - [Setting the target namespace for a project](#setting-the-target-namespace-for-a-project)
    - [Ensuring a clean start for a project](#ensuring-a-clean-start-for-a-project)
    - [Parameters and Environment for all packages](#parameters-and-environment-for-all-packages)
- [Information links](#information-links)

## Project location

The _location_ of a project is given by a path argument to `nim project deploy` or `nim project watch`.  It is either a location in your local file system, or location in the GitHub repository manager.

- A path is is a GitHub path if it starts with `git@github:`, `https://github.com/` or `github:`.
- A path is a file system path otherwise.
- Either kind of path may be illegal if it does not resolve to a location that contains a Nimbella project.

A GitHub path can take a number of forms (for details you are referred to [the code](https://github.com/nimbella/nimbella-cli/blob/c0f601b7266d3d8e7bbbf0c274659fee160f654b/deployer/src/github.ts#L64).  The deployer identifies the form and parses the path into

- the _organization_
- the _repository_
- the _path_ (within the repository)
- (optionally) the _commit_ or branch (default master or main)

There are actually three kinds of location.

- A _GitHub location_ is a location denoted by a GitHub path
- A _git-controlled location_ is a location denoted by a file system path but where the path falls within the working tree of a repository clone
- An _uncontrolled location_ is a location denoted by a file system path that does not fall within the working tree of a repository clone.
 
A project also has an _identity_, used in many messages and in enforcing [project ownership of namespaces](tieing-namespaces-to-projects.md).  

- For both GitHub locations and git-controlled locations, the identity of the project is given by a GithHub repository and a path within that repository (for a git-controlled location the repository is the origin remote).
- For uncontrolled locations, the identity is the file system path

Note that when the identity of a project is the same but the location differs, the contents of the project may differ, because different developers may have different local modifications to the project contents.

## How project contents are determined

Logically, the contents of a project consists of _actions_ (organized into _packages_) and _web content_.  

- The logical contents are represented via physical artifacts as summarized in this section.  
- The section entitled [Actions](#actions) provides details on actions to be deployed as part of a project.
- The section entitled [web content](#web-content) provides details on web content to be deployed as part of a project.

Because the deployer runs [build steps](building.md) in certain directories of a project, it is useful to distinguish a project's _initial contents_ (prior to running the build steps) from its _deployable contents_ (determined after the build steps have run).  

The initial contents are determined from the following

- The directory and file structure of the project (herein called the _project tree_).  This structure is described in [project directory structure](projects.md#project-directory-structure).
	- Certain files and directories within the project tree are excluded as a consequence of their position in the tree as described in the companion document.
- Information in a project-wide configuration file [`project.yml`](configuration.md) stored in the root of the project (and herein called _project configuration_).
    - Project configuration is often optional because almost everything it can specify has a default, which is used when it is absent.  
- An optional global exclusion file, `~/.nimbella/.exclude` with patterns of files that should not be considered part of the project even though they dwell within it.  
	- The global exclusion file is specific to a developer and not affixed to the project.
	- It is intended to exclude only temporaries and backup files of editors and IDEs used as the developer's personal choices.
	- Certain file name patterns are excluded by default and do not have to be specified.  For this table you are referred to [the source code](https://github.com/nimbella/nimbella-cli/blob/51e8b56bd8b70442ab34b846e102a35772b58fe8/deployer/src/util.ts#L38).

The deployable contents are derived from the initial contents by the following.

- The effects of [build steps](building.md) run on each action and the web content when build indicators appear in the project tree.
- Files named `.include` or `.ignore` if found within action or web directories (after building, or if no build is specified for that directory).  
    - The use of `.include` and `.ignore` for actions is described in the [About actions](actions.md) document.  The behavior for web content is the same.

## Determining the target namespace

There are three ways that the target namespace for a deployment can be established.

- Via the `--target` flag on the command line.  This has highest precedence.
- Via a `targetNamespace` property in `project.yml`.
- By consulting your "current namespace."  This is the value returned by `nim auth current`.  It has lowest precedence.

A project may own a namespace, prohibiting other projects from deploying to it, as described in [Tieing Namespaces To Projects](tieing-namespaces-to-projects.md).  When ownership is in force, the deployer may reject the value of the `--target` flag, or `targetNamespace` property in `project.yml`, or the setting of the "current namespace", if that value would violate the ownership rules.

## What parts of a project are deployed

There are three basic ways to deploy a project to a namespace.

1. With `nim project deploy` not specifying the `--incremental` flag.  This always deploys the entire project, except as modified by `--include` or `--exclude` as described below.
2. With `nim project deploy --incremental`.  This deploys the parts of the project that appear to have changed.
3. With `nim project watch`.  This watches the project in the filesystem and runs the equivalent of `nim project deploy --incremental` each time a change is noticed.

The portion of a project that is actually deployed is affected by the command line flags `--include` and `--exclude`.  Both of these flags accept a comma-separated list of tokens (no whitespace).  The tokens may be

- the special word `web` referring to the web content of the project
- the name of a package
  - if the package is called `web`, you should remove ambiguity by using a trailing slash as in `web/` (a trailing slash is accepted on any package)
  - the package name `default` is used for the actions that are not members of any package
- a qualified action name in the form `package-name/action-name`
  -  e.g. `printer/notify` or `default/hello`
  -  the `default/` prefix is required for actions not in any package; otherwise, the name will be taken to be a package name
- wildcards are _not_ supported

If you specify only `--include`, then only the listed project portions are deployed.  If you specify only `--exclude`, then _all but_ the listed project portions are deployed.  If you specify both flags, the deployer first includes only what is listed in `--include` and then excludes from that list.  This allows you to include a package while excluding one or more of its actions.

## Actions

The contents and deployment behavior of an action are determined from the project tree (after global exclusions) and the project configuration.

- Actions that have code (which means all actions except _sequences_) must appear in the directory and file structure.   
    - The same actions _may_ also appear in `project.yml`.
- [Sequences](#sequences) appear only in `project.yml`.

### Actions and packages

Actions may or may not be contained by packages.  In Nimbella projects, actions that are not in any package are specified as if they are in a package called `default`.

If a project has any actions at all (other than sequences) the project tree will have a top-level directory called `packages`.  Then, every action that isn't a sequence is either a _file_ or a _directory_.

### Single-file actions

If an action is a file, that file must contain its entire source.  No build step may be specified and no additional dependencies are added.  In the project tree, there will be the following.

- _path-to-project_**/packages/**_package-name_**/**_action-name_**.**_ext_

For example:

- _path-to-project_**/packages/printer/print.js**
- _path-to-project_**/packages/default/hello.js**

In the first example, the package is `printer` and the action is called `print`.   In the second example, the action is called `hello` and is not contained in a package.

It is possible for a single file action to be a zip archive (a "zipped single file action").  The deployer will set the `binary` attribute for the action and upload it.  Depending on the name of the file, it may apply special rules in determining the [runtime](#runtime).

### Multi-file actions, build steps, and including artifacts from elsewhere

If an action is anything but a single file containing all of the source, it will be expressed by a _directory_.

- _path-to-project_**/packages/**_package-name_**/**_action-name_

For example:

- _path-to-project_**/packages/printer/print**
- _path-to-project_**/packages/default/hello**

The names of the actions and packages are the same as in the single file example but, because the action is represented by a directory, it is now possible for the action source to comprise multiple files, and/or to have build steps, and/or to include material from elsewhere in the project.

### Actions in the project configuration

If the project configuration (`project.yml`, located in the root of the project) has a `packages` array, it can provide additional information about actions in the project tree.  The form of this array is as follows.

```
packages:
  - name: <package-name>
    <package-properties>
    actions:
       - name: <action-name>
         <action-properties>
```

For example

```
packages:
  - name: printer
    clean: true
    actions:
       - name: print
         web: false
  - name: default
    actions:
       - name: hello
         web: false
```

There is a variation this form for [sequences](#sequences).

### Action properties

Every property that an action can have is either specified in the project configuration, assigned a default value, or computed based on something in the project tree.  The following subsections are organized according to the specific property.

#### Runtime

The runtime to use may be specified in project configuration using the following template.

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        runtime: <runtime>
```

Valid runtimes can be learned using `nim info --runtimes`.  Some runtime "kinds" are labelled there as the default for the language.   A specific runtime kind (like `go:1.12`) may always be used or you can accept the default for a given language (`go:default` means `go:1.15` at present).

If the runtime is not specified in project configuration, then the following applies.

- If the action is a single file action, and is not a zipped single file action, the runtime is computed from its extension.  The information is taken from the incorporated OpenWhisk `runtimes.json` file, which, for Nimbella is [here](https://github.com/nimbella/nimbella-cli/blob/master/deployer/nimbella-runtimes.json).

- If the action is a zipped single file action, with the extension `.zip`, and its name contains at least two dots, then the deployer determines whether the name conforms to the pattern _action-name_**.**_runtime_**.zip**, for example `hello.nodejs-10.zip` or `hello.nodejs.zip`.  
    - If a full runtime "kind" is provided, the `:` character should be replaced by `-` as in the example.  
    - If the hyphen and version is omitted, the default runtime for the language is assumed.
    - If the runtime determined by this method is not a valid runtime, then the runtime remains unknown.
    - There are some details (since some runtime versions include dots).  You are referred to [the code](https://github.com/nimbella/nimbella-cli/blob/3bf3f77379b221f16731254d27a3c7ac2bf03eb9/deployer/src/util.ts#L660) for the subtleties. 

- If the action is a multi-file action:
    - All files in the action directory have their extensions examined using the previous rules.  A list of implied runtimes is accumulated.
    - If all files that imply a runtime agree on the runtime, then that runtime is used (some files may imply no runtime; they are "neutral").
    - If there is disagreement about the runtime, then the runtime remains unknown.

There is no final default runtime.  The runtime must be determined either from the project configuration or from the project tree by using file extensions.

#### Main entry point

The main entry point to use may be specified in project configuration using the following template.

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        main: <main-entry-point>
```

If there is no such information in the project configuration, then the main entry point is computed from the files actually comprising the uploaded action according to the rules of the particular runtime chosen (there are no universal rules).  The rules for individual runtimes are not specified here.

#### Binary versus Text

The deployer decides whether the action contents should be uploaded as binary data (using `base64` encoding) or text.  This is remembered in the action metadata and is honored when the action is loaded into a runtime container for execution.

You can specify a binary upload in the project configuration using the following template.

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        binary: true
```

(or a text upload by specifying `binary: false`).

If the binary property is not given by the project configuration, the deployer infers it as follows.

- For multi-file actions, `binary: true` is assumed since the deployer must zip the files in order to upload them.
- For single-file actions (whether zipped or not) the extension of the file is examined.
    - If the extension is `.zip` then `binary: true` is assumed.
    - If the extension is explicitly marked as binary in OpenWhisk `runtimes.json` file, which, for Nimbella is [here](https://github.com/nimbella/nimbella-cli/blob/master/deployer/nimbella-runtimes.json), then `binary: true` is assumed.
    - Otherwise, `binary: false` is assumed.

#### Annotations (general)

You can specify annotations for an action in the project configuration using the following template.

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        annotations:
          <name1>: <value1>
          <name2>: <value2>
	  ...
```

There are several commonly used annotations that can be specified more compactly and conveniently as described in [Annotations handled specially](#annotations-handled-specially).

#### Annotations handled specially

Some annotations are generated in response to properties of the action (not under `annotations:`) or by the deployer automatically.

##### The `web` property.

The `web` property of an action governs whether the action is considered a _web action_, a _raw web action_, or neither.  See [information links](#information-links) for an explanation of these terms.

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        web: true | false | raw
```

If this is not specified in the project configuration, the default is `true`: that is, actions deployed from projects are (non-raw) web actions by default.  

The `web` property translates to settings of three distinct annotations (you should not also set these annotations via the general mechanism).

- `web: true` (the default) translates to the annotations
    - `web-export: true`
    - `final: true`
    - `raw-http: false`
- `web: false` translates to the annotations
    - `web-export: false`
    - `final: false`
    - `raw-http: false`
- `web: raw` translates to the annotations
    - `web-export: true`
    - `final: true`
    - `raw-http: true`

##### The `webSecure` property

The `webSecure` property of an action adds security to a web action.  For some background see [Information Links(#information-links).

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        webSecure: true | false | <string-value>
```

- The `webSecure` property may be set to `true`, meaning that http requests directed at invoking the action must include an OpenWhisk authorization token in an `Authorization: Basic ...` header.  
- It may be set to a hard-to-guess string value which is then required in the header rather than the OpenWhisk authorization token.  
- Or it may be set to `false` (the default) if no authorization header is required.
- If it is not specified in the project configuration, the default is `false`: that is, web actions deployed from projects, by default, require no authorization.

The `webSecure` property translates directly to the `require-whisk-auth` annotation (you should not also set that annotation via the general mechanism).

##### The `deployer` annotation

The deployer itself generates an annotation and adds it to every action (and package).  Do not specify this annotation yourself using the general mechanism.  The key for the annotation is `deployer` and its value is an object with the following members.

```
repository: <GitHub path>
commit:     <8-digit-hasn>
digest:     <8-digit-hash>
projectPath: <relative-path>
user:       <user-name>
zipped:     <true | false>
```

Not all fields are present in all cases and some are set differently depending on the project location kind.

- the `digest` field is always present and is an abbreviated `sha256` digest of the action's code and metadata (or of the package's metadata).
- the `zipped` field is always present and indicates whether the action's code is a Zip archive.  This is provided for the convenience of tools, like the workbench, which display action contents.
- for a GitHub location
    - the `repository` field contains the GitHub URL of the repository
    - the `commit` is whatever was provided as the "committish" part of the GitHub path (or `master` if none)
    - the `projectPath` contains the path of the project relative to the repository root
    - the `user` is set to `cloud`
- for a git-controlled location
    - the `repository` field contains the GitHub URL of the origin remote repository
    - the `commit` is the abbreviated githash of the current head commit, with `++` appended if there are uncommitted changes
    - the `projectPath` contains the path of the project relative to the repository root
    - the `user` is set to the `user.email` property for this clone of the repository
- for an uncontrolled location
    - the `repository` and `commit` fields are omitted
    - the `projectPath` contains the absolute path of the project on the local machine
    - the `user` is set to the user name according to the OS of the local machine

#### Parameters and Environment

There are two kinds of parameters that may be passed to an action.

_Ordinary parameters_ are passed in the dictionary that the action receives as its sole argument.

_Environment parameters_ are placed in the environment of the process in which the action runs.

Both kinds are recorded as "parameters" in the metadata of the action but are distinguished by the setting of an additional property `init: true` on environment parameters.  The deployer makes a stronger distinction, using separate `parameters` and `environment` objects in the project configuration.

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        parameters:
          <ordinary-parameter-name>: <value>
          ...
        environment:
          <environment-parameter-name>: <value>
          ...
```

You can specify as many of each kind of parameter as you wish.

Because parameters often include secrets, it is useful to specify parameter values symbolically so that they are not hard-coded in the configuration.  The deployer offers several mechanisms for doing this, described in [Symbolic variables](configuration.md#symbolic-variables).

#### Limits

You can override the system default limits on 

- the action timeout
- the action memory allotment
- the action aggregate log size

The overriding limits are expressed as an object with one to three fields.

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        limits:
          timeout: <milliseconds>
          memory: <megabytes>
          logs: <kilobytes>
```

You need not specify all limits if you only wish to specify one or two.  All three of these limits must be numbers and within the range permitted by the Nimbella cloud (use `nim info --limits` to see the allowed range).  When not specified, Nimbella Cloud defaults are assumed.

#### Overwriting existing actions

When the deployer uploads an action, but that action already exists in your namespace, the new information is merged with the old.  You will notice, in this case, that the `version` property of the action will be incremented from its previous value.  The `clean` property causes the old action to be deleted first, enabling a "clean start".

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        clean: true
```

The `clean` property is ignored if the action is not being deployed (e.g. as the result of an `--include` or `--exclude` flag on the command line).

#### Local versus remote building (actions)

When an action has [build steps](building.md), the default behavior is to build in the local file system.  However, if the build is self-contained (does not depend on artifacts outside the action directory), it is possible to request that the build be done [remotely](building.md#remote-builds), in the runtime container in which the action will run.  The flag `--remote-build` is used to request this.  

Some actions may not work when built locally (due to dependence on the runtime container's architecture) or may not build when the build is done remotely (due to dependence on artifacts that are not contained in the action directory).  You can indicate these action-specific constraints in the project configuration.

The following forces a local build for a specific action (even when `--remote-build` is specified).

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        localBuild: true
```

Note that local builds are impossible when deploying from the workbench (and `--remote-build` is true by default there), so an action with this property will not deploy from the workbench.

THe following forces a remote build for a specific action even when `--remote-build` is not specified.  

```
packages:
  - name: <package-name>
    actions:
      - name: <action-name>
        remoteBuild: true
```

Note that remote builds require the target namespace to have object storage, because the remote build feature uses the object storage capabilities of the namespace to stage the inputs to the build.

For actions that can be built either locally or remotely, do not specify either property.   Let the command line option `--remote-build` govern where the build takes place (or, when deploying from the workbench, remote will be assumed).

### Sequences

A _sequence_ is an action made up of other actions.  For a conceptual overview of sequences in OpenWhisk, see [information links](#information-links).

Sequences must be specified in the project configuration only.  An error will be indicated if the project tree contains a file or directory matching an action which is declared to be a sequence in the project configuration.  You specify a sequence by listing its constituent actions.

```
packages:
  - name: default
    actions:
    - name: mySequence
      sequence:
        - utils/split
        - utils/sort
```

In the example above, the sequence `mySequence` consists of two actions from the same namespace as `mySequence`, namely `utils/split` and `utils/sort`.  It is possible to refer to sequences in other namespaces as well, using the syntax `/<namespace>/<action>` or `/<namespace>/<package>/action`.  The following notes apply.

1. The order in which actions are listed in the project configuration (whether sequences or not) does not matter.
2. Actions may appear multiple times in the same sequence: they will be executed multiple times when the sequence executes.
3. Sequences may incorporate other sequences, either in the same project or not, but a sequence may not incorporate itself, either directly or indirectly.  The deployer will detect cycles amongst the sequences being deployed at the same time and will abort the deployment.  Otherwise, the cycle will be detected by the Nimbella platform and the deployment will fail in a different way.
4. If a sequence incorporates actions that are not being deployed at the same time, it is up to you to ensure that they were _previously_ deployed.  Otherwise, deployment of the sequence will fail.
5. If a sequence incorporates actions that are in the _same namespace_ as the sequence, but are not being deployed at the same time, you will get an initial warning, after which the previous note applies.
    - This case seems likely to represent an error, but you may have good reasons to deploy the namespace from multiple projects.

### Package Properties

Certain aspects of deployment may be controlled at the package level rather than on individual actions.

```
shared: <boolean>
annotations: <object>
parameters: <object>
environment: <object>
clean: <boolean>
web: <true | false | raw > 
```

These properties can only be specified on "real" packages (with a name other than `default`).   The "default" package does not exist as such.  It is just a convention for denoting actions that are not contained in any package.

#### Granting shared access to a package

Normally, in order to invoke the "non-web" (`web: false`) actions of the package, the authorization header for the request must specify the same value as was used to create the action (this will be the value returned by `nim auth current --auth`).  You can open the package to any Nimbella user (though not the public at large) by setting the package `shared` property.

```
packages:
  - name: myPackage
    shared: true
    ...
    actions:
      ...
```

The default value of this property is `false`.  When it is set to true, then the actions of the package may be invoked using any authorization token granted by Nimbella to any user.  The action will run with the identity of that user, meaning it can only access what that user is authorized to access.

This feature can be usefully combined with [Setting the web property for all actions of a package](#setting-the-web-property-for-all-actions-of-a-package) with the value `false` (making all the actions non-web actions and subject to the effect of the `shared` property).

To secure individual web actions (`web:true` or `web: raw`) use the [webSecure property](#the-webSecure-property)

#### Package annotations

It is possible to place annotations on a package.  These are distinct from action annotations and can be used to convey any kind of metadata you require at the package level.

```
packages:
  - name: myPackage
    annotations:
      <name1>: <value1>
      <name2>: <value2>
      ...
    actions:
      ...
```

The deployer will add [the `deployer` annotation](#the-deployer-annotation) to a package as well as to the individual actions of the package.  The information in the package-level `deployer` annotation reflects the last time the package metadata was updated and not necessarily updates to individual actions in the package.

#### Parameters and Environment for a package

The specification of parameters for an individual action is discussed in [Parameters and Environment](#parameters-and-environment).  If you wish to pass the same parameters in the same fashion to all of the actions of a package, you can specify `parameters` or `environment` at the package level.

```
packages:
  - name: myPackage
    parameters:
      <ordinary-parameter-name>: <value>
      ...
    environment:
      <environment-parameter-name>: <value>
      ...
    actions:
      - name: action1
        ...
      - name: action2
        ...
```

In the example sketch shown above, both `myPackage/action1` and `myPackage/action2` will receive the parameters, either via the dictionary argument (`parameters`) or via the environment (`environment`).  If `parameters` and/or `environment` are specified both at package level and on an individual action, the values specified on the action will take precedence but otherwise both sources of information will be merged.

#### Ensuring a clean start for a package

The `clean` property (which can be specified on [individual actions](#overwriting-existing-actions)) can also be specified at the package level.

```
packages:
  - name: myPackage
    clean: true
    ...
```

The effect is to remove the entire package and all of its actions from the namespace when anything is deployed to the package.

#### Setting the web property for all actions of a package

The `web` property (which can be specified on [individual actions](#the-web-property) can also be specified at package level.  The effect is to set the specified value for the `web` property on all of the actions of the package.  Note that the default value of `web` is `true`.  The most useful cases, then, are setting the value to `false` or `raw`.  If the `web` property is present both at package level and on an individual action, the value specified on the action takes precedence.

## Web Content

The Nimbella platform supports deploying applications which have a web component (running in a browser) plus actions (running in the cloud).
The contents and deployment behavior of a project's web component are determined from the project tree (after global exclusions) and the project configuration.

Your namespace has a public URL that displays its web content, e.g. `https://<your-namespace>-apigcp.nimbella.io`.  Paths relative to that URL directly relate to contents of your project as described below.  We refer to the URL for your namespace as `<yourURL>` in the examples.

### Web content in the project tree

If there is to be any web content at all, then the directory `web` must appear at the root of the project tree and must contain at least one file (possibly many, with or without subdirectories).  Subject to refinements discussed below, the files under `web` become the static content to be served from your namespace's public URL.  For example, a simple project may provide

```
web/index.html
web/images/logo.png
web/scripts/runner.js
```

In the example, the first file might be HTML to be served, the second an image to be embedded, the third JavaScript source to run locally in the browser.  Note that scripts listed here are distinct from code that is deployed as part of the project's [actions](#actions).  The actions of your project can be invoked either by scripts in the browser or in response to DOM events.

If the `prefixPath` and `strip` properties are not specified, the paths within your `web` directory map directly to paths in the resulting URL space.

```
<yourURL>/index.html
<yourURL>/images/logo.png
<yourURL>/scripts/runner.js
```

Just as for action directories, the `web` directory supports [build steps](building.md) and [`.include` and `.ignore`](actions.md) directives which take effect after any build steps have executed.  The build steps and additional directives affect what is actually deployed in the same way as for action directories.

### Web content in the project configuration

Web content deployment can be affected by a section of the project configuration as follows.

```
bucket:
  prefixPath: <string>
  strip: <number>
  mainPageSuffix: <string>
  notFoundPage: <string>
  clean: <boolean>
  useCache: <boolean>
  remoteBuild: <boolean>
  localBuild: <boolean>
```

Every property has a default and none are required.  The `remoteBuild` and `localBuild` properties must not both appear.

### Web content properties

#### Inserting and dropping path segments in every URL

Normally, the web content paths are immediately relative to your namespace's URL, as outlined [above](#web-content-in-the-project-tree).  The `prefixPath` and `strip` directives change that relationship by either inserting or removing path segments from files in the project tree in determining their URL.

For example, assume you have the following in your config.

```
bucket:
  prefixPath: myapp
  ...
```

Then, the file in the project tree with path `web/index.html` would be at `<yourURL>/myapp/index.html` and the same insertion would be done for all of your web content.

You can also drop path segments.

```
bucket:
  strip: 1
  ...
```

With `strip: 1` in effect, a project tree path like `web/build/index.html` becomes `<yourURL>/index.html`.  The value of the `strip` directive can be any positive integer and that number of path segments will be stripped from each included path.

The `strip` directive is often used in conjunction with a build step and an `.include` file when your web content will be built by tools such as `react` or `vue`.  There are examples of this in the Nimbella demo projects, for example the [chat demo](https://github.com/nimbella/demo-projects/tree/master/chat), which is built with `react`.  The build, specified in the [web/package.json](https://github.com/nimbella/demo-projects/blob/master/chat/web/package.json) file, produces a directory called `web/build` which is included by `web/.include`.   The [project configuration](https://github.com/nimbella/demo-projects/blob/master/chat/project.yml) then strips an initial `build/` path segment from every resource that is deployed, giving the desired result.

It is possible to specify both `strip` and `prefixPath`.  Dropping of segments is done before adding of segments.  So, with both `strip: 1` and `prefixPath: myapp` in effect, you would convert `web/build/index.html` to `<yourURL>/myapp/index.html`.

The `prefixPath` provides a way for multiple projects to deploy web content to the same namespace.  If each uses a unique `prefixPath`, many collisions can be avoided.  However, the `useCache`, `mainPageSuffix` and `notFoundPage` properties are global to the namespace, so all projects that deploy to that namespace must agree on how they are to be set.

#### Setting the main and error pages

Certain "web server" behaviors can be enabled for your namespace.

```
bucket:
  mainPageSuffix: demo.html
  notFoundPage: error.html
  ...
```

- The `mainPageSuffix` property provides the final path segment when a URL path would otherwise denote a directory rather than a file.  The default is `index.html`, which is a common default for web servers and web site generators.
- The `notFoundPage` property provides a page that is displayed when a URL path does not match any web content deployed to the namespace.  The default is `404.html`.

Every namespace starts out with a `404.html` provided by Nimbella Corp. using its logo and its chosen wording.  You may do any of the following.

- You may accept the Nimbella-provided `404.html`, in which case you do not need to set `notFoundPage` nor do you need to provide alternative content.
- You may accept the name `404.html` but provide your own content, which will overwrite the content supplied by Nimbella Corp.  In this case, you do not need to set `notFoundPage` but you do need to include `web/404.html` in your project.
- You may use both your own name and your own content.  In that case, set the `notFoundPage` to your chosen name and include a file by that name in your `web` directory.

#### Ensuring a clean start for web content

Normally, new web content is deployed without removing old web content.  So, unless the identical file names are used each time, your web bucket can contain some old resources.  These may be no longer reachable by navigation within your web content, but they can be reached directly when the URL is stored elsewhere.  This is especially likely when you use certain tools like `react` or `webpack` which generate file names that include hash values.  To override this behavior use the `clean` property.

```
bucket:
  clean: true
  ...
```

The default value for this property is `false`.

The `clean` property is ignored if web content is not being deployed (e.g. as the result of an `--include` or `--exclude` flag on the command line).

#### Controlling CDN cacheing behavior

The web content of a project is distributed by a CDN (the particular CDN may vary by cloud provider).  Normally, the `cache-control` header of the resources that make up the content are set to suppress cacheing so that you can see changes when deploying.   To turn on cacheing you use a specific directive.

```
bucket:
  useCache: true
  ...
```

The default value for this property is `false`.

#### Local versus remote building (web)

When your web content has [build steps](building.md), the default behavior is to build in the local file system.  However, if the build is self-contained (does not depend on artifacts outside the web directory), it is possible to request that the build be done [remotely](building.md#remote-builds).  For web content, remote builds are always done in the default `nodejs` runtime container, since most web build tools are in the `nodejs` ecosystem.

Some web content may note work when the build is done remotely (due to dependence on artifacts that are not contained in the action directory).  The following forces a local build for web content (even when `--remote-build` is specified).

```
bucket:
  localBuild: true
  ...
```

Note that local builds are impossible when deploying from the workbench (and `--remote-build` is true by default there), so web content with this property will not deploy from the workbench.

Similarly, you may with to force a remote build, although this only works when the default `nodejs` runtime container suffices to support the build and the build is self-contained.

```
bucket:
  remoteBuild: true
  ...
```

For web content that can be built either locally or remotely, do not specify either property.   Let the command line option `--remote-build` govern where the build takes place (or, when deploying from the workbench, remote will be assumed).

## Setting global properties

Certain behaviors of the deployer are controlled by properties or objects specified at the top level of the project configuration.  These properties are

```
targetNamespace: <string or object>
cleanNamespace: <boolean>
parameters: <object>
environment: <object>
```

#### Setting the target namespace for a project

The `targetNamespace` property in the project configuration can be used with two slightly different meanings depending on syntax.

###### `targetNamespace` as a simple string

```
targetNamespace: myNamespace
```

This form of the `targetNamespace` property records that the project should be deployed to a particular namespace unless that target is overridden on the command line.  It does not preclude other projects from deploying to the same namespace.

###### `targetNamespace` as an object with `test` and/or `production` members

```
targetNamespace:
  test: myTestNamespace
  production: myNamespace
```

This form of the `targetNamespace` property records one or two namespaces that the project should be deployed to (one for testing, and/or one for production).  In addition, this form establishes _ownership_ of the namespace by the project (other projects may not deploy to it).  Enforcement of ownership is not absolute and requires some cooperation within a team.   See [project ownership of namespaces](tieing-namespaces-to-projects.md).

#### Ensuring a clean start for a project

```
cleanNamespace: true
```

This property causes the target namespace to be cleared of all web content, packages, and actions before deploying the project.  It is equivalent to specifying the `clean` property under `bucket`, under every package in the project, and under those actions that are not in any package (`package: default`).

#### Parameters and Environment for all packages

The specification of parameters for all of the actions of a package is discussed in [Parameters and Environment for a package](#parameters-and-environment-for-a-package).  If you wish to pass the same parameters in the same fashion to all of the actions of _all_ of the packages, you can specify `parameters` or `environment` at top level.  Unfortunately, this behavior does not extend to actions that are not in any package (`package: default`).  These actions still need to have their parameters specified explicitly.

```
parameters:
  <ordinary-parameter-name>: <value>
  ...
environment:
  <environment-parameter-name>: <value>
  ...
packages:
  ...
```

## Information Links

Some concepts are only partially explained in Nimbella documents, but there is useful information in Apache OpenWhisk documents.  In those documents, you will see some examples using the OpenWhisk CLI, called `wsk`.   In many but not all cases the Nimbella CLI, `nim`, will respond to the same commands.  Follow the links below to get greater understanding of OpenWhisk _concepts_ but use Nimbella documents as your reference for how to do things on Nimbella.

[Web actions](https://github.com/apache/openwhisk/blob/master/docs/webactions.md)

[Raw web actions](https://github.com/apache/openwhisk/blob/master/docs/webactions.md#raw-http-handling)

[Securing web actions](https://github.com/apache/openwhisk/blob/master/docs/webactions.md#securing-web-actions)

[Sequences](https://github.com/apache/openwhisk/blob/master/docs/actions.md#creating-action-sequences)
