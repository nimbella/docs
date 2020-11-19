`nim route`
===========

work with routes

* [`nim route create BASEPATH RELPATH APIVERB ACTION`](#nim-route-create-basepath-relpath-apiverb-action)
* [`nim route delete BASEPATHORAPINAME [RELPATH] [APIVERB]`](#nim-route-delete-basepathorapiname-relpath-apiverb)
* [`nim route get BASEPATHORAPINAME`](#nim-route-get-basepathorapiname)
* [`nim route list [BASEPATH] [RELPATH] [APIVERB]`](#nim-route-list-basepath-relpath-apiverb)

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

_See code: [src/commands/route/create.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/route/create.ts)_

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

_See code: [src/commands/route/delete.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/route/delete.ts)_

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

_See code: [src/commands/route/get.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/route/get.ts)_

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

_See code: [src/commands/route/list.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/route/list.ts)_
