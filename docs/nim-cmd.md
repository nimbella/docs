---
id: command-summary
title: Command Summary
sidebar_label: Command Summary
---

# Nimbella CLI Command Summary

This document covers the syntax of all the Nimbella CLI commands, with brief semantic summaries and pointers to more extended documentation where it exists.  Flags common to many commands are documented [here](common-flags.md).

<!-- commands -->
* [`nim action create [ACTIONNAME] ACTIONPATH`](#nim-action-create-actionname-actionpath)
* [`nim action delete ACTIONNAME`](#nim-action-delete-actionname)
* [`nim action get ACTIONNAME`](#nim-action-get-actionname)
* [`nim action invoke ACTIONNAME`](#nim-action-invoke-actionname)
* [`nim action list [PACKAGENAME]`](#nim-action-list-packagename)
* [`nim action update ACTIONNAME [ACTIONPATH]`](#nim-action-update-actionname-actionpath)
* [`nim activation get [ACTIVATIONID]`](#nim-activation-get-activationid)
* [`nim activation list [ACTIVATION_NAME]`](#nim-activation-list-activation_name)
* [`nim activation logs [ACTIVATIONID]`](#nim-activation-logs-activationid)
* [`nim activation result [ACTIVATIONID]`](#nim-activation-result-activationid)
* [`nim auth current`](#nim-auth-current)
* [`nim auth export [NAMESPACE]`](#nim-auth-export-namespace)
* [`nim auth github`](#nim-auth-github)
* [`nim auth list`](#nim-auth-list)
* [`nim auth login [TOKEN]`](#nim-auth-login-token)
* [`nim auth logout [NAMESPACE]`](#nim-auth-logout-namespace)
* [`nim auth refresh [NAMESPACE]`](#nim-auth-refresh-namespace)
* [`nim auth switch NAMESPACE`](#nim-auth-switch-namespace)
* [`nim commander`](#nim-commander)
* [`nim doc`](#nim-doc)
* [`nim info`](#nim-info)
* [`nim key-value clean`](#nim-key-value-clean)
* [`nim key-value del KEY`](#nim-key-value-del-key)
* [`nim key-value expire KEY TTL`](#nim-key-value-expire-key-ttl)
* [`nim key-value get KEY`](#nim-key-value-get-key)
* [`nim key-value getMany [KEYPREFIX] [STARTINDEX] [COUNT]`](#nim-key-value-getmany-keyprefix-startindex-count)
* [`nim key-value list [PREFIX]`](#nim-key-value-list-prefix)
* [`nim key-value llen KEY`](#nim-key-value-llen-key)
* [`nim key-value lrange KEY START STOP`](#nim-key-value-lrange-key-start-stop)
* [`nim key-value rpush KEY VALUE`](#nim-key-value-rpush-key-value)
* [`nim key-value set KEY VALUE`](#nim-key-value-set-key-value)
* [`nim key-value setMany [KEYPREFIX] [VALUEPREFIX] [STARTINDEX] [COUNT]`](#nim-key-value-setmany-keyprefix-valueprefix-startindex-count)
* [`nim key-value ttl KEY`](#nim-key-value-ttl-key)
* [`nim namespace clean [NAMESPACE]`](#nim-namespace-clean-namespace)
* [`nim namespace free [NAMESPACE]`](#nim-namespace-free-namespace)
* [`nim namespace get`](#nim-namespace-get)
* [`nim object clean [NAMESPACE]`](#nim-object-clean-namespace)
* [`nim object create OBJECTPATH [NAMESPACE]`](#nim-object-create-object-path-namespace)
* [`nim object delete OBJECTNAME [NAMESPACE]`](#nim-object-delete-object-name-namespace)
* [`nim object get OBJECTNAME DESTINATION [NAMESPACE]`](#nim-object-get-object-name-destination-namespace)
* [`nim object list [PREFIX]`](#nim-object-list-prefix)
* [`nim object update OBJECTPATH [NAMESPACE]`](#nim-object-update-object-path-namespace)
* [`nim object url OBJECTNAME [NAMESPACE]`](#nim-object-url-object-name-namespace)
* [`nim package bind PACKAGENAME BINDPACKAGENAME`](#nim-package-bind-packagename-bindpackagename)
* [`nim package create PACKAGENAME`](#nim-package-create-packagename)
* [`nim package delete PACKAGENAME`](#nim-package-delete-packagename)
* [`nim package get PACKAGENAME`](#nim-package-get-packagename)
* [`nim package list [NAMESPACE]`](#nim-package-list-namespace)
* [`nim package update PACKAGENAME`](#nim-package-update-packagename)
* [`nim plugins`](#nim-plugins)
* [`nim plugins install PLUGIN...`](#nim-plugins-install-plugin)
* [`nim plugins link PLUGIN`](#nim-plugins-link-plugin)
* [`nim plugins uninstall PLUGIN...`](#nim-plugins-uninstall-plugin)
* [`nim plugins update`](#nim-plugins-update)
* [`nim project create [NAME]`](#nim-project-create-name)
* [`nim project deploy [PROJECTS]`](#nim-project-deploy-projects)
* [`nim project watch [PROJECTS]`](#nim-project-watch-projects)
* [`nim route create BASEPATH RELPATH APIVERB ACTION`](#nim-route-create-basepath-relpath-apiverb-action)
* [`nim route delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#nim-route-delete-basepathorapiname-relpath-apiverb)
* [`nim route get BASEPATHORAPINAME`](#nim-route-get-basepathorapiname)
* [`nim route list [BASEPATH] [RELPATH] [APIVERB]`](#nim-route-list-basepath-relpath-apiverb)
* [`nim rule create NAME TRIGGER ACTION`](#nim-rule-create-name-trigger-action)
* [`nim rule delete NAME`](#nim-rule-delete-name)
* [`nim rule disable NAME`](#nim-rule-disable-name)
* [`nim rule enable NAME`](#nim-rule-enable-name)
* [`nim rule get NAME`](#nim-rule-get-name)
* [`nim rule list`](#nim-rule-list)
* [`nim rule status NAME`](#nim-rule-status-name)
* [`nim rule update NAME TRIGGER ACTION`](#nim-rule-update-name-trigger-action)
* [`nim trigger create TRIGGERNAME`](#nim-trigger-create-triggername)
* [`nim trigger delete TRIGGERPATH`](#nim-trigger-delete-triggerpath)
* [`nim trigger fire TRIGGERNAME`](#nim-trigger-fire-triggername)
* [`nim trigger get TRIGGERPATH`](#nim-trigger-get-triggerpath)
* [`nim trigger list`](#nim-trigger-list)
* [`nim trigger update TRIGGERNAME`](#nim-trigger-update-triggername)
* [`nim update [CHANNEL]`](#nim-update-channel)
* [`nim web clean [NAMESPACE]`](#nim-web-clean-namespace)
* [`nim web create WEBCONTENTPATH [NAMESPACE]`](#nim-web-create-webcontentpath-namespace)
* [`nim web delete WEBCONTENTNAME [NAMESPACE]`](#nim-web-delete-webcontentname-namespace)
* [`nim web get WEBCONTENTNAME DESTINATION [NAMESPACE]`](#nim-web-get-web-contentname-destination-namespace)
* [`nim web list [PREFIX]`](#nim-web-list-prefix)
* [`nim web update WEBCONTENTPATH [NAMESPACE]`](#nim-web-update-web-contentpath-namespace)
* [`nim workbench login`](#nim-workbench-login)
* [`nim workbench run [COMMAND]`](#nim-workbench-run-command)

---
## `nim action create [ACTIONNAME] ACTIONPATH`

Creates an Action

```
USAGE
  $ nim action create [ACTIONNAME] ACTIONPATH

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







---
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

---
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


---
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
```


---
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


---
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


---
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


---
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


---
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


---
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


---
## `nim auth current`

Get current namespace with optional details

```
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


---
## `nim auth export [NAMESPACE]`

Make a token for switching to another machine or web browser

```
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


---
## `nim auth github`

Manage GitHub accounts

```
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


---
## `nim auth list`

List all your Nimbella namespaces

```
USAGE
  $ nim auth list

OPTIONS
  -v, --verbose  Greater detail in error messages
  --help         Show help
```


---
## `nim auth login [TOKEN]`

Gain access to a Nimbella namespace

```
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


---
## `nim auth logout [NAMESPACE]`

Drop access to Nimbella namespaces

```
USAGE
  $ nim auth logout [NAMESPACE]

ARGUMENTS
  NAMESPACE  The namespace(s) you are dropping

OPTIONS
  -v, --verbose      Greater detail in error messages
  --all              log out of all namespaces (or, all on the given API host)
  --apihost=apihost  API host serving the namespace(s)
  --help             Show help

ALIASES
  $ nim logout
```


---
## `nim auth refresh [NAMESPACE]`

Refresh Nimbella namespace credentials by re-reading the latest from the backend

```
USAGE
  $ nim auth refresh [NAMESPACE]

ARGUMENTS
  NAMESPACE  The namespace to refresh (omit for current namespace)

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host serving the namespace
  --help             Show help
```


---
## `nim auth switch NAMESPACE`

Switch to a different Nimbella namespace

```
USAGE
  $ nim auth switch NAMESPACE

ARGUMENTS
  NAMESPACE  The namespace you are switching to

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host serving the target namespace
  --help             Show help
```


---
## `nim commander`

interact with Nimbella Commander

```
USAGE
  $ nim commander

OPTIONS
  -v, --verbose  Greater detail in error messages
  --help         Show help
```


---
## `nim doc`

Display the full documentation of this CLI

```
USAGE
  $ nim doc

OPTIONS
  -v, --verbose  Greater detail in error messages
  --help         Show help

ALIASES
  $ nim docs
```


---
## `nim info`

Show information about this version of 'nim'

```
USAGE
  $ nim info

OPTIONS
  -v, --verbose  Greater detail in error messages
  --changes      Display the change history
  --help         Show help
  --license      Display the license
  --limits       List the applicable Nimbella system limits
  --runtimes     List the supported runtimes
```


---
## `nim key-value clean`

Clears the Key Value Store, be cautious!

```
USAGE
  $ nim key-value clean

OPTIONS
  -f, --force        Just do it, omitting confirmatory prompt
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace
  --help             Show help

ALIASES
  $ nim kv:clean
```


---
## `nim key-value del KEY`

Removes the specified keys and returns number of keys that were removed. A key is ignored if it does not exist

```
USAGE
  $ nim key-value del KEY

ARGUMENTS
  KEY  The key to be deleted

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace
  --help             Show help

ALIASES
  $ nim kv:del
  $ nim kv:delete
```


---
## `nim key-value expire KEY TTL`

Sets the specified ttl value for the specified key

```
USAGE
  $ nim key-value expire KEY TTL

ARGUMENTS
  KEY  The key to be added at
  TTL  The ttl value to be set

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace
  --help             Show help

ALIASES
  $ nim kv:expire
```


---
## `nim key-value get KEY`

Get Value for a Key

```
USAGE
  $ nim key-value get KEY

ARGUMENTS
  KEY  The key for which value is to be retrieved

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to list keys from
  --help             Show help

ALIASES
  $ nim kv:get
```


---
## `nim key-value getMany [KEYPREFIX] [STARTINDEX] [COUNT]`

Gets values for given Keys

```
USAGE
  $ nim key-value getMany [KEYPREFIX] [STARTINDEX] [COUNT]

ARGUMENTS
  KEYPREFIX   The key for which value is to be retrieved
  STARTINDEX  The index to start at
  COUNT       The count to run to from start

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to list keys from
  --help             Show help

ALIASES
  $ nim kv:getMany
  $ nim kv:getmany
```


---
## `nim key-value list [PREFIX]`

Lists Keys from Key Value Store

```
USAGE
  $ nim key-value list [PREFIX]

ARGUMENTS
  PREFIX  Prefix to match keys against

OPTIONS
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace to list keys from
  --help                 Show help
  --namespace=namespace  The namespace to list keys from (current namespace if omitted)

ALIASES
  $ nim kv:list
```


---
## `nim key-value llen KEY`

Returns the length of the list stored at key. If a key does not exist, it is interpreted as an empty list and 0 is returned. An error is returned when the value stored at key is not a list.

```
USAGE
  $ nim key-value llen KEY

ARGUMENTS
  KEY  The key to be queried for length

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace
  --help             Show help

ALIASES
  $ nim kv:llen
```


---
## `nim key-value lrange KEY START STOP`

Returns the specified elements of the list stored at key. The offsets start and stop are zero-based indexes, with 0 being the first element of the list, 1 being the next element and so on.

```
USAGE
  $ nim key-value lrange KEY START STOP

ARGUMENTS
  KEY    The key to be queried
  START  The index to start
  STOP   The index to stop

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to list keys from
  --help             Show help

ALIASES
  $ nim kv:lrange
```


---
## `nim key-value rpush KEY VALUE`

Insert all the specified values at the tail of the list stored at key. It is created as an empty list before performing the push operation if the key does not exist. An error is returned when key holds such a value that is not a list

```
USAGE
  $ nim key-value rpush KEY VALUE

ARGUMENTS
  KEY    The key to be added at
  VALUE  The value to be added

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace
  --help             Show help

ALIASES
  $ nim kv:rpush
```


---
## `nim key-value set KEY VALUE`

Sets the specified value at the specified key

```
USAGE
  $ nim key-value set KEY VALUE

ARGUMENTS
  KEY    The key to be added at
  VALUE  The value to be added

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace
  --help             Show help

ALIASES
  $ nim kv:set
  $ nim kv:add
```


---
## `nim key-value setMany [KEYPREFIX] [VALUEPREFIX] [STARTINDEX] [COUNT]`

Set Value for a Key

```
USAGE
  $ nim key-value setMany [KEYPREFIX] [VALUEPREFIX] [STARTINDEX] [COUNT]

ARGUMENTS
  KEYPREFIX    The key to be set at
  VALUEPREFIX  The value to be set
  STARTINDEX   The index to start at
  COUNT        The count to run to from start

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to list keys from
  --help             Show help

ALIASES
  $ nim kv:setMany
  $ nim kv:setmany
```


---
## `nim key-value ttl KEY`

Get ttl value for a Key

```
USAGE
  $ nim key-value ttl KEY

ARGUMENTS
  KEY  The key for which ttl value is to be retrieved

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to list keys from
  --help             Show help

ALIASES
  $ nim kv:ttl
```


---
## `nim namespace clean [NAMESPACE]`

Remove content from a namespace

```
USAGE
  $ nim namespace clean [NAMESPACE]

ARGUMENTS
  NAMESPACE  The namespace to clean (current namespace if omitted)

OPTIONS
  -u, --auth=auth    The API key for the namespace to be cleaned
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  The API host of the namespace to be cleaned
  --force            Just do it, omitting confirmatory prompt
  --help             Show help
  --justwhisk        Remove only OpenWhisk entities, leaving other content
```


---
## `nim namespace free [NAMESPACE]`

Remove project ownership restrictions from namespaces

```
USAGE
  $ nim namespace free [NAMESPACE]

ARGUMENTS
  NAMESPACE  The namespace(s) you are freeing (current if omitted)

OPTIONS
  -v, --verbose      Greater detail in error messages
  --all              free all namespaces (or, all on the given API host)
  --apihost=apihost  API host serving the namespace(s)
  --help             Show help
```


---
## `nim namespace get`

Get triggers, actions, and rules in the registry for namespace

```
USAGE
  $ nim namespace get

OPTIONS
  -i, --insecure           bypass certificate check
  -n, --name               sort results by name
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


---
## `nim object clean [NAMESPACE]`

Deletes all objects from the Object Store

```
USAGE
  $ nim object clean [NAMESPACE]

ARGUMENTS
  NAMESPACE  The namespace to delete objects from (current namespace if omitted)

OPTIONS
  -f, --force        Just do it, omitting confirmatory prompt
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to delete objects from
  --help             Show help
```


---
## `nim object create OBJECTPATH [NAMESPACE]`

Adds Object to the Object Store

```
USAGE
  $ nim object create OBJECTPATH [NAMESPACE]

ARGUMENTS
  OBJECTPATH  The object to be added
  NAMESPACE   The namespace to add object to (current namespace if omitted)

OPTIONS
  -d, --destination=destination  Target location in object storage
  -v, --verbose                  Greater detail in error messages
  --apihost=apihost              API host of the namespace to add object to
  --help                         Show help

ALIASES
  $ nim objects:add
  $ nim object add
```


---
## `nim object delete OBJECTNAME [NAMESPACE]`

Deletes Object from the Object Store

```
USAGE
  $ nim object delete OBJECTNAME [NAMESPACE]

ARGUMENTS
  OBJECTNAME  The object to be deleted
  NAMESPACE   The namespace to delete object from (current namespace if omitted)

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to delete object from
  --help             Show help
```


---
## `nim object get OBJECTNAME DESTINATION [NAMESPACE]`

Gets Object from the Object Store

```
USAGE
  $ nim object get OBJECTNAME DESTINATION [NAMESPACE]

ARGUMENTS
  OBJECTNAME   The object to get
  DESTINATION  [default: ./] The location to write object at
  NAMESPACE    The namespace to get object from (current namespace if omitted)

OPTIONS
  -s, --save         Saves object on file system
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to get object from
  --help             Show help
  --saveAs=saveAs    Saves object on file system with the given name
```


---
## `nim object list [PREFIX]`

Lists Objects from Object Store

```
USAGE
  $ nim object list [PREFIX]

ARGUMENTS
  PREFIX  Prefix to match objects against

OPTIONS
  -l, --long             Displays additional object info such as last update, owner and md5hash
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace to list objects from
  --help                 Show help
  --namespace=namespace  The namespace to list objects from (current namespace if omitted)
```


---
## `nim object update OBJECTPATH [NAMESPACE]`

Updates Object in the Object Store

```
USAGE
  $ nim object update OBJECTPATH [NAMESPACE]

ARGUMENTS
  OBJECTPATH  The object to be updated
  NAMESPACE   The namespace to update object in (current namespace if omitted)

OPTIONS
  -d, --destination=destination  Target location in object storage
  -v, --verbose                  Greater detail in error messages
  --apihost=apihost              API host of the namespace to update object in
  --help                         Show help
```


---
## `nim object url OBJECTNAME [NAMESPACE]`

Generates Signed URL for an Object in the Object Store

```
USAGE
  $ nim object url OBJECTNAME [NAMESPACE]

ARGUMENTS
  OBJECTNAME  The object to get URL for
  NAMESPACE   The namespace to get object from (current namespace if omitted)

OPTIONS
  -p, --permission=read|write  [default: read] Permission applicable on the URL
  -t, --ttl=ttl                [default: 15] Expiration time of the URL (in Minutes)
  -v, --verbose                Greater detail in error messages
  --apihost=apihost            API host of the namespace to get object URL from
  --help                       Show help
```


---
## `nim package bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
USAGE
  $ nim package bind PACKAGENAME BINDPACKAGENAME

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            parameter to be passed to the package for json file
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -p, --param=param                      parameters in key value pairs to be passed to the package
  -u, --auth=auth                        whisk auth
  -v, --verbose                          Verbose output
  --apihost=apihost                      whisk API host
  --apiversion=apiversion                whisk API version
  --cert=cert                            client cert
  --debug=debug                          Debug level output
  --help                                 Show help
  --json                                 output raw json
  --key=key                              client key
  --version                              Show version
```


---
## `nim package create PACKAGENAME`

Creates a Package

```
USAGE
  $ nim package create PACKAGENAME

OPTIONS
  -A, --annotation-file=annotation-file  FILE containing annotation values in JSON format
  -P, --param-file=param-file            parameter to be passed to the package for json file
  -a, --annotation=annotation            annotation values in KEY VALUE format
  -i, --insecure                         bypass certificate check
  -p, --param=param                      parameters in key value pairs to be passed to the package
  -u, --auth=auth                        whisk auth
  -v, --verbose                          Verbose output
  --apihost=apihost                      whisk API host
  --apiversion=apiversion                whisk API version
  --cert=cert                            client cert
  --debug=debug                          Debug level output
  --help                                 Show help
  --json                                 output raw json
  --key=key                              client key
  --shared=true|yes|false|no             parameter to be passed to indicate whether package is shared or private
  --version                              Show version
```


---
## `nim package delete PACKAGENAME`

Deletes a Package

```
USAGE
  $ nim package delete PACKAGENAME

OPTIONS
  -r, --recursive    Delete the contained actions
  -u, --auth=auth    Whisk auth
  --apihost=apihost  Whisk API host
  --json             output raw json
```


---
## `nim package get PACKAGENAME`

Retrieves a Package

```
USAGE
  $ nim package get PACKAGENAME

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


---
## `nim package list [NAMESPACE]`

Lists all the Packages

```
USAGE
  $ nim package list [NAMESPACE]

OPTIONS
  -c, --count              show only the total number of packages
  -i, --insecure           bypass certificate check
  -l, --limit=limit        only return LIMIT number of packages from the collection (default 30)
  -n, --name               sort results by name
  -s, --skip=skip          exclude the first SKIP number of packages from the result
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


---
## `nim package update PACKAGENAME`

Updates a Package

```
USAGE
  $ nim package update PACKAGENAME

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
  --json                                 output raw json
  --key=key                              client key
  --shared=true|yes|false|no             parameter to be passed to indicate whether package is shared or private
  --version                              Show version
```


---
## `nim plugins`

list installed plugins

```
USAGE
  $ nim plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ nim plugins
```


---
## `nim plugins install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ nim plugins install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -f, --force    yarn install with force flag
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command will override the core plugin implementation. This is useful if a user needs to
  update core plugin functionality in the CLI without the need to patch and update the whole CLI.

ALIASES
  $ nim plugins add

EXAMPLES
  $ nim plugins install myplugin
  $ nim plugins install https://github.com/someuser/someplugin
  $ nim plugins install someuser/someplugin
```


---
## `nim plugins link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ nim plugins link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello' command will override the user-installed or core plugin implementation. This is
  useful for development work.

EXAMPLE
  $ nim plugins link myplugin
```


---
## `nim plugins uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ nim plugins uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ nim plugins unlink
  $ nim plugins remove
```


---
## `nim plugins update`

update installed plugins

```
USAGE
  $ nim plugins update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```


---
## `nim project create [NAME]`

Create a Nimbella Project

```
USAGE
  $ nim project create [NAME]

ARGUMENTS
  NAME  Project name

OPTIONS
  -c, --clientCode                           Generates client code
  -i, --id=id                                API specs id/name/path
  -k, --key=key                              Key to access the source API
  -l, --language=go|js|ts|py|java|swift|php  [default: js] Language for the project (creates sample project unless source is specified)
  -o, --overwrite                            Overwrites the existing file(s)
  -s, --source=postman|openapi               API specs source
  -u, --updateSource                         Sync updated API specs back to source
  -v, --verbose                              Greater detail in error messages
  --config                                   Generate template config file
  --help                                     Show help
```


---
## `nim project deploy [PROJECTS]`

Deploy Nimbella projects

```
USAGE
  $ nim project deploy [PROJECTS]

ARGUMENTS
  PROJECTS  One or more paths to projects

OPTIONS
  -v, --verbose          Greater detail in error messages
  --anon-github          Attempt GitHub deploys anonymously
  --apihost=apihost      API host to use
  --auth=auth            OpenWhisk auth token to use
  --env=env              Path to environment file
  --exclude=exclude      Project portions to exclude
  --help                 Show help
  --include=include      Project portions to include
  --incremental          Deploy only changes since last deploy
  --insecure             Ignore SSL Certificates
  --production           Deploy to the production namespace instead of the test one
  --target=target        The target namespace
  --verbose-build        Display build details
  --verbose-zip          Display start/end of zipping phase for each action
  --web-local=web-local  A local directory to receive web deploy, instead of uploading
  --yarn                 Use yarn instead of npm for node builds
```


---
## `nim project watch [PROJECTS]`

Watch Nimbella projects, deploying incrementally on change

```
USAGE
  $ nim project watch [PROJECTS]

ARGUMENTS
  PROJECTS  One or more paths to projects

OPTIONS
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host to use
  --auth=auth            OpenWhisk auth token to use
  --env=env              Path to environment file
  --exclude=exclude      Project portions to exclude
  --help                 Show help
  --include=include      Project portions to include
  --insecure             Ignore SSL Certificates
  --target=target        The target namespace
  --verbose-build        Display build details
  --verbose-zip          Display start/end of zipping phase for each action
  --web-local=web-local  A local directory to receive web deploy, instead of uploading
  --yarn                 Use yarn instead of npm for node builds
```


---
## `nim route create BASEPATH RELPATH APIVERB ACTION`

create a new api route

```
USAGE
  $ nim route create BASEPATH RELPATH APIVERB ACTION

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb
  ACTION    The action to call

OPTIONS
  -i, --insecure                                    bypass certificate check
  -n, --apiname=apiname                             Friendly name of the API; ignored when CFG_FILE is specified (default BASE_PATH)
  -r, --response-type=html|http|json|text|svg|json  [default: json] Set the web action response TYPE.
  -u, --auth=auth                                   whisk auth
  -v, --verbose                                     Verbose output
  --apihost=apihost                                 whisk API host
  --apiversion=apiversion                           whisk API version
  --cert=cert                                       client cert
  --debug=debug                                     Debug level output
  --help                                            Show help
  --key=key                                         client key
  --version                                         Show version
```


---
## `nim route delete BASEPATHORAPINAME [RELPATH] [APIVERB]`

delete an API

```
USAGE
  $ nim route delete BASEPATHORAPINAME [RELPATH] [APIVERB]

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name
  RELPATH            The path of the api relative to the base path
  APIVERB            (get|post|put|patch|delete|head|options) The http verb

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


---
## `nim route get BASEPATHORAPINAME`

get API details

```
USAGE
  $ nim route get BASEPATHORAPINAME

ARGUMENTS
  BASEPATHORAPINAME  The base path or api name

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


---
## `nim route list [BASEPATH] [RELPATH] [APIVERB]`

List routes/apis

```
USAGE
  $ nim route list [BASEPATH] [RELPATH] [APIVERB]

ARGUMENTS
  BASEPATH  The base path of the api
  RELPATH   The path of the api relative to the base path
  APIVERB   (get|post|put|patch|delete|head|options) The http verb

OPTIONS
  -i, --insecure           bypass certificate check
  -l, --limit=limit        [default: 30] only return LIMIT number of triggers from the collection (default 30)
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
  --version                Show version
```


---
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


---
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


---
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


---
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


---
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


---
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


---
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


---
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


---
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


---
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


---
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


---
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


---
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


---
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


---
## `nim update [CHANNEL]`

update the nim CLI

```
USAGE
  $ nim update [CHANNEL]
```


---
## `nim web clean [NAMESPACE]`

Deletes all Content from Web Storage

```
USAGE
  $ nim web clean [NAMESPACE]

ARGUMENTS
  NAMESPACE  The namespace to delete web content from (current namespace if omitted)

OPTIONS
  -f, --force        Just do it, omitting confirmatory prompt
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to delete content from
  --help             Show help
```


---
## `nim web create WEBCONTENTPATH [NAMESPACE]`

Adds Content to the Web Storage

```
USAGE
  $ nim web create WEBCONTENTPATH [NAMESPACE]

ARGUMENTS
  WEBCONTENTPATH  Path to the content to be added
  NAMESPACE       The namespace to add content to (current namespace if omitted)

OPTIONS
  -c, --cache=cache              Maximum amount of time in seconds, the web content is considered fresh, relative to the time of the request
  -d, --destination=destination  Target location in web storage
  -v, --verbose                  Greater detail in error messages
  --apihost=apihost              API host of the namespace to add content to
  --help                         Show help

ALIASES
  $ nim web add
```


---
## `nim web delete WEBCONTENTNAME [NAMESPACE]`

Deletes Content from the Web Storage

```
USAGE
  $ nim web delete WEBCONTENTNAME [NAMESPACE]

ARGUMENTS
  WEBCONTENTNAME  The web content to be deleted
  NAMESPACE       The namespace to delete content from (current namespace if omitted)

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to delete web content from
  --help             Show help
```


---
## `nim web get WEBCONTENTNAME DESTINATION [NAMESPACE]`

Gets Content from the Web Storage

```
USAGE
  $ nim web get WEBCONTENTNAME DESTINATION [NAMESPACE]

ARGUMENTS
  WEBCONTENTNAME  The web content to get
  DESTINATION     [default: ./] The location to write at
  NAMESPACE       The namespace to get content from (current namespace if omitted)

OPTIONS
  -r, --url          Get web content url
  -s, --save         Saves content on file system
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to get web content from
  --help             Show help
  --saveAs=saveAs    Saves content on file system with the given name
```


---
## `nim web list [PREFIX]`

Lists Web Content

```
USAGE
  $ nim web list [PREFIX]

ARGUMENTS
  PREFIX  Prefix to match the content against

OPTIONS
  -l, --long             Displays additional file info such as last update, owner and md5hash
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace to list web content from
  --help                 Show help
  --namespace=namespace  The namespace to list web content from (current namespace if omitted)
```


---
## `nim web update WEBCONTENTPATH [NAMESPACE]`

Updates Content in the Web Storage

```
USAGE
  $ nim web update WEBCONTENTPATH [NAMESPACE]

ARGUMENTS
  WEBCONTENTPATH  Path to the content to be updated
  NAMESPACE       The namespace to update content in (current namespace if omitted)

OPTIONS
  -c, --cache=cache              Maximum amount of time in seconds, the web content is considered fresh, relative to the time of the request
  -d, --destination=destination  Target location in web storage
  -v, --verbose                  Greater detail in error messages
  --apihost=apihost              API host of the namespace to update content in
  --help                         Show help
```


---
## `nim workbench login`

Open the Nimbella Workbench, logging in with current credentials

```
USAGE
  $ nim workbench login

OPTIONS
  -p, --preview  Open preview workbench
  -v, --verbose  Greater detail in error messages
  --help         Show help

ALIASES
  $ nim wb:login
```


---
## `nim workbench run [COMMAND]`

Open the Nimbella Workbench and run a command there

```
USAGE
  $ nim workbench run [COMMAND]

ARGUMENTS
  COMMAND  An initial command to run

OPTIONS
  -p, --preview  Open preview workbench
  -v, --verbose  Greater detail in error messages
  --help         Show help

ALIASES
  $ nim wb:run
```

<!-- commandsstop -->
