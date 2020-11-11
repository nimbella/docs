`nim rule`
==========

work with rules

* [`nim rule create NAME TRIGGER ACTION`](#nim-rule-create-name-trigger-action)
* [`nim rule delete NAME`](#nim-rule-delete-name)
* [`nim rule disable NAME`](#nim-rule-disable-name)
* [`nim rule enable NAME`](#nim-rule-enable-name)
* [`nim rule get NAME`](#nim-rule-get-name)
* [`nim rule list`](#nim-rule-list)
* [`nim rule status NAME`](#nim-rule-status-name)
* [`nim rule update NAME TRIGGER ACTION`](#nim-rule-update-name-trigger-action)

## `nim rule create NAME TRIGGER ACTION`

Create a Rule

```
USAGE
  $ nim rule create NAME TRIGGER ACTION

ARGUMENTS
  NAME     Name of the rule
  TRIGGER  Name of the trigger
  ACTION   Name of the action

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --json                   output raw json
  --key=key                client key
  --version                Show version
```

_See code: [src/commands/rule/create.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/rule/create.ts)_

## `nim rule delete NAME`

Delete a Rule

```
USAGE
  $ nim rule delete NAME

ARGUMENTS
  NAME  Name of the rule

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --json                   output raw json
  --key=key                client key
  --version                Show version
```

_See code: [src/commands/rule/delete.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/rule/delete.ts)_

## `nim rule disable NAME`

Disable a Rule

```
USAGE
  $ nim rule disable NAME

ARGUMENTS
  NAME  Name of the rule

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version
```

_See code: [src/commands/rule/disable.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/rule/disable.ts)_

## `nim rule enable NAME`

Enable a Rule

```
USAGE
  $ nim rule enable NAME

ARGUMENTS
  NAME  Name of the rule

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version
```

_See code: [src/commands/rule/enable.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/rule/enable.ts)_

## `nim rule get NAME`

Retrieves a Rule

```
USAGE
  $ nim rule get NAME

ARGUMENTS
  NAME  Name of the rule

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version
```

_See code: [src/commands/rule/get.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/rule/get.ts)_

## `nim rule list`

Retrieves a list of Rules

```
USAGE
  $ nim rule list

OPTIONS
  -c, --count              show only the total number of rules
  -i, --insecure           bypass certificate check
  -l, --limit=limit        [default: 30] Limit number of rules returned. Default 30
  -n, --name               sort results by name
  -s, --skip=skip          Skip number of rules returned
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --json                   output raw json
  --key=key                client key
  --name-sort              sort results by name
  --version                Show version
```

_See code: [src/commands/rule/list.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/rule/list.ts)_

## `nim rule status NAME`

Gets the status of a rule

```
USAGE
  $ nim rule status NAME

ARGUMENTS
  NAME  Name of the rule

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version
```

_See code: [src/commands/rule/status.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/rule/status.ts)_

## `nim rule update NAME TRIGGER ACTION`

Update a Rule

```
USAGE
  $ nim rule update NAME TRIGGER ACTION

ARGUMENTS
  NAME     Name of the rule
  TRIGGER  Name of the trigger
  ACTION   Name of the action

OPTIONS
  -i, --insecure           bypass certificate check
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --json                   output raw json
  --key=key                client key
  --version                Show version
```

_See code: [src/commands/rule/update.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/rule/update.ts)_
