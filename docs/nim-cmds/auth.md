`nim auth`
==========

manage Nimbella and Github credentials

* [`nim auth current`](#nim-auth-current)
* [`nim auth export [NAMESPACE]`](#nim-auth-export-namespace)
* [`nim auth github`](#nim-auth-github)
* [`nim auth list`](#nim-auth-list)
* [`nim auth login [TOKEN]`](#nim-auth-login-token)
* [`nim auth logout [NAMESPACE]`](#nim-auth-logout-namespace)
* [`nim auth refresh [NAMESPACE]`](#nim-auth-refresh-namespace)
* [`nim auth switch NAMESPACE`](#nim-auth-switch-namespace)

## `nim auth current`

Get current namespace with optional details

```
Get current namespace with optional details

USAGE
  $ nim auth current

OPTIONS
  -v, --verbose  Greater detail in error messages
  --all          Show all fields
  --apihost      Show API host
  --auth         Show API key
  --help         Show help
  --name         Show namespace name
  --production   Show production status
  --project      Show owning project
  --redis        Show redis status
  --storage      Show storage status
  --web          Show web domain (if available)
```

_See code: [src/commands/auth/current.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/auth/current.ts)_

## `nim auth export [NAMESPACE]`

Make a token for switching to another machine or web browser

```
Make a token for switching to another machine or web browser

USAGE
  $ nim auth export [NAMESPACE]

ARGUMENTS
  NAMESPACE  The namespace to export (omit for current namespace)

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host serving the namespace
  --help             Show help
  --json             Get response as a JSON object with a "token:" member
  --non-expiring     Generate non-expiring token (for functional ids and integrations)
```

_See code: [src/commands/auth/export.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/auth/export.ts)_

## `nim auth github`

Manage GitHub accounts

```
Manage GitHub accounts

USAGE
  $ nim auth github

OPTIONS
  -a, --add            Add a second or subsequent GitHub account interactively
  -d, --delete=delete  Forget a previously added GitHub account
  -i, --initial        Add an initial GitHub account interactively
  -l, --list           List previously added GitHub accounts
  -s, --switch=switch  Switch to using a particular previously added GitHub account
  -v, --verbose        Greater detail in error messages
  --help               Show help
  --show=show          Show the access token currently associated with a username
  --token=token        The GitHub token when adding an account manually
  --username=username  The GitHub username when adding an account manually
```

_See code: [src/commands/auth/github.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/auth/github.ts)_

## `nim auth list`

List all your Nimbella namespaces

```
List all your Nimbella namespaces

USAGE
  $ nim auth list

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  Only list namespaces for the specified API host
  --help             Show help
```

_See code: [src/commands/auth/list.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/auth/list.ts)_

## `nim auth login [TOKEN]`

Gain access to a Nimbella namespace

```
Gain access to a Nimbella namespace

USAGE
  $ nim auth login [TOKEN]

ARGUMENTS
  TOKEN  String provided by Nimbella Corp

OPTIONS
  -u, --auth=auth    API key to use for authentication
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host to use for authentication
  --help             Show help

ALIASES
  $ nim login
```

_See code: [src/commands/auth/login.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/auth/login.ts)_

## `nim auth logout [NAMESPACE]`

Drop access to Nimbella namespaces

```
Drop access to Nimbella namespaces

USAGE
  $ nim auth logout [NAMESPACE]

ARGUMENTS
  NAMESPACE  The namespace(s) you are dropping

OPTIONS
  -f, --force        Just do it, omitting confirmatory prompt
  -v, --verbose      Greater detail in error messages
  --all              log out of all namespaces (or, all on the given API host)
  --apihost=apihost  API host serving the namespace(s)
  --help             Show help

ALIASES
  $ nim logout
```

_See code: [src/commands/auth/logout.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/auth/logout.ts)_

## `nim auth refresh [NAMESPACE]`

Refresh Nimbella namespace credentials by re-reading the latest from the backend

```
Refresh Nimbella namespace credentials by re-reading the latest from the backend

USAGE
  $ nim auth refresh [NAMESPACE]

ARGUMENTS
  NAMESPACE  The namespace to refresh (omit for current namespace)

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host serving the namespace
  --help             Show help
```

_See code: [src/commands/auth/refresh.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/auth/refresh.ts)_

## `nim auth switch NAMESPACE`

Switch to a different Nimbella namespace

```
Switch to a different Nimbella namespace

USAGE
  $ nim auth switch NAMESPACE

ARGUMENTS
  NAMESPACE  The namespace you are switching to

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host serving the target namespace
  --help             Show help
```

_See code: [src/commands/auth/switch.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/auth/switch.ts)_
