---
id: workbench-deploy-from-github
title: Workbench
sidebar_label: Workbench - Deploy from GitHub
---

# Deploy from GitHub.

What's nice about the Workbench is that you can deploy your projects directly from your GitHub repositories.

To deploy a project from a directory, run `project deploy github:username/directory`.

When deploying a project from GitHub, you have to specify that it's from GitHub by adding `github:` to the front of the project path, then add your `username` and then add `/directory` to specify which directory you want.

To deploy from a specific branch, run `project deploy github:username/directory/tree/branch_name`.

To run an example of a working `project deploy` command, run ``project deploy github:nimbella/demo-projects/visits` to deploy our page visitor demo app.

**Note**: If you get an error saying you don't have permission to deploy from GitHub, run this command: `nim auth github --initial`. This command will only work if you have a GitHub account, which you will need to acquire separately.

### Limitations for deploying from GitHub.

Not all projects can be deployed from the Workbench.

- Limitations:
  "If the project requires building (see [ref](https://github.com/nimbella-corp/nimbella-cli/blob/master/newdoc/building.md)), the build will be run for you in the cloud. This may fail if the build exceeds the time limits or memory limits allotted by our remote build capability."

# Get help.

Are you experiencing an issue with the workbench? Then please submit an issue to our [GitHub account](https://github.com/nimbella/nimbella-cli/issues).
