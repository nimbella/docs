`nim workbench`
===============

open Nimbella workbench with login or command

* [`nim workbench login`](#nim-workbench-login)
* [`nim workbench run [COMMAND]`](#nim-workbench-run-command)

## `nim workbench login`

Open the Nimbella Workbench, logging in with current credentials

```
Open the Nimbella Workbench, logging in with current credentials

USAGE
  $ nim workbench login

OPTIONS
  -p, --preview  Open preview workbench
  -v, --verbose  Greater detail in error messages
  --help         Show help

ALIASES
  $ nim wb login
```

_See code: [src/commands/workbench/login.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/workbench/login.ts)_

## `nim workbench run [COMMAND]`

Open the Nimbella Workbench and run a command there

```
Open the Nimbella Workbench and run a command there

USAGE
  $ nim workbench run [COMMAND]

ARGUMENTS
  COMMAND  An initial command to run

OPTIONS
  -p, --preview  Open preview workbench
  -v, --verbose  Greater detail in error messages
  --help         Show help

ALIASES
  $ nim wb run
```

_See code: [src/commands/workbench/run.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/workbench/run.ts)_
