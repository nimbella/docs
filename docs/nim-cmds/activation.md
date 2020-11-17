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
USAGE
  $ nim activation get [ACTIVATIONID]

OPTIONS
  -f, --filter=filter      the name of the activations to filter on (this flag may only be used with --last)
  -g, --logs               emit only the logs, stripped of time stamps and stream identifier
  -i, --insecure           bypass certificate check
  -l, --last               retrieves the most recent activation
  -q, --quiet              silence header which is printed before the log lines
  -r, --result             emit only the result
  -s, --skip=skip          exclude the first SKIP number of activations from the result
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

_See code: [src/commands/activation/get.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/activation/get.ts)_

## `nim activation list [ACTIVATION_NAME]`

Lists all the Activations

```
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

_See code: [src/commands/activation/list.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/activation/list.ts)_

## `nim activation logs [ACTIVATIONID]`

Retrieves the Logs for an Activation

```
USAGE
  $ nim activation logs [ACTIVATIONID]

OPTIONS
  -c, --count=count        [default: 1] used with --last, return the last `count` activation logs (up to 200)
  -f, --filter=filter      the name of the activations to filter on (this flag may only be used with --last)
  -i, --insecure           bypass certificate check
  -l, --last               retrieves the most recent activation logs
  -q, --quiet              silence header which is printed before the log lines
  -r, --strip              strip timestamp information and output first line only
  -s, --slice=slice        accepts "start[:count]" to slice log lines from "start" to end or up to "count" lines (use negative start to reverse index)
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --json                   attempt to interpret each log line as JSON and pretty print it
  --key=key                client key
  --version                Show version
```

_See code: [src/commands/activation/logs.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/activation/logs.ts)_

## `nim activation result [ACTIVATIONID]`

Retrieves the Results for an Activation

```
USAGE
  $ nim activation result [ACTIVATIONID]

OPTIONS
  -c, --count=count        [default: 1] used with --last, return the last `count` activation logs (up to 200)
  -f, --filter=filter      the name of the activations to filter on (this flag may only be used with --last)
  -i, --insecure           bypass certificate check
  -l, --last               retrieves the most recent activation result
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

_See code: [src/commands/activation/result.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/activation/result.ts)_
