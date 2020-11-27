---
id: stateful-api-examples
title: Stateful API examples
sidebar_label: Stateful API Examples
---

import useBaseUrl from '@docusaurus/useBaseUrl';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

With Nimbella, you can keep track of the session state within your serverless functions using our built-in Key-Value storage.

### The right language for the job

There are several languages you can use to build your serverless functions. Such as JavaScript, Python, Java, Swift, Ruby, Go, and PHP.

### The Nimbella SDK

The Nimbella Software Developer Kit (SDK) is used for both Key-Value and Object Stores to work with Nimbella services locally. We have several SDKs that you can apply to your APIs, such as one for [NodeJS](https://www.npmjs.com/package/@nimbella/sdk), [Python](https://pypi.org/project/nimbella/), and [PHP](https://packagist.org/packages/nimbella/nimbella). There will be more SDKs released in the future. If you have a request for an SDK for a specific language, you submit a request to our [GitHub account](https://github.com/nimbella/nimbella-cli/issues).

<img alt="sdk examples" src={useBaseUrl('/static/img/sdk-examples.png')} />

### Using Redis

Redis is a Key-Value store used to keep track of the session state. It comes natively with Nimbella, so you don't have to download and configure Redis into your application.

A Key-Value store acts as a database that you can call on. You can create keys and apply values to them.

<img alt="kv storage example" src={useBaseUrl('/static/img/kv-storage-ex.png')} />

# Example: Using Redis to track page visits

Let's say you want to keep track of how many people visit your application. Doing that is as simple as calling on Redis from Nimbella in your serverless function, creating a variable to keep track of the count, telling Redis to update the keys value, and returning it.

Here is an example of the same serverless function that calls on Redis written in three different languages.

<!-- test
test -->
<!-- test -->

<Tabs
defaultValue="js"
values={[
{label: 'Javascript', value: 'js'},
{label: 'Python', value: 'py'},
{label: 'Php', value: 'php'},
]}>
<TabItem value="js">

```
const nimbella = require('@nimbella/sdk')
const kv = nimbella.redis()

const main = async args => {
    const count = await kv.incrAsync('page-visits')
    return { 'body': count }
}
```

  </TabItem>
  <TabItem value="py">

```
import nimbella
kv = nimbella.redis()

def main(args):
    global kv
    count = kv.incr('page-visits')
    return { 'body': count }
```

  </TabItem>
  <TabItem value="php">

```
<?php

use Nimbella\Nimbella;
$kv = (new Nimbella())->redis();

function main(array $args): array {
  global $kv;
  $count = $kv->incr('page-visits');
  return [ 'body' => $count ];
}
```

  </TabItem>
</Tabs>

Using this serverless function is as simple as calling it every time the page loads.

<img alt="page visits example" src={useBaseUrl('/static/img/page-visits-ex.png')} />

Here's an example of the frontend responding to the API call.

<img alt="page visits example" src={useBaseUrl('/static/img/page-visits-ex-result.png')} />

# Limitations

With a free tier account, your limit is 25 functions and 32 MB of Key-Value storage. You can learn more about our pricing by [viewing our pricing page](https://nimbella.com/pricing/platform).
