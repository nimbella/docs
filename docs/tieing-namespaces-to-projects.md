---
id: namespace-to-projects
title: Tieing Namespaces to Projects
sidebar_label: Tieing Namespaces to Projects
---

## Tieing Namespaces To Projects

There is no _required_ mapping between projects and namespaces.  However, you will want to decide on the mapping you want and how to enforce that mapping within a team.

The Nimbella CLI provides some enforcement assistance for one commonly occuring use case, which is one in which

- each namespace belongs to a project
- a project can deploy to one or two namespaces (one for testing and one for production).

You impose this rule by creating a `project.yml` file in the root of an "owning" project.  This file can contain quite a bit of information, as outlined in [Adding project configuration](configuration.md).  For present purposes it needs to contain at least

```
targetNamespace:
  test: <namespace1>
  production: <namespace2>
```

Either `test` or `production` can be omitted.  When you deploy the project

- if you do not specify `--production`, it deploys to the `test` namespace, if any
- if you specify `--production`, it deploys to the `production` namespace, if any.

Once you have deployed the project to a namespace, it will record its ownership of the namespace in the credential store.  It also records the role of the namespace (test or production).  Once this happens, other projects will not be able to deploy to it.  You can observe the results in `nim auth list`.

```
  Namespace            Current Storage   Redis Production Project
  johndoeg-5skkrmhfzyo     no     yes     yes      no     mygithub/myrepo/myproject
  johndoeg-grinjpsjnuh     no     yes     yes     yes     mygithub/myrepo/myproject
```

Be aware that this enforcement is purely local.  In teams, consistent enforcement requires committing the project so that every team member uses the same `project.yml`.  The ownership must be re-established (by deploying the project) when switching machines or when a new team member first begins working in the project.

The way the project name is recorded depends on whether the project is inside a GitHub repo or repo clone.  If this case is detected, the project name is recorded in a way that will be consistent across all the different ways of referring to the project, even if the location of the clone were to move or you use the "deploy from GitHub" capability.  However, if the project is not source controlled in GitHub, its full path on the local file system is recorded.

Ownership may be removed from namespaces by using `nim namespace free <namespace>`.   This may be needed when you have changed the ownership information in projects or moved projects within the file system or repository.
