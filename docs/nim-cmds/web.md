`nim web`
=========

work with web contents

* [`nim web clean [NAMESPACE]`](#nim-web-clean-namespace)
* [`nim web create WEBCONTENTPATH [NAMESPACE]`](#nim-web-create-webcontentpath-namespace)
* [`nim web delete WEBCONTENTNAME [NAMESPACE]`](#nim-web-delete-webcontentname-namespace)
* [`nim web get WEBCONTENTNAME DESTINATION [NAMESPACE]`](#nim-web-get-webcontentname-destination-namespace)
* [`nim web list [PREFIX]`](#nim-web-list-prefix)
* [`nim web update WEBCONTENTPATH [NAMESPACE]`](#nim-web-update-webcontentpath-namespace)

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

_See code: [src/commands/web/clean.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/web/clean.ts)_

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

_See code: [src/commands/web/create.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/web/create.ts)_

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

_See code: [src/commands/web/delete.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/web/delete.ts)_

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

_See code: [src/commands/web/get.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/web/get.ts)_

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

_See code: [src/commands/web/list.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/web/list.ts)_

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

_See code: [src/commands/web/update.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/web/update.ts)_
