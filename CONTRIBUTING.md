### Contributing to the Nimbella Documentation

We are thankful that you're taking the time to read this contribution guide, and we are excited to work with you toward a positive contribution to the project.
This document outlines the process for contributing to the project.

### We welcome all contributions.

Contributions come in many different forms, not just code. Here are some quick tips:
- **Improving documentation**: If you found a typo, just make a pull request with the fix.
- **Adding new documentation**: If you are planning to write new documentation, please [open an issue first](../../issues/new/choose). This gives us a chance to provide guidance when necessary.
- **Requesting a new documentation**: [Open a "Feature Request"](../../issues/new?template=feature_request.md) and fill out details appropriately.
- **Changing existing documentation**: Please open an appropriate [issue](../../issues/new/choose) describing your proposed change before you create a pull request. This ensures consensus and allows us to work together toward positive outcomes.

### Contribution guidelines.

Please review and keep the following guidelines in mind. _If this is your first time contributing to an open source project on GitHub, we recommend this [video series](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github) to learn how to contribute._
- We have a [Code of Conduct](CODE_OF_CONDUCT.md), please review it so you are familiar with the project values.
- You agree that your contributions will be licensed under the [Apache 2.0 License](LICENSE).
- When you open a pull request with your contributions, **you are certifying that you wrote the code** in the corresponding patch pursuant to the [Developer Certificate of Origin](#developer-certificate-of-origin) included below for your reference.
- If you're contributing a new document, the [guide below](#creating-a-new-document) wil help you get started.

### Contact us.

We're always happy to help you with any issues you encounter. You may want to [join our Slack community](https://nimbella-community.slack.com/) to engage with us for a more rapid response.

---

### Creating a new document

Let's create a new document `greetings`

##### 1. Fork this repo & clone it.

```sh
$ git clone https://github.com/<username>/docs
```

##### 2. Create a new file named `greetings.md` inside the `docs` repository and under the docs folder.

```sh
$ cd docs && touch docs/greetings.md
```

##### 3. Add documentation content to the file

```sh
---
id: greetings
title: About Greetings
sidebar_label: About Greetings
---

## Information about the greeting
## Content about greeting
```

##### 5. Add the new document to sidebar.js

```sh
  Greeting: ['greetings']
```
The document is mapped to the sidebar by the id of the document as shown above

---

##### 6. Test the changes locally

```sh
  yarn install
  yarn start
```
The start command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server

---

### Developer Certificate of Origin

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
1 Letterman Drive
Suite D4700
San Francisco, CA, 94129

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.


Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```
