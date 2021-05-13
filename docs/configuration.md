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

You can also hand-edit _project.yml_ from scratch but having an all-defaults template to start from can be helpful.

The project configuration is merged with what is inferred from file and directory names, so it’s only necessary to put information in the configuration that can’t be inferred from file or directory names or for which the defaults aren’t what you want.  If you generate your _project.yml_ using `nim project create`, you can remove entries that denote defaults without changing the subsequent behavior.

For example, let’s suppose that in [the example1 project](single-action-example.md), you don’t want `hello` to be a web action and the deployer cannot determine its main entry point directly from the code. Add a _project.yml_ file such as the following:

```yaml
packages:
  - name: demo
    actions:
      - name: hello
        web: false
        main: myMain
```

All properties that can be specified in `project.yml` are explained in [the deployer specification](deployer-spec.md).  

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

### Configuration example for web content generated by a tool

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
