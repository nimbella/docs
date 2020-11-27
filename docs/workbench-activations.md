---
id: workbench-activations
title: Access the Nimbella Workbench
sidebar_label: Access the Nimbella Workbench
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can access the Nimbella Workbench from the command line using the Nimbella CLI or directly from your browser.

- For the CLI, run `nim workbench login`
- From your browser: [https://apigcp.nimbella.io/wb/](https://apigcp.nimbella.io/wb/)

# The Nimbella Workbench - Activations.

The activation commands are a great way to keep track of the activity from actions, alarms, triggers, and rules.

```
activation list
```

The `activation list` command will list the recent activations that have occurred. It will also display information about queueing delays, container initialization, execution time, and failures of activations.

You can click on the individual IDs, which will automatically run `activation get` on them.

<img alt="activationed list id clicked on" src={useBaseUrl('/static/img/activation-list-id-clicked.gif')} />

```
activation get [activation ID]
```

The `activation get [activation ID]` command provides specific information about actions, alarms, triggers, and rules by providing the activation ID.
