---
id: install
title: Install CLI
sidebar_label: Install CLI
---

## Install the Nimbella Command Line Tool (nim)

In most cases, we recommend that you use nim as a command to be invoked globally from shells or scripts. Here are the advantages of shell invocation:

*   The CLI is self-contained and has no dependencies on previously installed software.
*   You get automated update services when new versions are available.

If you don’t want a global installation but rather want to make nim a dependency of some other package, _and your node version is at least 10.0_, you can install it as a dependency with npm or yarn. See the second procedure.

### Install nim globally

1. Install nim according to your operating system:
   *   On Windows, download and run [the Windows installer](https://apigcp.nimbella.io/downloads/nim/win/nim-x64.exe).
   *   On Mac, download and run [the Mac installer](https://apigcp.nimbella.io/downloads/nim/macos/nim.pkg).
   *   On Linux, run the following script:
       `curl https://apigcp.nimbella.io/downloads/nim/nim-install-linux.sh | sudo bash`
2. When the installation completes, run the following command: `nim update`

The `nim update` command verifies that nim is installed and capable of self-updating. If the initial installation happens not to be the latest version, the update step also corrects that.

### Install nim as a dependency

Use this method only to make nim a dependency of some other package. To invoke nim globally, use the previous procedure.

**Notes:**

*   When installed as a dependency, the `nim update` command will not work. You have to do a fresh install to get later versions.
*   This form of installation requires you to have `node` installed at a minimum version of 10.0.

1. Run either of the following commands, depending on whether you want to use npm or yarn:
  *   For npm: `npm install https://apigcp.nimbella.io/downloads/nim/nimbella-cli.tgz`
  *   For yarn: `yarn add https://apigcp.nimbella.io/downloads/nim/nimbella-cli.tgz`

2. When installation finishes, execute nim locally to the package into which it has been incorporated with the following command. For example using `npx nim ...`
