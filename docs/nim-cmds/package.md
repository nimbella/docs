`nim package`
=============

work with packages

* [`nim package bind PACKAGENAME BINDPACKAGENAME`](#nim-package-bind-packagename-bindpackagename)
* [`nim package create PACKAGENAME`](#nim-package-create-packagename)
* [`nim package delete PACKAGENAME`](#nim-package-delete-packagename)
* [`nim package get PACKAGENAME`](#nim-package-get-packagename)
* [`nim package list [NAMESPACE]`](#nim-package-list-namespace)
* [`nim package update PACKAGENAME`](#nim-package-update-packagename)

## `nim package bind PACKAGENAME BINDPACKAGENAME`

Bind parameters to a package

```
Bind parameters to a package

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

_See code: [src/commands/package/bind.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/package/bind.ts)_

## `nim package create PACKAGENAME`

Creates a Package

```
Creates a Package

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

_See code: [src/commands/package/create.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/package/create.ts)_

## `nim package delete PACKAGENAME`

Deletes a Package

```
Deletes a Package

USAGE
  $ nim package delete PACKAGENAME

OPTIONS
  -r, --recursive    Delete the contained actions
  -u, --auth=auth    Whisk auth
  --apihost=apihost  Whisk API host
  --json             output raw json
```

_See code: [src/commands/package/delete.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/package/delete.ts)_

## `nim package get PACKAGENAME`

Retrieves a Package

```
Retrieves a Package

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

_See code: [src/commands/package/get.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/package/get.ts)_

## `nim package list [NAMESPACE]`

Lists all the Packages

```
Lists all the Packages

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

_See code: [src/commands/package/list.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/package/list.ts)_

## `nim package update PACKAGENAME`

Updates a Package

```
Updates a Package

USAGE
  $ nim package update PACKAGENAME

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

_See code: [src/commands/package/update.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/package/update.ts)_
