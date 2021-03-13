---
id: namespaces
title: Namespace
sidebar_label: Namespace
---

## Nimbella namespaces

You must have permission to use a specific namespace on the Nimbella platform in order to deploy a nim project and use many other nim capabilities.  A Nimbella namespace comes with storage resources which are managed as part of the namespace.

This section contains information about how to create a Nimbella namespace, view the credential store, and perform other tasks involving namespaces.


### Create a Nimbella namespace

Here’s how to create a Nimbella workspace in `nim`.

**If you have not yet downloaded and installed the Nimbella Command Line Tool:**

Visit [nimbella.com](https://nimbella.com) and press the signup button (it's free).  Follow instructions from that point.

**If you have already downloaded and installed the Nimbella Command Line Tool:**

Issue

```shell
> nim auth login
```

After going through the signup process (which typically takes one or two minutes), `nim` will return having fully provisioned your account.  Occasionally, if the process takes too long, `nim` may time out and encourage you to do another `nim auth login` in a minute or two.  The second attempt should succeed quickly.

In general (e.g.) when switching to a different machine you can just issue

```shell
> nim auth login
```

This will connect the tool to your account (it may or may not ask for identification again, depending on whether or not your browser remembers this information).

### View the credential store

A typical namespace is provisioned with the following:

*   A web content [file store](file-stores.md), and a second file store for data storage.  These are always provided as a pair and summarized as 'File-Store' when presented in a list.
*   A [key-value store](key-value-storage.md) implemented using a [Redis](https://redis.io) instance.
*   A DNS domain name for web content
*   A set of OpenWhisk resources

After you’ve created a namespace, you can view it and information about it in the _credential store_.

**To view the credential store in nim:**

*   Use the `auth list` command, as follows:

```shell
> nim auth list
  Namespace            Current File-Store   Key-Val Production Project
✓ <your namespace>       yes     yes          yes     no       <any>
```

As a new user, your credential store has only one entry, but, if you or your team acquires more namespaces, there can be multiple entries.
Here’s more information about the table displayed in the response:

*   The **Current** column displays `yes` for exactly one namespace.
    - The Nimbella deployer will deploy this namespace in the absence of other directives.
    - This entry is also marked by a check mark for added emphasis
*   The **File-Store** column indicates whether the namespace has provision for web content storage as discussed in [Adding static web content](web-content.md). There is also a second object storage bucket available for general use, not connected to the web.
*   The **Key-Val** column indicates whether the namespace has a Redis key-value storage instance available for use by actions.
*   The **Production** and **Project** columns become meaningful as you begin to define Nimbella [projects](projects.md) and wish to [tie namespaces to projects](tieing-namespaces-to-projects.md).

### Create and manage multiple namespaces

There are a number of reasons why it can be useful to have multiple namespaces. For example, while multiple applications can share a namespace, there are also good reasons to isolate them.

**To create additional namespaces:**

1.  [Contact Nimbella Support](https://nimbella.com/contact).
2.  Identify yourself as an existing developer and provide the email or GitHub account you used for signing up initially.
3.  Wait for an email to arrive containing instructions for adding the additional namespace to your credential store.

**To view all of your namespaces:**

Follow the procedure to [view your credential store](#view-the-credential-store).
A newly added namespace is automatically set as current, indicated by a checkmark and a **yes** in the **Current** column.

#### Switch between namespaces

If you have more than one namespace, you can switch between them without needing to log into your account again by using the following command:

```shell
nim auth switch <namespace>
```

This changes the target namespace for future project deployments.  Most namespace names are long and tedious to type, so we provide an abbreviation capability.

```shell
nim auth switch dt-
```

will switch to a namespace uniquely identified by the characters `dt` followed by other characters.

#### Manage multiple namespaces

The easiest way to manage multiple namespaces is to maintain the rule that each namespace is tied to a project and each project is tied to one or two namespaces. To do this, add the following top-level directive to a _project.yml_ configuration file for each project:

```yaml
targetNamespace: <namespace>
```

or

```yaml
targetNamespace:
  test: <namespace1>
  production: <namespace2>
```

A more complete explanation of how `targetNamespace` affects project deployment is provided in [Tieing namespaces to projects](tieing-namespaces-to-projects.md).

There are more complex development scenarios, in which you would not want to correlate projects and namespaces so strongly.  For those cases, we also provide the `--target` directive of the `project deploy` command:

```shell
nim project deploy <projectPath>... --target <namespace>
```

**Notes:**

*   If your project has a _project.yml_ configuration file with a `targetNamespace` directive and also uses the `--target` option in a `project deploy` command, the latter takes precedence.

*   For more information about using _project.yml_ files to configure more complex projects, see [Adding Project Configuration](configuration.md).

