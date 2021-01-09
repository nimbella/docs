---
id: configuration
title: Project Configuration
sidebar_label: Project Configuration
---

## Adding project configuration

A feature that sets nim projects apart from many other deployment tools is that no manifest or configuration file is required in a large number of suitably simple cases. You can simply choose a directory in the file system to represent a project and lay out the content of the project under that directory using a structure that nim will recognize as a project. See [the no-configuration project example](single-action-example.md).

However, Nimbella projects can’t always avoid having a configuration file, so this section summarizes how to add a configuration file to guide nim when the file and directory structure doesn’t convey everything it needs to know.

To configure a project, create a configuration file called _project.yml_ in the project’s root directory. The configuration file is coded in YAML. There are various online tutorials for YAML if you need to learn more about the YAML language.

One important fact about YAML is that things to the right of the `:` separator are given data types according to their appearance.  So, `7895.37` is taken to be a _number_ and not a string, even though `abcd.ef` would be parsed as a string. You can always cause values to be taken as strings by quoting them.  E.g. `"7895.37"` and `"abcd.ef"` are both strings.  This distinction can be important in cases when dot-separated alphameric values can end up looking like numbers by the accident of having only digits and dots.

The structure of the information in the _project.yml_ file should follow the structure of the project itself.  If you create the project using `nim project create` you can optionally request a _project.yml_ to be generated from the start, giving you something to edit.

```shell
> nim project create example6 --config
```

The resulting project will have a _project.yml_ with all default values.

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

All of the properties in these examples will be explained below.  You can also hand-edit _project.yml_ from scratch but having an all-defaults template to start from can be helpful.

The project configuration is merged with what is inferred from file and directory names, so it’s only necessary to put information in the configuration that can’t be inferred from file or directory names or for which the defaults aren’t what you want.  If you generate your _project.yml_ using `nim project create`, you can remove entries that denote defaults without changing the subsequent behavior.

We’ll cover configuration for packages and actions first, then configuration for web content, including an example of generated content such as a React web app. Then we’ll cover symbolic variables and file substitution.

### Project configuration for packages and actions

Let’s suppose that in [the example1 project](single-action-example.md), you don’t want `hello` to be a web action and the deployer cannot determine its main entry point directly from the code. Add a _project.yml_ file such as the following:

```yaml
packages:
  - name: demo
    actions:
      - name: hello
        web: false
        main: myMain
```

The following sections contain a list of configuration members for [actions](#action-modifiers-allowed-in-project-yml), [packages](#package-modifiers-allowed-in-project-yml), and [global](#global-modifiers-allowed-in-project-yml). An additional configuration member is `bucket` which is documented in [Adding static web content](web-content.md).

#### Action modifiers allowed in project.yml

Here are the action modifiers that are allowed in the configuration.

##### web

May be `true`, `false` or `raw`. The default is `true`.

The `web` modifier has the same semantics as it does in `nim action create`, except for the default. The value `yes` or `true` produces a normal web action. The value `no` or `false` produces an action that is not a web action. The value `raw` produces a raw HTTP web action. The default is `true` if not specified. These behaviors are accomplished via annotations with reserved meanings that are merged with annotations provided by you.

**Note:** See also the [`web`](#web-1) modifier on packages.

##### runtime

The runtime to use for the action. It should be in the form "language:version", for example "python:3" or "language:default", for example "go:default". Because of the colon, the string should be quoted, as in these examples.

##### main

The main entry point for the action.

##### binary

May be true or false. The value true indicates the need for base64 encoding when transmitting the action for deployment. Normally this is inferred from the file suffix.

##### webSecure

Note that web actions are normally executable by anyone.  Adding the `webSecure` flag secures a web action in one of two ways.  If a string value is provided, that string is taken to be a secret that must be provided by invokers of the action.  If the boolean value `true` is provided, then only users who have valid Nimbella authorization, and provide that authorization in a basic authentication header when invoking the action, will be able to invoke the action.  The value `false` requests the default behavior for web actions (anyone can execute).

##### annotations

A nested map providing annotations to place on the action.

The keys and values of annotations are up to you to create. The important thing is that both clauses are nested maps in YAML terms and can have as many keys and values as needed. See the example in the [`parameters`](#parameters) description.

##### parameters

A nested map providing parameters, which are bound to the action and passed on each invocation.

The keys and values of parameters are up to you to create. The important thing is that both clauses are nested maps in YAML terms and can have as many keys and values as needed.  The following example shows some key-value pairs created for the `annotations` and `parameters` modifiers for the `hello` action in the `demo` package.

```yaml
packages:
  - name: demo
    actions:
      - name: hello
        annotations:
          final: true
          sampleAction: true
        parameters:
          language: English
```

##### environment

A nested map providing parameters that are placed in the environment of the action before each invocation

##### clean

May be `true` or `false`, indicating whether you want any previous action with the same name to be removed before deploying a new one. The default is `false`.

The `clean` modifier requires some explanation. The deployer installs actions using the update verb, meaning that there is some history maintained in the installed action. The version number is incremented. Parameters and annotations from a previous incarnation will be retained unless changed. The code is always installed anew, however. The `clean` flag guarantees that the action is built only from the information in the project by erasing any old copy of the action before deploying the new one.

**Notes:**

*   See also the [`clean`](#clean-1) flag on packages and the [`cleanNamespace`](#cleannamespace) global flag.
*   The `clean` flags on actions are ignored when the `--incremental` flag is specified.
*   The `clean` flags on actions are also ignored when deployment of those actions is suppressed through the use of `--include` or `--exclude` flags on the command line.

##### limits

A nested map in which you can set limits for

- the timeout in milliseconds
- memory in megabytes
- log size in kilobytes

For example

```yaml
packages:
  - name: demo
    actions:
      - name: hello
        limits:
          timeout: 10000
          logs: 10,
          memory: 256,
```

You need not specify all limits if you only wish to specify one or two.  All three of these limits must be numbers and within the range permitted by the Nimbella cloud (use `nim info --limits` to see the allowed range).  When not specified, Nimbella Cloud defaults are assumed.

##### localBuild

If `true`, specifies that any build done for this action must be local (even if `--remote-build` is specified).  A request to build remotely will be ignored for this action.  A project containing such an action cannot be deployed from the workbench unless the action is excluded through use of the `--exclude` or `--include` flags.  It is illegal to set both this flag and the `remoteBuild` flag to `true`.

##### remoteBuild

If `true`, specifies that any build done for this action must be remote (regardless of whether `--remote-build` is specified).  It is good to specify this for actions whose build will be incorrect unless done in the environment of the runtime container.  It is illegal to set both this flag and the `localBuild` flag to `true`.

#### Package modifiers allowed in project.yml

The package modifiers that can go in the configuration are as follows.

##### shared

May be `false` (default) or `true`. It indicates that the contents of the package are accessible to other authorized users.

##### annotations

A nested map providing annotations to place on the package.

The keys and values of `annotations` are up to you to create. The important thing is that both clauses are nested maps in YAML terms and can have as many keys and values as needed. See the example in the [`parameters`](#parameters) modifier for actions.

##### parameters

A nested map providing parameters to be bound to all of the actions of the package and passed on each invocation.

The keys and values of `parameters` are up to you to create. The important thing is that both clauses are nested maps in YAML terms and can have as many keys and values as needed. See the example in the [`parameters`](#parameters) modifier for actions.

##### environment

A nested map providing parameters to be placed in the environment of all the actions of the package before each invocation.

##### web

A `web` modifier to be distributed to all actions of the package that don't have their own `web` modifier.  The same values are accepted as on an action.

**Notes:**

* A value of `web: true` is the same as omitting the modifier since that is the default.
* One use for this modifier is when it is not appropriate to make _any_ actions of a package be web actions, both those that exist now and those you may add in the future.  Just put `web: false` on the package.

##### clean

May be `true` or `false`, indicating whether you want any previous package with the same name and all of its contained actions to be removed before deploying a new one. The default is `false`.

**Notes:**

*   `clean` at the package level is not the same as specifying clean on each action of the package. At package level, the `clean` flag removes all actions from the package before deploying, even ones that are not being deployed by the present project. It also removes package parameters and annotations. The `clean` flag at the package level is only appropriate when you want the project to “own” a particular package outright. See also the [`clean`](#cleanactions) flag on actions and the [`cleanNamespace`](#cleannamespace) global flag.
*   The `clean` flag on packages is ignored when the `--incremental` flag is specified.
*   The `clean` flag on packages is also ignored when deployment of those packages is suppressed through the use of `--include` or `--exclude` flags on the command line.

#### Global modifiers allowed in project.yml

There are also some useful global members of the configuration.

##### targetNamespace

Establishes project ownership of namespaces for 'test' and 'production' use, as described in [Tieing Namespaces to Projects](tieing-namespaces-to-projects.md).  The simpler form

```yaml
targetNamespace: <myNamespace>
```

is also accepted for compatibility with earlier releases of `nim`.  It causes deployment to go by default to a given namespace but does not establish ownership.

##### cleanNamespace

May be `true` or `false` (default). It causes the entire namespace to be cleared of content prior to deployment: actions, package, and web content. Set this option to `true` only if you intend the project to have total ownership of the namespace.  It can be set initially in a new project using the `--clean` flag on `nim project create`.

**Notes:**

*   See also the `clean` flag on [actions](#cleanactions) and [packages](#cleanpkgs).
*   The `cleanNamespace` global flag is ignored when the `--incremental` flag is specified.

##### parameters

A nested map providing parameters to place on every "real" package in the project (those capable of accepting parameters).  The parameters are then distributed by the backend to all the actions that are contained in those packages.

**Note:** The "default" package is not a package in the backend but simply contains the actions that are not in any package.  It is not legal to specify `parameters` for it and thus `parameters` at top level do not distribute to it.

##### environment

A nested map providing parameters to place on every "real" package in the project such that the parameters go into the environment of actions of the packages.

**Note:** See note under `parameters`.

### Project configuration for web content

The _project.yml_ file can also contain configuration that controls how the web directory and web content is deployed.


#### Use the project.yml bucket member to configure how web content is deployed

Adding a `bucket` member at the top level of _project.yml_ provides several options for configuring deployment of your web content, as shown in the following example and described in the sections below. All entries are optional.

```yaml
bucket:
  prefixPath: "chatroom"
  clean: true
  mainPageSuffix: chatroom.html
  notFoundPage: "error.html"
  strip: 1
  useCache: true
  localBuild: true
  remoteBuild: false
```

The following sections have a description of the `bucket` options shown in this example.

##### Share a Nimbella namespace with prefixpath

When `https://<namespace>-host.nimbella.io` is used as a URL with no additional path component, a path of _/index.html_ is assumed, but if your web content doesn’t require being placed at the root of the URL path space, you can allow web content from different projects to share a namespace and a hostname. This is done by using prefix paths to place each project’s web content in a different location. The Nimbella deployer does not rewrite URLs internal to your content, but you can configure prefix paths by adding a `prefixPath` flag.

The path specified in `prefixpath` is prepended to every URL path whenever resources are uploaded. For example, given the examples above, the resource _chatroom.html_ would be deployed to `https://<namespace>-host/chatroom/chatroom.html`.

##### Delete previously deployed content when new content is deployed

If the `clean` flag is `true`, all previously deployed web content is deleted prior to deploying new content. The default is `false`, in which case previously deployed web content is allowed to remain.

**Tip:** A top-level `cleanNamespace: true` designation clears both web content and actions prior to a new deployment.

##### Configure behavior when the URL denotes a directory

You can configure which file is served when a URL denotes a directory. By default, the file _index.html_ is served, but you can change the file name with the `mainPageSuffix` flag.

In the bucket example above, the file that is opened when the prefix path is `chatroom` is _chatroom.html_.

**Notes:**

*   The deployer doesn’t generate _index.html_ or any other file you name here. You must provide the file as part of the web content.
*   The `mainPageSuffix` option is global to the namespace, so if you deploy multiple web folders into the same namespace using separate projects, either use the same values in all such projects or specify them in only one of the projects. You can obtain more than one namespace from Nimbella to deal with any conflicts that are otherwise hard to resolve.

##### Specify the page for a 404 error

The `notFoundPage` option nominates a web page to be used for a URL that does not match any content. The designated page is returned with every 404 Not Found error. If you don’t specify `notFoundPage`, the default is _404.html_.

Nimbella places its own _404.html_ at the root of every namespace and preserves an existing file by that name when deleting web content from the namespace. You can overwrite the provided _404.html_ or leave it there and use a different name for a custom Not Found page. The advantage of using a custom page is that you can easily revert to the Nimbella-provided one by removing the `notFoundPage` directive.

**Note:** The `notFoundPage` option is global to the namespace, so if you deploy multiple web folders into the same namespace using separate projects, either use the same values in all such projects or specify them in only one of the projects. You can obtain more than one namespace from Nimbella to deal with any conflicts that are otherwise hard to resolve.

##### Strip path segments

The `strip` option removes path segments, and in this sense, it is the opposite of `prefixPath`, which adds path segments. The number value specifies the number of paths to strip.

You can use both `strip` and `prefixPath` to remove existing segments and then add new ones. The `strip` option is most useful when you use a tool to generate web content because often the tool puts its output in a specific directory that you might not want in your deployed namespace. For an example, see [Example of a web directory with a tool that generates web content](building.md#configuration-example-for-web-content-generated-by-a-tool)

##### Specifying cache behavior

The `useCache` option, if set to `true` turns on CDN cacheing and other cacheing for the deployed web content.  When the value is false (the default), web content will be served with a `Cache-Control` header that suppresses cacheing.

##### Forcing local build behavior

Use `localBuild` to force the web build (if any) to be local.  This flag is similar to the [localBuild](#localBuild) option for actions, except that it applies to the web build.

##### Forcing remote build behavior

Use `remoteBuild` to force the web build (if any) to be remote.  This flag is similar to the [remoteBuild](#remoteBuild) option for actions, except that it applies to the web build.   Remote builds for web content are always run in the `nodejs:default` container.  There is no current mechanism to select a different runtime container.

#### Configuration example for web content generated by a tool

Here’s an example of a basic _web_ directory structure when you use a tool to generate web content. Chances are the tool puts its output in a specific directory. Here’s an example diagram of the _web_ directory for an `example4` project, using React to generate the web content.

<center><img src="img/fig7-nim-examples-project-chat-react-directory-structure.svg" height="550"/></center>
<center><strong>Figure 6: Project web directory structure for generated web content</strong></center>

The _web_ directory contains a _.include_ file and some other files related to building not shown in the diagram. The _public_ and _src_ directories contain the source of the React web application. The _build_ directory is generated by the React build and contains all of the content to be deployed.

The _.include_ file contains only one line:

```
build
```

The _project.yml_ file contains the following content:

```yaml
Bucket:
  strip: 1
```

The strip option strips one path segment from the deployed web content. See [Strip path segments](#strip-path-segments).

Deploy as follows:

```shell
> nim project deploy chat
Deploying project '.../chat'
  to namespace '...'
  on host 'https://...nimbella.io'
Started running ./build.sh in chat/web
Finished running ./build.sh in chat/web

Deployed 25 web content items to
  https://...nimbella.io
Deployed actions:
  - chatadmin/create
  ...
  - chatroom/postMessage
```

### Symbolic variables

The configuration can contain symbolic variables of the form `${SYMBOL}` where `SYMBOL` is chosen by you. The substitutions for these variables are taken from the process environment or optionally from an environment file.  Leading and trailing whitespace is ignored, so `${PASSWORD}` and `${ PASSWORD }` or even

```js
${
   PASSWORD
}
```

have the same meaning.

The environment file typically takes the form of a properties file that consists of key-value pairs, as in the following example.

```shell
USERID=jane
PASSWORD=notmyactualpassword
```

The environment file can also be in JSON format as long as it contains a single object to be interpreted as a dictionary.

You can specify the environment file explicitly on the command line, as in this example:

```shell
nim project deploy myProject --env test.env
```

**Note:** If there is a file named `.env` located in the root of the project, it will be used as the environment file, and you don’t need the `--env` option on the command line.

Substitution occurs as follows:

*   If the symbol matches the name of an environment variable, the value of that environment variable is substituted and the environment file, if any, is ignored.
*   Otherwise, if there is an environment file and the symbol matches one of its keys, the value paired with that key is substituted.
*   Otherwise, the symbol is undefined, resulting in an error indication from nim.

### File substitution

File substitution is typically used to set environment, parameters or annotations on an action or package or to set the top-level parameters, such as the following:

```yaml
environment: ${<.environment}
parameters: ${<.parameters}
annotations: ${<.annotations}
```

That is, you can “inline” the contents of certain files in certain places in the configuration in _project.yml_. There are constraints on how file substitution can be used, as explained below.

Where it is legal, you can request file inclusion by using the `<` modifier in what otherwise looks like a symbolic variable, for example:

```yaml
${<.extraConfig}
```

Substitute any valid absolute or relative file system path for `extraConfig`, providing the path denotes a file. Files are relative to the project directory.

File substitution can only be used in places where the configuration expects a subdictionary, meaning a closed grouping of key-value pairs under a specific heading like `parameters`, `annotations`, or `bucket`. Here’s an example of a closed grouping:

```yaml
  parameters: ${<.parameters}
  peerOfParameters:
```

The following example isn’t a closed grouping.  Once you include a file to satisfy the contents of a heading you can't add to it.

```yaml
  parameters: ${<.parameters}
    anotherParameter: value
  # Will cause an error
```

The file whose contents are inlined must either contain JSON or be in the form of a properties file with key-value pairs. In other words, it takes the same form as the environment file used in symbol substitution. In fact, the properties file can be the same file as the environment file, but it doesn’t have to be. If it is in the form of a properties file, it will be converted into a shallow dictionary with no nested subdictionaries for the purpose of inclusion. With JSON, you can escape this restriction and have a nested structure. Note that the file is not interpreted as YAML.

**Warning:** All inclusions are processed _before_ the resulting YAML is parsed. For this reason, errors can be obscure when you violate the restrictions.

### Dictionary substitution

Sometimes you may have a large number of parameters across the entire project, but it is wasteful to pass all parameters to all actions (which is what would happen if you used file substitution).  You can use a single environment file (specified on the command line or `.env` in the project root) and dole out the appropriate parts of it on a per action basis like this.

```yaml
  parameters: $(
    userid
    password
  )
```

Note the use of `$( )` rather than `${ }`.  Dictionary substitution is syntactic sugar for

```yaml
  parameters:
    userid: ${userid}
    password: ${password}
```

The whitespace separation within the substitution is arbitrary and you could alternatively have used

```yaml
  parameters: $(userid password)
```

Single variables can also be used in the dictionary form.
```yaml
  parameters: $(
    password
  )
```

It is important is that the initial token `$(` be placed somewhere where the YAML parser expects a subdictionary, the same rule as for file substitution.

**Note:** As with file substitution, dictionary substitution can only be used where the configuration expects a subdictionary, and you can't add to it.
