---
id: workbench-playground-exports
title: Workbench
sidebar_label: Workbench - Playground exports
---

# Export your function to your namespace.

**Note:** Unless you have an account with Nimbella, you will not be able to export functions to a namespace.

Once you've finalized the functionality you were building. You can export that code to your namespace.

- Steps to follow:
  - Remove everything from the `input parameters` section
  - Click the `Export Actions` button at the top of the Playground.

Once you do that, you can go back to the Workbench, run `action list` and see that action inside your namespace.

### Playground limitations.

The Playground is only for creating actions, testing them, and exporting them to your namespace. You cannot write front-end code using the Playground.

- The record of what you’ve saved is specific to a machine and browser type.
- If you don’t use the playground from that machine and browser for 30 days your playground actions are deleted.
- You can retain at most 10 actions.
- Actions must complete execution in 5 seconds.
- Actions may not exceed 128mb of memory.
- Actions are stateless: Nimbella does not provide key-value or object stores for playground actions.
