`nim web`
=========

work with web contents

* [`nim web clean`](#nim-web-clean)
* [`nim web create WEBCONTENTPATH`](#nim-web-create-webcontentpath)
* [`nim web delete WEBCONTENTNAME`](#nim-web-delete-webcontentname)
* [`nim web get WEBCONTENTNAME DESTINATION`](#nim-web-get-webcontentname-destination)
* [`nim web list [PREFIX]`](#nim-web-list-prefix)
* [`nim web update WEBCONTENTPATH`](#nim-web-update-webcontentpath)

## `nim web clean`

Deletes all Content from Web Storage

```
Deletes all Content from Web Storage

USAGE
  $ nim web clean

OPTIONS
  -f, --force            Just do it, omitting confirmatory prompt
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace to clean
  --help                 Show help
  --namespace=namespace  The namespace to clean (current namespace if omitted)
```

_See code: [src/commands/web/clean.ts](https://github.com/nimbella/nimbella-cli/blob/v1.10.2/src/commands/web/clean.ts)_

## `nim web create WEBCONTENTPATH`

Adds Content to the Web Storage

```
Adds Content to the Web Storage

USAGE
  $ nim web create WEBCONTENTPATH

ARGUMENTS
  WEBCONTENTPATH  Path to the content to be added

OPTIONS
  -c, --cache=cache              Maximum amount of time in seconds, the web content is considered fresh, relative to the time of the request
  -d, --destination=destination  Target location in web storage
  -v, --verbose                  Greater detail in error messages
  --apihost=apihost              API host of the namespace in which to add content
  --help                         Show help
  --namespace=namespace          The namespace in which to add content (current namespace if omitted)

ALIASES
  $ nim web add
```

_See code: [src/commands/web/create.ts](https://github.com/nimbella/nimbella-cli/blob/v1.10.2/src/commands/web/create.ts)_

## `nim web delete WEBCONTENTNAME`

Deletes Content from the Web Storage

```
Deletes Content from the Web Storage

USAGE
  $ nim web delete WEBCONTENTNAME

ARGUMENTS
  WEBCONTENTNAME  The web content to be deleted

OPTIONS
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace in which to delete content
  --help                 Show help
  --namespace=namespace  The namespace in which to delete content (current namespace if omitted)
```

_See code: [src/commands/web/delete.ts](https://github.com/nimbella/nimbella-cli/blob/v1.10.2/src/commands/web/delete.ts)_

## `nim web get WEBCONTENTNAME DESTINATION`

Gets Content from the Web Storage

```
Gets Content from the Web Storage

USAGE
  $ nim web get WEBCONTENTNAME DESTINATION

ARGUMENTS
  WEBCONTENTNAME  The web content to get
  DESTINATION     [default: ./] The location to write at

OPTIONS
  -r, --url              Get web content url
  -s, --save             Saves content on file system
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace from which to get web content
  --help                 Show help
  --namespace=namespace  The namespace from which to get web content (current namespace if omitted)
  --saveAs=saveAs        Saves content on file system with the given name
```

_See code: [src/commands/web/get.ts](https://github.com/nimbella/nimbella-cli/blob/v1.10.2/src/commands/web/get.ts)_

## `nim web list [PREFIX]`

Lists Web Content

```
Lists Web Content

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

_See code: [src/commands/web/list.ts](https://github.com/nimbella/nimbella-cli/blob/v1.10.2/src/commands/web/list.ts)_

## `nim web update WEBCONTENTPATH`

Updates Content in the Web Storage

```
Updates Content in the Web Storage

USAGE
  $ nim web update WEBCONTENTPATH

ARGUMENTS
  WEBCONTENTPATH  Path to the content to be updated

OPTIONS
  -c, --cache=cache              Maximum amount of time in seconds, the web content is considered fresh, relative to the time of the request
  -d, --destination=destination  Target location in web storage
  -v, --verbose                  Greater detail in error messages
  --apihost=apihost              API host of the namespace in which to update content
  --help                         Show help
  --namespace=namespace          The namespace in which to update content (current namespace if omitted)
```

_See code: [src/commands/web/update.ts](https://github.com/nimbella/nimbella-cli/blob/v1.10.2/src/commands/web/update.ts)_
