### Staging Area For New Documentation Set

See outline in [github issue 862 in the main repo](https://github.com/nimbella-corp/main/issues/862)

- but that outline is subject to revision as more writing appears here
- perhaps a limited, coarse-grained form of the outline should be inline in this README?

Eventually this file should be replaced by an overview document for the documentation set which will act as a guide to the whole.
When we get to that point

- this entire directory can move to a public repo
- documentation in this repo's `doc` directory that is subsumed by this documentation set can be removed
- the documentation build for our releases adjusted accordingly

One thing that this directory contains is a snapshot of the main doc broken into individual md files by major
chapter heading.  This will be the basis for revising and restructuring the parts of the eventual documentation
that have already been authored as part of the main document.  The following shows the ordering of these smaller
markdown files in the original document.  There is no intent to retain that ordering, this is just for convenience
in cross-referencing where things came from.

- [Your Nimbella cloud account](account.md)
- [Install the Nimbella Command Line Tool (nim)](install.md)
- [nim command overview](commands.md)
- [The Nimbella workbench](workbench.md)
- [Nimbella namespaces](namespaces.md)
- [Overview of Nimbella projects, actions, and deployment](deployer-overview.md)
- [Example: Create and deploy a project with a single action](single-action-example.md)
- [About projects](projects.md)
- [About actions](actions.md)
- [Adding static web content](web-content.md)
- [About the Nimbella deployer](deployer-features.md)
- [Incorporating build steps for actions and web content](building.md)
- [Tieing Namespaces To Projects](tieing-namespaces-to-projects.md)
- [Adding project configuration](configuration.md)
- [Information for OpenWhisk developers](nim-vs-wsk.md)
