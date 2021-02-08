`nim object`
============

work with objects store

* [`nim object clean`](#nim-object-clean)
* [`nim object create OBJECTPATH`](#nim-object-create-objectpath)
* [`nim object delete OBJECTNAME`](#nim-object-delete-objectname)
* [`nim object get OBJECTNAME DESTINATION`](#nim-object-get-objectname-destination)
* [`nim object list [PREFIX]`](#nim-object-list-prefix)
* [`nim object update OBJECTPATH`](#nim-object-update-objectpath)
* [`nim object url OBJECTNAME`](#nim-object-url-objectname)

## `nim object clean`

Deletes all objects from the Object Store

```
Deletes all objects from the Object Store

USAGE
  $ nim object clean

OPTIONS
  -f, --force            Just do it, omitting confirmatory prompt
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace to delete objects from
  --help                 Show help
  --namespace=namespace  The namespace to clean (current namespace if omitted)
```

_See code: [src/commands/object/clean.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/object/clean.ts)_

## `nim object create OBJECTPATH`

Adds Object to the Object Store

```
Adds Object to the Object Store

USAGE
  $ nim object create OBJECTPATH

ARGUMENTS
  OBJECTPATH  The object to be added

OPTIONS
  -d, --destination=destination  Target location in object storage
  -v, --verbose                  Greater detail in error messages
  --apihost=apihost              API host of the namespace to add object to
  --help                         Show help
  --namespace=namespace          The namespace to add the object to (current namespace if omitted)

ALIASES
  $ nim objects add
  $ nim object add
```

_See code: [src/commands/object/create.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/object/create.ts)_

## `nim object delete OBJECTNAME`

Deletes Object from the Object Store

```
Deletes Object from the Object Store

USAGE
  $ nim object delete OBJECTNAME

ARGUMENTS
  OBJECTNAME  The object to be deleted

OPTIONS
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace to delete object from
  --help                 Show help
  --namespace=namespace  The namespace to delete the object from (current namespace if omitted)
```

_See code: [src/commands/object/delete.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/object/delete.ts)_

## `nim object get OBJECTNAME DESTINATION`

Gets Object from the Object Store

```
Gets Object from the Object Store

USAGE
  $ nim object get OBJECTNAME DESTINATION

ARGUMENTS
  OBJECTNAME   The object to get
  DESTINATION  [default: ./] The location to write object at

OPTIONS
  -p, --print            Prints content on terminal
  -s, --save             Saves object on file system (default)
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace to get object from
  --help                 Show help
  --namespace=namespace  The namespace to get the object from (current namespace if omitted)
  --save-as=save-as      Saves object on file system with the given name
  --saveAs=saveAs        Saves object on file system with the given name
```

_See code: [src/commands/object/get.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/object/get.ts)_

## `nim object list [PREFIX]`

Lists Objects from Object Store

```
Lists Objects from Object Store

USAGE
  $ nim object list [PREFIX]

ARGUMENTS
  PREFIX  Prefix to match objects against

OPTIONS
  -j, --json             Displays output in JSON form
  -l, --long             Displays additional object info such as last update, owner and md5hash
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace to list objects from
  --help                 Show help
  --namespace=namespace  The namespace to list objects from (current namespace if omitted)
```

_See code: [src/commands/object/list.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/object/list.ts)_

## `nim object update OBJECTPATH`

Updates Object in the Object Store

```
Updates Object in the Object Store

USAGE
  $ nim object update OBJECTPATH

ARGUMENTS
  OBJECTPATH  The object to be updated

OPTIONS
  -d, --destination=destination  Target location in object storage
  -v, --verbose                  Greater detail in error messages
  --apihost=apihost              API host of the namespace to update object in
  --help                         Show help
  --namespace=namespace          The namespace in which to update the object (current namespace if omitted)
```

_See code: [src/commands/object/update.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/object/update.ts)_

## `nim object url OBJECTNAME`

Generates Signed URL for an Object in the Object Store

```
Generates Signed URL for an Object in the Object Store

USAGE
  $ nim object url OBJECTNAME

ARGUMENTS
  OBJECTNAME  The object to get URL for

OPTIONS
  -p, --permission=read|write  [default: read] Permission applicable on the URL
  -t, --ttl=ttl                [default: 15] Expiration time of the URL (in Minutes)
  -v, --verbose                Greater detail in error messages
  --apihost=apihost            API host of the namespace to get object URL from
  --help                       Show help
  --namespace=namespace        The namespace to get the object URL from (current namespace if omitted)
```

_See code: [src/commands/object/url.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/object/url.ts)_
