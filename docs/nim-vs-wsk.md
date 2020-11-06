## Information for OpenWhisk developers

Nimbella powers the “serverless computing” portion of its offering with a modified version of [Apache OpenWhisk](http://openwhisk.org/). If you’re familiar with the OpenWhisk platform, you’ll recognize many similarities and some differences in the Nimbella commands and concepts. We’ll cover some of them here.

In Nimbella, as in OpenWhisk, the unit of authorization is called a _[namespace](https://github.com/apache/incubator-openwhisk/blob/master/docs/reference.md#namespaces-and-packages)_. As in all OpenWhisk deployments, a namespace contains [actions](https://github.com/apache/incubator-openwhisk/blob/master/docs/actions.md) that are optionally grouped into _[packages](https://github.com/apache/incubator-openwhisk/blob/master/docs/packages.md)_.

OpenWhisk has additional entities called _[rules](https://github.com/apache/incubator-openwhisk/blob/master/docs/triggers_rules.md)_, _[triggers](https://github.com/apache/incubator-openwhisk/blob/master/docs/triggers_rules.md)_, _[routes](https://github.com/apache/incubator-openwhisk/blob/master/docs/apigateway.md)_ (the “API gateway”), and _[activations](https://github.com/apache/incubator-openwhisk/blob/master/docs/actions.md)_. The `nim` command supports these entities when used individually, but not as part of a project.


### Using the Nimbella stack with an OpenWhisk installation

If you’re using `wsk` with some other OpenWhisk installation and using `nim` with the Nimbella stack, they will not interfere with each other. If you want to use `wsk` with the Nimbella stack, you can, but you should set the environment variable `WSK_CONFIG_FILE=$HOME/.nimbella/wskprops` so that `wsk` will use it instead of the `~/.wskprops`. This does not affect `nim`, which ignores `WSK_CONFIG_FILE`. If you sometimes use `wsk` with a different installation and sometimes with Nimbella, you have to change the environment accordingly.

**Note:** Although `nim` uses the OpenWhisk Node.js client internally, it takes steps to nullify the effect of any `__OW_*` variables in the environment to prevent collisions with other uses of the client.

### Credential management commands in nim vs. wsk

The `nim` command doesn’t read or write `~/.wskprops` the way the `wsk` binary does but instead replaces it with a more flexible [credential store](namespaces.md#view-the-credential-store). The `nim` command does maintain the file `~/.nimbella/wskprops` in sync with the credential store. This file has the same format as `~/.wskprops` and applies to the currently selected namespace.

See [Credential Management to Access Nimbella Namespaces](namespaces.md#credential-management-to-access-nimbella-namespaces).

### Project commands in nim vs. wsk

Note that the `project` command of `nim` is not a replacement for the `wsk` project. See [About Nimbella Projects](projects#about-nimbella-projects).

The `project` `deploy and project watch `commands can operate on a logical grouping of OpenWhisk entities as well as other types of resources.

See [Project-Level Deployment Commands](commands.md#project-level-deployment-commands).

### Entity management commands in nim vs. wsk

The `action`, `activation`, `namespace`, `package`, `route`, `rule` and `trigger` commands in nim each manage the corresponding type of entity as defined by Apache OpenWhisk. The syntax for these seven commands approximates that of like-named commands of the `wsk` binary provided by the Apache OpenWhisk project, except that `route` is used in place of api. The implementation of these commands is derived from the Adobe I/O Runtime open source project.

See [Entity Management Commands](commands.md#entity-management-commands).

### Using Whisk commands in switching namespaces

If you use the `wsk` command in conjunction with nim, note that the file ~/.nimbella/wskprops (_not_ ~/.wskprops) is updated on every switch of the target namespace via `nim auth`. You can connect your `wsk` to this Nimbella-maintained property file using the `WSK_CONFIG_FILE` environment variable.

### Working with other OpenWhisk hosts

Usually, a Nimbella developer has just one API host and all namespaces use the same one, but multiple API hosts can be accommodated as well.

*   If all of your namespaces have unique names, if some are on different API hosts, the API host is automatically switched when you switch the namespace.
*   If you happen to have identically named namespaces on different API hosts, then you must use the `--apihost` flag to disambiguate. Substitute the URL of your API host in the following examples.

```
> nim auth switch <namespace> --apihost <API host>
> nim project deploy <projectPath>... --target <namespace> --apihost <API host>
```

### Nimbella actions and OpenWhisk

The term _action_ is used to denote a serverless function, following [Apache OpenWhisk](http://openwhisk.org/) terminology, because the Nimbella stack builds on OpenWhisk. Actions are by default OpenWhisk [web action](https://github.com/openwhisk/openwhisk/blob/master/docs/webactions.md), which means the action is publicly accessible via a URL unless the project is configured. See xxx for information about how to construct the URL for a web action.

In Nimbella, as in OpenWhisk, the unit of authorization is called a _[namespace](https://github.com/apache/incubator-openwhisk/blob/master/docs/reference.md#namespaces-and-packages)_. As in all OpenWhisk deployments, a namespace contains [actions](https://github.com/apache/incubator-openwhisk/blob/master/docs/actions.md) that are optionally grouped into _[packages](https://github.com/apache/incubator-openwhisk/blob/master/docs/packages.md)_. (OpenWhisk has additional entities called _[rules](https://github.com/apache/incubator-openwhisk/blob/master/docs/triggers_rules.md)_, _[triggers](https://github.com/apache/incubator-openwhisk/blob/master/docs/triggers_rules.md)_, _[routes](https://github.com/apache/incubator-openwhisk/blob/master/docs/apigateway.md)_ (aka “API gateway”), and _[activations](https://github.com/apache/incubator-openwhisk/blob/master/docs/actions.md)_; the `nim` command supports these individually but not as part of a project.

Going beyond OpenWhisk, a Nimbella namespace contains additional resources, such as object store buckets for web content and database instances, which are managed as part of the namespace. The [Create a Nimbella Namespace](namespaces.md#create-a-nimbella-namespace) section explains how to obtain your first namespace. The [Create and Manage Multiple Namespaces](namespaces.md#create-and-manage-multiple-namespaces) section discusses how to obtain and manage additional namespaces.

### Annotations by the Nimbella deployer

OpenWhisk supports [annotations](https://github.com/apache/incubator-openwhisk/blob/master/docs/annotations.md) on actions and packages. The deployer generates an annotation of its own in each action and package that it deploys. See [Deployer Recordkeeping](deployer-features.md#deployer-recordkeeping).

### Project configuration

Here are some notes for `project.yml` configuration file modifiers if you’re familiar with OpenWhisk.

*   The `webSecure` action modifier has the same semantics that `--web-secure` has in the `wsk action create` command in OpenWhisk. (The `nim action create` command does not offer a similar flag). It generates the `require-whisk-auth` annotation according to whether you specify `false` (the default), a string value (a secret you select) or `true`.
</main>
