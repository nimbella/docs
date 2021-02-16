---
id: workbench-playground-introduction
title: Workbench
sidebar_label: Workbench - Playground intro
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Playground walkthrough.

The playground is an interactive environment where you can build and test serverless functions without having to create them with your namespace. You can access it by clicking on the `playground` button or type `playground` in the workbench.

To display display the menu in the Workbench, run `help`.
To remove the menu, run `clear`.

## What you can do in the Playground?

### Select the right programming language for you.

At the top of the workbench you can click the button that says "JavaScript" and select from a wide range of programming languages. You can pick JavaScript, Typescript, Python, Swift, Java, Go, or PHP.

<img alt="playground languages" src={useBaseUrl('/static/img/playground_languages.png')} />

### Test your code by passing in arguments.

- How to start testing:

  - Click the run button to run the command and test the output.
  - Change the value in `input parameters` to test the argument (For example, try changing “nimbella” to your name and see what happens)

    <img alt="run commands in playground" src={useBaseUrl('/static/img/run_commands_in_playground.gif')} />

  - Click the publish button to get a secure domain for the function. Paste that domain into your browser. Test the arguments by adding `?name=nimbella` to the end of the URL.
    <img alt="playground test publish button" src={useBaseUrl('/static/img/playground-test-publish-button.gif')} />

### Limitations of arguments.

When passing in arguments, the arguments must be a valid JSON object.
