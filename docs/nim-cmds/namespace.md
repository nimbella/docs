`nim namespace`
===============

work with namespaces

* [`nim namespace clean [NAMESPACE]`](#nim-namespace-clean-namespace)
* [`nim namespace free [NAMESPACE]`](#nim-namespace-free-namespace)
* [`nim namespace get`](#nim-namespace-get)

## `nim namespace clean [NAMESPACE]`

Remove content from a namespace

```
Remove content from a namespace

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

_See code: [src/commands/namespace/clean.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/namespace/clean.ts)_

## `nim namespace free [NAMESPACE]`

Remove project ownership restrictions from namespaces

```
Remove project ownership restrictions from namespaces

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

_See code: [src/commands/namespace/free.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/namespace/free.ts)_

## `nim namespace get`

Get triggers, actions, and rules in the registry for namespace

```
Get triggers, actions, and rules in the registry for namespace

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

_See code: [src/commands/namespace/get.ts](https://github.com/nimbella/nimbella-cli/blob/v1.14.0/src/commands/namespace/get.ts)_
