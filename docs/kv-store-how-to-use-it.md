---
id: basic-kv-commands
title: Basic KV Commands
sidebar_label: Basic KV Commands
---

There are several commands you can run with the CLI to interact with your Key-Value Storage. You can see the entire list of commands by running `nim kv` in the commands prompt.

In this document, we're going over a few commands you can use.

### Display a list all of your keys.

You can list all of your Key-Values.

Command:

```shell
nim kv list
```

### Get the value of a key.

You can get the value of a key in your command prompt.

```shell
nim kv get [keyName]
```

### Set a value for a key.

Here's how you can change the value of a key in your command prompt. In this example, we'll be using a key that is holding onto a number called `counter`.

```shell
nim kv set counter 42
OK

nim kv get counter
42
```

### Delete a key

If you do not need a Key, you can delete it.

```shell
nim kv del [keyValue]
```
