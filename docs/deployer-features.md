---
id: deployerFeature
title: Deployer Feature
sidebar_label: Deployer Feature
---

## About the Nimbella deployer


### Nimbella deployer supported runtimes for actions


The Nimbella deployer determines the kind of runtime required for the action from the file suffix. The following runtimes are supported:

*   Node.js for suffix _.js_
*   Typescript for suffix _.ts_
*   Python for suffix _.py_
*   Java for suffixes _.java_ and _.jar_
*   Swift suffix _.swift_
*   PHP for suffix _.php_
*   Go for suffix _.go_

### Deploying projects incrementally

Instead of deploying your entire project each time you make a change to the file contents, you can use incremental deployment to detect and deploy changes in the following:

*   Project structure
*   Project content
*   [Project configuration](configuration.md) (if you have created one)

This is a great time-saver during project development and also helps [facilitate deployment when your project is large](projects.md#factors-in-choosing-project-size).

Consider the following example of an `example4` project. The output from standard deployment is shown here:


```
> nim project deploy example4
Deploying project '/path/to/example4'
  to namespace '...'
  on host 'https://...nimbella.io'
Deployed actions:
  - admin/adduser
  - welcome
  - demo/hello
```

Now suppose that you’ve made changes to `demo/hello` and `welcome` but not the others. You aren’t ready to do a production deployment or submit for testing, you just want to deploy what’s changed so you can continue developing.

To deploy incrementally, use the `--incremental` flag, as in the following example.


```
> nim project deploy example4 --incremental
Deploying project '/path/to/example4'
  to namespace '...'
  on host 'https://...nimbella.io'
Deployed actions:
  - welcome
  - demo/hello
Skipped 1 unchanged action
```

Changes to actions and web content are tracked by means of digests created by the deployer and described in more detail in [Deployer recordkeeping](#deployer-recordkeeping). The deployer skips the uploads of actions and web content whose digests have not changed. Digests are computed over an action’s contents and also its metadata, so if you use a [project configuration](configuration.md) file to change the properties of an action, those changes are detected as well.

The `--incremental` option also skips rezipping large multi-file actions whose included contents are older than the last zip file.

The `--incremental` option is accurate in determining what has changed unless you add build steps. After you add build steps, some heuristics come into play, as discussed in [Build States and the Effect of --incremental on Builds](building.md#build-states-and-the-effect-of-incremental-on-builds).


#### Project watching for incremental deployment

A good way to implement incremental deployment during project development is to use `nim project watch`. The `project watch` command typically runs until interrupted in a devoted terminal window so you can work elsewhere, such as in your favorite IDE.

Here’s an example of using this command for incremental deployment.

```
> nim project watch example4
Watching 'example4' [use Control-C to terminate]
...
Deploying 'example4' due to change in 'path/to/packages/demo/hello'

Skipped 4 unchanged web resources on
  https://<namespace>-host.nimbella.io
Deployed actions:
  - demo/hello
Deployment complete.  Resuming watch.
```

The `project watch` command accepts a list of projects and most of the flags that project `deploy` accepts, as described in [Project-Level Deployment Commands](commands.md#project-level-deployment-commands). An exception is `--incremental`, which is assumed.

### Deploying Portions of Projects Selectively

There may be occasions when you only want to deploy parts of a project.  If the change-based selection of incremental deployment does not fit your needs, you can control which actions are deployed (and whether web content is deployed) directly from the command line.

```
# Deploy just the web content and no packages
nim project deploy printer --include web

# Deploy everything except the admin package
nim project deploy printer --exclude admin

# You can use --include and --exclude together
nim project deploy printer --include admin,printer --exclude printer/notify
```

The general rule for both `--include` and `--exclude` is a comma-separated list of tokens (no whitespace).  The tokens may be

- the special word `web` referring to the web content of the project
- the name of a package
  - if the package is called `web`, you should remove ambiguity by using a trailing slash as in `web/` (a trailing slash is accepted on any package)
  - the package name `default` is used for the actions that are not members of any package
- a qualified action name in the form `package-name/action-name`
  -  e.g. `printer/notify` or `default/hello`
  -  the `default/` prefix is required for actions not in any package; otherwise, the name will be taken to be a package name
- wildcards are _not_ supported

If you specify only `--include`, then only the listed project portions are deployed.  If you specify only `--exclude`, then _all but_ the listed project portions are deployed.  If you specify both flags, the deployer first includes only what is listed in `--include` and then excludes from that list.  This allows you to include a package while excluding one or more of its actions.

### Deploying Directly from GitHub

If you have Nimbella projects in a GitHub repository, you can deploy directly from GitHub without the need to create a local clone.  If you do have a local clone, you can deploy as needed from the clone or directly from GitHub.  For example, deploy from the clone to include your local modifications.  Deploy from GitHub to ignore your local modifications and restore the deployed code to what is in the remote repository.

The `nim` command does not get involved in keeping your clone in synch with the repository; that is up to you as a developer.

To indicate you want to deploy from GitHub, use a project path that starts with one of the following.

```
github:
git@github.com:
https://github.com/
```

The deployer supports all three prefix styles to align with developer habits and URLs copied from elsewhere: all three are equivalent and authenticate to GitHub in exactly the same way.

You follow the prefix with the "owner" (GitHub account), repository, path to the project within the repository (if any), and specific branch or commit (if not `master`).   For example,

```
nim project deploy github:nimbella/demo-projects/visits
nim project deploy git@github.com:/my-account/my-repo-with-project/#dev
```

The deployer does not use SSL public/private keys or username/password authentication.  It relies on tokens issued for you by GitHub.  If you obtained your Nimbella account using your GitHub account for identification, there is _probably_ already a GitHub token stored as part of your Nimbella credentials (this depends on the details of account provisioning).

You can check GitHub accounts for which you have tokens in your Nimbella credential store by issuing

```
nim auth github --list
```

If you do not have any GitHub account registered then `nim project deploy` will (by default) refuse to deploy from github.  You can override this behavior using (e.g.)

```
nim project github:nimbella/demo-projects/visits --anon-github
```

However, GitHub imposes severe rate limitations on anonymous access.  Many projects that you will want to deploy will be large enough that you will hit this limit routinely.  Also, you will be unable to deploy from private repos.  So, this option is really for exploring the capability only.   To really use the capability in serious development, you must have a GitHub account.  If you have one (or once you have one) you can add it to your Nimbella credentials using

```
nim auth github --initial
```

A web page will open for you in your default browser, allowing you to login securely to GitHub for verification.  At the end of that process, you will have a GitHub token.

At present, deploying from GitHub has these additional limitations.

- the `--incremental` option is not available.
- the `project watch` command does not work when deploying from GitHub

### Deployer recordkeeping

The deployer creates two types of audit trails:

1.   One for actions and packages deployed to your namespace
2.   One for actions, packages and web content in your local project.

We’ll describe each type and show how they differ and how they can be used for comparison.

Note that the local audit trail is not available when you deploy from GitHub.  Even if you have a local clone of the GitHub repository, the deployer does not know this and does not get involved in GitHub synchronization.

#### Annotations for actions and packages deployed to your namespace

Version numbers for actions and packages are incremented on each update, and the `action get` command retrieves information about a deployed package or action in your namespace.

**Note:** Web content does not have version numbers. Its changes are tracked by maintaining content digests of the current files on your local system versus the latest-deployed files from the project. See [Recordkeeping in your local project](#recordkeeping-in-your-local-project) for an example.

As shown in the following example, the `action get` command output shows the namespace, the name of the action or package, and and its version in the namespace. In addition, the command output displays the annotation data that the the deployer generates in each action and package it deploys. If your project is managed by git, the annotations contain a variety of information about the storage in your git repository, as described below. If your project isn’t managed by git, it contains the project path and the user who created the project.

##### Typical action get command output

In this example, the `action get` command retrieves the annotation for the `demo/hello` action from [example1](single-action-example.md):

```
> nim action get demo/hello
{
  "namespace": ".../demo",
  "name": "hello",
  "version": "0.0.1",
  ...
  "annotations": [
    {
      "key": "deployer",
      "value": {
        "repository": "...",
        "commit": "...",
        "digest": "...",
        "projectPath": "...",
        "user": "..."
        }
      },
      ...
  ],
  ...
}
```

In the first section of output:

*   `namespace` shows the namespace name plus the project’s package name.
*   `name` shows the name of the action.
*   `version` shows the version of the action that’s in your namespace.
This is the version that you’d compare with the version in `/path/to/example1/.nimbella/versions` to see if they match. If they do not, you’d then start looking for another project that may have placed that file there.

The `annotations` details for the key `deployer` vary according to whether the deployed project is under git control.

**If the deployed project is managed by git:**

*   `repository` is the value given by `git config --get remote.origin.url`.
*   `commit` is the `githash` of the most recent commit, with` ++` added if the working copy contains uncommitted changes.
*   `digest` is the digest of the code and the metadata of either the action or the package (the same value that is stored locally for controlling incremental deployment).
*   `projectPath` is the path of the project within the repository clone, relative to the repository root.
*   `user` is the value given by `git config --get user.email`.

**If the deployed project does not appear to be under git control:**

*   The `repository` and `commit` fields are omitted.
*   `digest` is the digest of the code and the metadata of either the action or the package (the same value that is stored locally for controlling incremental deployment).
*   The `projectPath` is absolute.
*   `user` is the local user name according to the operating system.


#### Recordkeeping in your local project

The deployer records information about your local project in a single file called `versions.json` in a project subdirectory named `.nimbella`. For actions and packages, the deployer records the last-deployed version in your local project. For actions, packages, and web content, the deployer also creates digests, which are used for [incremental deployment](#deploying-projects-incrementally).
Looking at the information in `versions.json` answers the question _“What did you last put in the namespace using this project?"_

**Note:** Do not edit any files in the `.nimbella` directory.


##### Typical versions.json file content

The `versions.json_`entries for packages and actions look something like this:

```
[
  {
    "apihost": "https://...",
    "namespace": "...",
    "packageVersions": {
      "demo": {
        "version": "0.0.1",
        "digest": "ab87f791f2d2..."
      }
    },
    "actionVersions": {
      "demo/hello": {
        "version": "0.0.3",
        "digest": "ca5b7a03c1bb..."
      }
    }
  }
}
```

In this example, you can see that there are separate status entries for the package `demo` and the action `demo/hello`. The entry for the package and for each action includes both a `version` field, showing the last-deployed version number, and a `digest` field, which is used to control [incremental deployment](#deploying-projects-incrementally). The package and action versions often differ because the package version reflects (re)deployments of the package metadata and not whether or not contained actions were (re)deployed.

If you have also deployed static web content, the `versions.json` file has a `webHashes` entry with digest information about each web file, something like this:

```
"webHashes": {
  "qrcode/web/index.html": "56bc228c3f5b8a33e59224bdadd8a7d8674dbc1e774a97af4cb62a355f585276",
  "qrcode/web/logo.png": "302f6b60c3b73ac23df07e528d14ef740576ac5966cdd5ea4884f03d0a532a71"
}
```


#### Comparing versions in your namespace versus local project

The namespace vs. local project recordkeeping is particularly useful for comparing version numbers between the local copy of the project and what’s actually in your namespace. For example, as described in [Factors in choosing project boundaries](projects.md#factors-in-choosing-project-boundaries), there can be collisions between different projects trying to install the same resource. If you use the `action get` command and find that the` demo/hello` action in your namespace is at version `0.0.2` while the `.nimbella/versions.json` content tell you that the deployer last deployed version `0.0.1` from your local project, it means that the action was updated in your namespace outside the deployer or by some other project or copy of this project. At that point, you might have to inspect the deployed action further to disambiguate the two versions.

**Notes:**

*   If you have a [project configuration](configuration.md) that uses one of the options to clean an action, package or namespace prior to deploying, then the version numbering of the cleaned action starts over again at `0.0.1`.
*   If you deploy to different namespaces or API hosts at different times, the array in `versions.json` will have more than one entry, with versions for the last deployment to each distinct API host/namespace target.
