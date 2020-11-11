`nim object`
============

work with objects store

* [`nim object clean [NAMESPACE]`](#nim-object-clean-namespace)
* [`nim object create OBJECTPATH [NAMESPACE]`](#nim-object-create-objectpath-namespace)
* [`nim object delete OBJECTNAME [NAMESPACE]`](#nim-object-delete-objectname-namespace)
* [`nim object get OBJECTNAME DESTINATION [NAMESPACE]`](#nim-object-get-objectname-destination-namespace)
* [`nim object list [PREFIX]`](#nim-object-list-prefix)
* [`nim object update OBJECTPATH [NAMESPACE]`](#nim-object-update-objectpath-namespace)
* [`nim object url OBJECTNAME [NAMESPACE]`](#nim-object-url-objectname-namespace)

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

_See code: [src/commands/object/clean.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/object/clean.ts)_

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
  $ nim objects add
  $ nim object add
```

_See code: [src/commands/object/create.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/object/create.ts)_

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

_See code: [src/commands/object/delete.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/object/delete.ts)_

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

_See code: [src/commands/object/get.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/object/get.ts)_

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

_See code: [src/commands/object/list.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/object/list.ts)_

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

_See code: [src/commands/object/update.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/object/update.ts)_

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

_See code: [src/commands/object/url.ts](https://github.com//nimbella/nimbella-cli/blob/v1.9.3/src/commands/object/url.ts)_
