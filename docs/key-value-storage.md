---
id: key-value-storage
title: Key Value Storage
sidebar_label: Key Value Storage
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Your Nimbella account has been provisioned with Key-Value Storage and Object Storage. In this document, we are going to cover Key-Value Storage.

A Key-Value Store, or KV for short, acts as a database where you create keys and apply values to those keys.

The following `nim` command will show the current contents of the KV. The command will not show any output if the KV is empty.

```
nim key-value list
```

This document divides into these parts:

- Conceptual Overview
- Using a Key-Value Storage inside actions using a Nimbella SDK
  - The `nodejs` SDK
  - The `php` SDK
  - The `python` SDK
- Common Redis commands

### Conceptual Overview

A KV behaves like a database where you can create keys, apply values to those keys, and then call on them to extract the data that you need.

In this visual example, you can store user info, such as their City, State, and Country, and apply the correct values to them. This allows you to keep track of data and request the data when needed.

<img alt="Nimbella Key-Value Storage Example" src={useBaseUrl('/img/kv-storage-ex.png')} />

The Nimbella KV uses Redis as the underlying implantation. Redis is data structure store that is used as a database for your actions.

### Using a Key-Value Storage inside actions using a Nimbella SDK

Nimbella provides SDKs for use within actions. Currently, these exist for [NodeJS](https://github.com/nimbella/nimbella-sdk-nodejs), [PHP](https://github.com/nimbella/nimbella-sdk-php), and [Python](https://github.com/nimbella/nimbella-sdk-python). An SDK is under development for `java` and the plan is to eventually cover all supported languages.

### Using the `nodejs` SDK

The `nodejs` SDK is a Node.js library that allows you to interact with Nimbella services.

In an action written in JavaScript, you should include

<Tabs
defaultValue="nodejs"
values={[
{label: 'nodejs', value: 'nodejs'},
]}>

<TabItem value="nodejs">

```
const nim = require('@nimbella/sdk')
```

</TabItem>
</Tabs>

To obtain a client for use with your data store, use

<Tabs
defaultValue="nodejs"
values={[
{label: 'nodejs', value: 'nodejs'},
]}>

<TabItem value="nodejs">

```
const redis = nim.redis();
```

</TabItem>
</Tabs>

You can view our [GitHub Repo by clicking here](https://github.com/nimbella/nimbella-sdk-nodejs)

### The `php` SDK

The `php` SDK is a PHP library that allows you to interact with Nimbella services.

In an action written in PHP, you should include

<Tabs
defaultValue="php"
values={[
{label: 'php', value: 'php'},
]}>

<TabItem value="php">

```
use Nimbella\Nimbella;
```

</TabItem>
</Tabs>

You can view our [GitHub Repo by clicking here](https://github.com/nimbella/nimbella-sdk-php).

To obtain a client for use with your data store, use

<Tabs
defaultValue="php"
values={[
{label: 'php', value: 'php'},
]}>

<TabItem value="php">

```
$redis = $nim->redis();
```

</TabItem>
</Tabs>

### The `python` SDK

The `python` SDK is a Python package that allows you to interact with Nimbella services.

In an action written in Python, you should include

<Tabs
defaultValue="py"
values={[
{label: 'python', value: 'py'},
]}>

<TabItem value="py">

```
import nimbella
```

</TabItem>
</Tabs>

To obtain a client for use with your data store, use

<Tabs
defaultValue="py"
values={[
{label: 'python', value: 'py'},
]}>

<TabItem value="py">

```
redis = nimbella.redis()
```

</TabItem>
</Tabs>

You can view our [GitHub Repo by clicking here](https://github.com/nimbella/nimbella-sdk-python).

### Common Redis commands

Here are some commonly used commands for Redis.

- [set](https://redis.io/commands/set) - Set `key` to hold the string value.
- [get](https://redis.io/commands/get) - Get the value of `key`.
- [incr](https://redis-py.readthedocs.io/en/stable/#redis.Redis.incr) -- Increments the value of the key.
- [exist](https://redis.io/commands/exists) - Returns if `key` exist.
- [del](https://redis.io/commands/del) - Removes the specified keys.

### Debugging your functions without redeploying

A nice feature when using KV is that you can change the behavior of the functions without redeploying!

In this example, you can use the debugging functionality in your KV.

<Tabs
defaultValue="nodejs"
values={[
{label: 'nodejs', value: 'nodejs'},
]}>

<TabItem value="nodejs">

```
const nimbella = require('@nimbella/sdk')
const kv = nimbella.redis()

async function main(args) {
    if (await kv.getAsync('DEBUG_LEVEL') === 'debug') {
        console.log('debugging enabled')
    }

    ...
}
```

</TabItem>
</Tabs>
