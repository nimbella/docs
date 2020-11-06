---
id: deployer-overview
title: Deployer Overview
sidebar_label: Deployer Overview
---

## Overview of Nimbella projects, actions, and deployment

A Nimbella _project_ is a logical grouping of static web content and _actions_. An action is a function or program written in a programming language supported by the Nimbella Cloud (e.g., JavaScript, TypeScript, PHP, Python, Java,  Go, or Swift). An action usually produces some output in response to an event. For example, an action can be used to convert an image to text, update a stock portfolio, or generate a QR code. Actions are usually grouped into _packages_, but you can create them without a package qualifier if you wish.

Projects are _deployed_ as a unit into your Nimbella Cloud namespace to make them visible to your end-users to the extent that you wish. Your namespace can have any number of projects that you want. An application can have any number of projects to achieve its full functionality. This modular approach also lets you share projects across apps and namespaces.

On the other hand, `nim` provides some special support for the model where namespaces are tied to specific projects, which have the sole right to deploy to them.  It is possible to tie two namespaces to each project, one for testing, one for production.  The support for this model is described in [tieing namespaces to projects](tieing-namespaces-to-projects.md).

Projects can contain actions, or actions plus static web content, or actions plus web content plus build steps. The following sections show you how to go from simple to complex:

*   [Example: Create and deploy a project with a single action](single-action-example.md)
*   [Add static web content](web-content.md) to a project
*   [Add build steps](building.md) to a project

Projects can be deployed without any configuration, but in more complex cases you can
[add a project configuration](configuration.md).

Finally, there are variations in how to [deploy projects](projects.md), including [incremental deployment](deployer-features.md#deploying-projects-incrementally) to reduce deployment time, especially during project development.
