`nim trigger`
=============

work with triggers

* [`nim trigger create TRIGGERNAME`](#nim-trigger-create-triggername)
* [`nim trigger delete TRIGGERPATH`](#nim-trigger-delete-triggerpath)
* [`nim trigger fire TRIGGERNAME`](#nim-trigger-fire-triggername)
* [`nim trigger get TRIGGERPATH`](#nim-trigger-get-triggerpath)
* [`nim trigger list`](#nim-trigger-list)
* [`nim trigger update TRIGGERNAME`](#nim-trigger-update-triggername)

## `nim trigger create TRIGGERNAME`

Create a trigger

```
USAGE
  $ nim trigger create TRIGGERNAME

ARGUMENTS
  TRIGGERNAME  The name of the trigger

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -f, --feed=feed                        trigger feed action name
  -i, --insecure                         bypass certificate check
  -p, --param=param                      parameter values in KEY VALUE format
  -u, --auth=auth                        whisk auth
  -v, --verbose                          Verbose output
  --apihost=apihost                      whisk API host
  --apiversion=apiversion                whisk API version
  --cert=cert                            client cert
  --debug=debug                          Debug level output
  --help                                 Show help
  --key=key                              client key
  --version                              Show version
```

_See code: [src/commands/trigger/create.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/trigger/create.ts)_

## `nim trigger delete TRIGGERPATH`

Delete a Trigger

```
USAGE
  $ nim trigger delete TRIGGERPATH

ARGUMENTS
  TRIGGERPATH  The name of the trigger, in the format /NAMESPACE/NAME

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

_See code: [src/commands/trigger/delete.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/trigger/delete.ts)_

## `nim trigger fire TRIGGERNAME`

Fire a Trigger

```
USAGE
  $ nim trigger fire TRIGGERNAME

ARGUMENTS
  TRIGGERNAME  The name of the trigger

OPTIONS
  -P, --param-file=param-file  FILE containing parameter values in JSON format
  -i, --insecure               bypass certificate check
  -p, --param=param            parameter values in KEY VALUE format
  -u, --auth=auth              whisk auth
  -v, --verbose                Verbose output
  --apihost=apihost            whisk API host
  --apiversion=apiversion      whisk API version
  --cert=cert                  client cert
  --debug=debug                Debug level output
  --help                       Show help
  --key=key                    client key
  --version                    Show version
```

_See code: [src/commands/trigger/fire.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/trigger/fire.ts)_

## `nim trigger get TRIGGERPATH`

Get a Trigger

```
USAGE
  $ nim trigger get TRIGGERPATH

ARGUMENTS
  TRIGGERPATH  The name/path of the trigger, in the format /NAMESPACE/NAME

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

_See code: [src/commands/trigger/get.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/trigger/get.ts)_

## `nim trigger list`

Lists all of your Triggers

```
USAGE
  $ nim trigger list

OPTIONS
  -c, --count              show only the total number of triggers
  -i, --insecure           bypass certificate check
  -l, --limit=limit        [default: 30] only return LIMIT number of triggers from the collection (default 30)
  -n, --name               sort results by name
  -s, --skip=skip          exclude the first SKIP number of triggers from the result
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

_See code: [src/commands/trigger/list.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/trigger/list.ts)_

## `nim trigger update TRIGGERNAME`

Update or create a Trigger

```
USAGE
  $ nim trigger update TRIGGERNAME

ARGUMENTS
  TRIGGERNAME  The name of the trigger

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -p, --param=param                      parameter values in KEY VALUE format
  -u, --auth=auth                        whisk auth
  -v, --verbose                          Verbose output
  --apihost=apihost                      whisk API host
  --apiversion=apiversion                whisk API version
  --cert=cert                            client cert
  --debug=debug                          Debug level output
  --help                                 Show help
  --key=key                              client key
  --version                              Show version
```

_See code: [src/commands/trigger/update.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/trigger/update.ts)_
