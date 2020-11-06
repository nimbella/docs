---
id: actions
title: Actions
sidebar_label: Actions
---

## About actions

### Actions Have Public URLs by Default Unless the Project is Configured

Every action produced by a no-configuration project such as [the example project above](single-action-example.md) is publicly accessible via a URL and is called a _web action_. You can retrieve the URL for any particular web action by using the `action get` command, as in the following example, which returns the URL for the `demo/hello` action created in the previous example.

```
> nim action get demo/hello --url
https://....nimbella.io/api/v1/web/.../demo/hello
```

If you don’t want your actions to be publicly accessible through an unprotected URL, you’ll need to [add a project configuration](configuration.md).


### Using zipped source files to form a single action

If you have more than one source file that must be bundled together to create a single action, you can zip the source files together as long as the file name and suffix take the following form _\<xxx\>.\<runtime\>.zip_.

The deployer normally [determines the runtime for the source file from the file’s suffix](deployer-features.md#nimbella-deployer-supported-runtimes-for-actions), and the _.zip_ suffix doesn’t provide this information, so the runtime must be specified between the file name and the file suffix, demarcated by periods. For example, the name _hello.nodejs.zip_ can be used for a zipped action whose action name is `hello` and whose runtime kind is the default version of Node.js.

If you want to force a specific runtime version, use a file of this form instead: _hello.nodejs-8.zip_. The Nimbella Cloud must support the version you specify.

Some language runtimes, such as Java, also accept specialized archives such as _.jar_ files, or they directly accept binary executables. In this case, the runtime is determined by the file extension in the normal manner, such as _hello.jar_. Other cases are not specially handled by nim and might require [adding a project configuration](configuration.md).

Zipped actions are usually created in a separate build step. As an alternative, Nimbella has [an autozip feature triggered by directory structure](#multifile-actions-created-with-autozip).


### Multifile actions created with autozip

By creating a directory under the package directory, named for the action, and containing its source file(s), you can expand to multiple source files and they will be zipped automatically. Certain conditions must be met for this to work. Suppose the [example1 project](single-action-example.md) has a `hello` action with two source files: _helloMain.js_ and _helloAux.js_. To create the `demo/hello` action, add a `hello` directory as a child of the `demo` directory, as shown in this diagram.

<center><img src="./fig4-nim-example2-project-directory-structure.svg" height="450"/></center>
<center>**Figure 3: Two source files in an action directory for automatic zipping**</center>

The difference from the [example1 directory structure](single-action-example.md#fig2) is that the `hello` action is a _directory_ rather than a single source file. The source files in the directory are zipped automatically to form the action.

For autozipping to work in a project with no configuration, the following conditions must be met:

*   At least one source file must have [a suffix from which the runtime type can be inferred](deployer-features.md#nimbella-deployer-supported-runtimes-for-actions).
*   No other source file can have a suffix implying a different runtime.
*   All source files must be compatible with the chosen runtime.
*   Exactly one file must contain an identifiable `main` entry point, as required by the particular runtime selected.

These conditions can be relaxed by using [project configuration](configuration.md).

Subdirectories can be present under an action directory (for example, a `node_modules` directory as in the following diagram). These directories are zipped up with everything else under the action directory.

<center><img src="./fig5-nim-example2-complex-directory-structure.svg" height="450"/></center>
<center>**Figure 4: Autozipping a subdirectory of an action directory**</center>

You can optionally limit the files to be zipped in either of two ways:

*   Add a file called `.include`, which lists exactly the items to be included. Anything else in the action directory is excluded. Wildcards are not permitted in this file but entries can denote directories as well as files. The `.include` file can also be used for linking to somewhere else in the filesystem, as described in [Using an action source from elsewhere in the project](#using-an-action-source-file-from-elsewhere-in-the-project).
*   Add a file called `.ignore`, stating which files and directories _not_ to include. The `.ignore` file follows the same rules as `.gitignore` and has the same effect. It is not necessary to list `.ignore` inside itself. It is automatically ignored, as are certain build-related files.

You cannot have both a `.include` and `.ignore` in the same action directory.

**Note:** No zipping occurs in any of the following cases:

*   The directory representing the action contains only a single file.
*   Only one file is listed in `.include`.
*   Only one file is left after applying the rules in `.ignore`.


#### Using an action source file from elsewhere in the project

If you use an `.include` file, it can contain entries that denote files or directories outside the action directory. Entries can be either absolute paths or paths that are relative to the action directory using standard `../` notation.

**Notes:**

- Although paths in `.include` are currently _permitted_ to terminate outside the project entirely, this practice is deprecated because it makes it hard to relocate the project.  It’s better practice to include all files within the project. If they are directories shared by many actions and you want the deployer to otherwise ignore them, you can put them in the root directory, as described in [About projects](projects.md).
- If you wish your build to execute remotely as described in [Remote Builds](building.md#remote-builds), you may not include material from outside the directory.

Entries in `.include` are interpreted differently if they are absolute or contain `../` notation.  If the path has either of those characteristics, the resulting entries in the zip file start with the last segment of the listed path. Here are two examples:

*   If you have `../../../lib/node_modules`, the contents of the node_modules directory are zipped but files inside the directory have the form `node_modules/<path>`.
*   If you have `../../../lib/helpers.js` the file becomes just `helpers.js`.
