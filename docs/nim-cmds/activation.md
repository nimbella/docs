`nim activation`
================

work with activations

* [`nim activation get [ACTIVATIONID]`](#nim-activation-get-activationid)
* [`nim activation list [ACTIVATION_NAME]`](#nim-activation-list-activation_name)
* [`nim activation logs [ACTIVATIONID]`](#nim-activation-logs-activationid)
* [`nim activation result [ACTIVATIONID]`](#nim-activation-result-activationid)

## `nim activation get [ACTIVATIONID]`

Retrieves an Activation

```
Retrieves an Activation

USAGE
  $ nim activation get [ACTIVATIONID]

OPTIONS
  -a, --action=action      Fetch logs for a specific action
  -g, --logs               Emit only the logs, stripped of time stamps and stream identifier
  -i, --insecure           bypass certificate check
  -l, --last               Fetch the most recent activation (default)
  -q, --quiet              Suppress last activation information header
  -r, --result             Emit only the result
  -s, --skip=skip          SKIP number of activations
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

_See code: [src/commands/activation/get.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/activation/get.ts)_

## `nim activation list [ACTIVATION_NAME]`

Lists all the Activations

```
Lists all the Activations

USAGE
  $ nim activation list [ACTIVATION_NAME]

OPTIONS
  -c, --count              show only the total number of activations
  -f, --full               include full activation description
  -i, --insecure           bypass certificate check
  -l, --limit=limit        only return LIMIT number of activations from the collection with a maximum LIMIT of 200 activations (default 30)
  -s, --skip=skip          exclude the first SKIP number of activations from the result
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --json                   output raw json
  --key=key                client key
  --since=since            return activations with timestamps later than SINCE; measured in milliseconds since Th, 01, Jan 1970
  --upto=upto              return activations with timestamps earlier than UPTO; measured in milliseconds since Th, 01, Jan 1970
  --version                Show version
```

_See code: [src/commands/activation/list.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/activation/list.ts)_

## `nim activation logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
Retrieves the Logs for an Activation

USAGE
  $ nim activation logs [ACTIVATIONID]

OPTIONS
  -a, --action=action      Fetch logs for a specific action
  -d, --deployed           Fetch logs for all actions deployed under a specific package
  -i, --insecure           bypass certificate check
  -l, --last               Fetch the most recent activation logs (default)
  -m, --manifest           Fetch logs for all actions in the manifest
  -n, --limit=limit        [default: 1] Fetch the last LIMIT activation logs (up to 200)
  -o, --poll               Fetch logs continuously
  -p, --package=package    Fetch logs for a specific package in the manifest
  -r, --strip              strip timestamp information and output first line only
  -t, --tail               Fetch logs continuously
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  -w, --watch              Fetch logs continuously
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --version                Show version
```

_See code: [src/commands/activation/logs.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/activation/logs.ts)_

## `nim activation result [ACTIVATIONID]`

Retrieves the Results for an Activation

```
Retrieves the Results for an Activation

USAGE
  $ nim activation result [ACTIVATIONID]

OPTIONS
  -a, --action=action      Fetch results for a specific action
  -i, --insecure           bypass certificate check
  -l, --last               Fetch the most recent activation result (default)
  -n, --limit=limit        [default: 1] Fetch the last LIMIT activation results (up to 200)
  -q, --quiet              Suppress last activation information header
  -s, --skip=skip          SKIP number of activations
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

_See code: [src/commands/activation/result.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/activation/result.ts)_
