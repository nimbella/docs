`nim action`
============

work with actions

* [`nim action create ACTIONNAME [ACTIONPATH]`](#nim-action-create-actionname-actionpath)
* [`nim action delete ACTIONNAME`](#nim-action-delete-actionname)
* [`nim action get ACTIONNAME`](#nim-action-get-actionname)
* [`nim action invoke ACTIONNAME`](#nim-action-invoke-actionname)
* [`nim action list [PACKAGENAME]`](#nim-action-list-packagename)
* [`nim action update ACTIONNAME [ACTIONPATH]`](#nim-action-update-actionname-actionpath)

## `nim action create ACTIONNAME [ACTIONPATH]`

Creates an Action

```
USAGE
  $ nim action create ACTIONNAME [ACTIONPATH]

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -E, --env-file=env-file                FILE containing environment variables in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -e, --env=env                          environment values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -l, --logsize=logsize                  Maximum log size LIMIT in KB for the Action
  -m, --memory=memory                    Maximum memory LIMIT in MB for the Action
  -p, --param=param                      parameter values in KEY VALUE format
  -t, --timeout=timeout                  Timeout LIMIT in milliseconds after which the Action is terminated
  -u, --auth=auth                        whisk auth
  -v, --verbose                          Verbose output
  --apihost=apihost                      whisk API host
  --apiversion=apiversion                whisk API version
  --binary                               treat code artifact as binary
  --cert=cert                            client cert
  --debug=debug                          Debug level output
  --docker=docker                        use provided Docker image (a path on DockerHub) to run the action
  --help                                 Show help
  --json                                 output raw json
  --key=key                              client key
  --kind=kind                            the KIND of the action runtime (example: swift:default, nodejs:default)
  --main=main                            the name of the action entry point (function or fully-qualified method name when applicable)
  --native                               use default skeleton runtime where code artifact provides actual executable for the action
  --sequence=sequence                    treat ACTION as comma separated sequence of actions to invoke
  --version                              Show version
  --web=true|yes|false|no|raw            treat ACTION as a web action or as a raw HTTP web action
  --web-secure=web-secure                secure the web action (valid values are true, false, or any string)
```

This command provides a quick way to create an individual action, not connected to a project.  However, [a project with a single action in it](single-action-example.md), while bulkier, allows for future extension as you add more actions and web content to your application.

The action being created must not already exist.  If you wish to modify an existing action, use [nim action update](#nim-package-update-packagename).

#### ACTIONNAME

Provides the name of the action.  Action names in the current namespace
consist of one or two segments separated by a slash (/) character.  Each segment conforms to these rules.

* The first character must be an alphanumeric character, or an underscore.
* The subsequent characters can be alphanumeric, spaces, or any of the following: `_`, `@`, `.`, `-`.
* The last character can't be a space.

When there are two segments to the name, the first denotes the package containing the action.

Although it is the first argument, the `ACTIONNAME` may be omitted, causing the `ACTIONPATH` to be the first argument.

#### ACTIONPATH

Provides a location in the local file system where the code of the action is to be found.  

_See code: [src/commands/action/create.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/action/create.ts)_

## `nim action delete ACTIONNAME`

Deletes an Action

```
USAGE
  $ nim action delete ACTIONNAME

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

This command deletes a single action.  You can also delete all the actions in a package along with the package itself using

```
nim package delete -r
```

You can delete all the OpenWhisk resources in a namespace using

```
nim namespace clean --justwhisk
```

_See code: [src/commands/action/delete.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/action/delete.ts)_

## `nim action get ACTIONNAME`

Retrieves an Action

```
USAGE
  $ nim action get ACTIONNAME

OPTIONS
  -c, --code               show action code (only works if code is not a zip file
  -i, --insecure           bypass certificate check
  -r, --url                get action url
  -u, --auth=auth          whisk auth
  -v, --verbose            Verbose output
  --apihost=apihost        whisk API host
  --apiversion=apiversion  whisk API version
  --cert=cert              client cert
  --debug=debug            Debug level output
  --help                   Show help
  --key=key                client key
  --save                   save action code to file corresponding with action name
  --save-as=save-as        file to save action code to
  --version                Show version
```

_See code: [src/commands/action/get.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/action/get.ts)_

## `nim action invoke ACTIONNAME`

Invokes an Action

```
USAGE
  $ nim action invoke ACTIONNAME

OPTIONS
  -P, --param-file=param-file  FILE containing parameter values in JSON format
  -f, --full                   wait for full activation record
  -i, --insecure               bypass certificate check
  -n, --no-wait                fire and forget (asynchronous invoke, does not wait for the result)
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
  --web                        Invoke as a web action, show result as web page
```

_See code: [src/commands/action/invoke.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/action/invoke.ts)_

## `nim action list [PACKAGENAME]`

Lists all the Actions

```
USAGE
  $ nim action list [PACKAGENAME]

OPTIONS
  -c, --count              show only the total number of actions
  -i, --insecure           bypass certificate check
  -l, --limit=limit        only return LIMIT number of actions from the collection (default 30)
  -n, --name               sort results by name
  -s, --skip=skip          exclude the first SKIP number of actions from the result
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

_See code: [src/commands/action/list.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/action/list.ts)_

## `nim action update ACTIONNAME [ACTIONPATH]`

Updates an Action

```
USAGE
  $ nim action update ACTIONNAME [ACTIONPATH]

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -E, --env-file=env-file                FILE containing environment variables in JSON format
  -P, --param-file=param-file            FILE containing parameter values in JSON format
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -e, --env=env                          environment values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -l, --logsize=logsize                  Maximum log size LIMIT in KB for the Action
  -m, --memory=memory                    Maximum memory LIMIT in MB for the Action
  -p, --param=param                      parameter values in KEY VALUE format
  -t, --timeout=timeout                  Timeout LIMIT in milliseconds after which the Action is terminated
  -u, --auth=auth                        whisk auth
  -v, --verbose                          Verbose output
  --apihost=apihost                      whisk API host
  --apiversion=apiversion                whisk API version
  --binary                               treat code artifact as binary
  --cert=cert                            client cert
  --debug=debug                          Debug level output
  --docker=docker                        use provided Docker image (a path on DockerHub) to run the action
  --help                                 Show help
  --json                                 output raw json
  --key=key                              client key
  --kind=kind                            the KIND of the action runtime (example: swift:default, nodejs:default)
  --main=main                            the name of the action entry point (function or fully-qualified method name when applicable)
  --native                               use default skeleton runtime where code artifact provides actual executable for the action
  --sequence=sequence                    treat ACTION as comma separated sequence of actions to invoke
  --version                              Show version
  --web=true|yes|false|no|raw            treat ACTION as a web action or as a raw HTTP web action
  --web-secure=web-secure                secure the web action (valid values are true, false, or any string)
```

_See code: [src/commands/action/update.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/action/update.ts)_
