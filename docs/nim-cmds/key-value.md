`nim key-value`
===============

work with key-value store

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

## `nim key-value clean`

Clears the Key Value Store, be cautious!

```
Clears the Key Value Store, be cautious!

USAGE
  $ nim key-value clean

OPTIONS
  -f, --force        Just do it, omitting confirmatory prompt
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace
  --help             Show help

ALIASES
  $ nim kv clean
```

_See code: [src/commands/key-value/clean.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/clean.ts)_

## `nim key-value del KEY`

Removes the specified keys and returns number of keys that were removed. A key is ignored if it does not exist

```
Removes the specified keys and returns number of keys that were removed. A key is ignored if it does not exist

USAGE
  $ nim key-value del KEY

ARGUMENTS
  KEY  The key to be deleted

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace
  --help             Show help

ALIASES
  $ nim key-value delete
```

_See code: [src/commands/key-value/del.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/del.ts)_

## `nim key-value expire KEY TTL`

Sets the specified ttl value for the specified key

```
Sets the specified ttl value for the specified key

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
  $ nim kv expire
```

_See code: [src/commands/key-value/expire.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/expire.ts)_

## `nim key-value get KEY`

Get Value for a Key

```
Get Value for a Key

USAGE
  $ nim key-value get KEY

ARGUMENTS
  KEY  The key for which value is to be retrieved

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to list keys from
  --help             Show help

ALIASES
  $ nim kv get
```

_See code: [src/commands/key-value/get.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/get.ts)_

## `nim key-value getMany [KEYPREFIX] [STARTINDEX] [COUNT]`

Gets values for given Keys

```
Gets values for given Keys

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
  $ nim kv getMany
  $ nim kv getmany
```

_See code: [src/commands/key-value/getMany.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/getMany.ts)_

## `nim key-value list [PREFIX]`

Lists Keys from Key Value Store

```
Lists Keys from Key Value Store

USAGE
  $ nim key-value list [PREFIX]

ARGUMENTS
  PREFIX  Prefix to match keys against

OPTIONS
  -j, --json             Displays output in JSON form
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host of the namespace to list keys from
  --help                 Show help
  --namespace=namespace  The namespace to list keys from (current namespace if omitted)

ALIASES
  $ nim kv list
```

_See code: [src/commands/key-value/list.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/list.ts)_

## `nim key-value llen KEY`

Returns the length of the list stored at key.

```
Returns the length of the list stored at key.
 If a key does not exist, it is interpreted as an empty list and 0 is returned.
 An error is returned when the value stored at key is not a list.

USAGE
  $ nim key-value llen KEY

ARGUMENTS
  KEY  The key to be queried for length

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace
  --help             Show help

DESCRIPTION
  If a key does not exist, it is interpreted as an empty list and 0 is returned.
    An error is returned when the value stored at key is not a list.

ALIASES
  $ nim kv llen
```

_See code: [src/commands/key-value/llen.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/llen.ts)_

## `nim key-value lrange KEY START STOP`

Returns the specified elements of the list stored at key.

```
Returns the specified elements of the list stored at key.
 The offsets start and stop are zero-based indexes, with 0 being the first element of the list,
 1 being the next element and so on.

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

DESCRIPTION
  The offsets start and stop are zero-based indexes, with 0 being the first element of the list,
    1 being the next element and so on.

ALIASES
  $ nim kv lrange
```

_See code: [src/commands/key-value/lrange.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/lrange.ts)_

## `nim key-value rpush KEY VALUE`

Insert all the specified values at the tail of the list stored at key.

```
Insert all the specified values at the tail of the list stored at key.
 It is created as an empty list before performing the push operation if the key does not exist.
 An error is returned when key holds such a value that is not a list

USAGE
  $ nim key-value rpush KEY VALUE

ARGUMENTS
  KEY    The key to be added at
  VALUE  The value to be added

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace
  --help             Show help

DESCRIPTION
  It is created as an empty list before performing the push operation if the key does not exist.
    An error is returned when key holds such a value that is not a list

ALIASES
  $ nim kv rpush
```

_See code: [src/commands/key-value/rpush.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/rpush.ts)_

## `nim key-value set KEY VALUE`

Sets the specified value at the specified key

```
Sets the specified value at the specified key

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
  $ nim kv set
  $ nim kv add
```

_See code: [src/commands/key-value/set.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/set.ts)_

## `nim key-value setMany [KEYPREFIX] [VALUEPREFIX] [STARTINDEX] [COUNT]`

Set Value for a Key

```
Set Value for a Key

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
  $ nim kv setMany
  $ nim kv setmany
```

_See code: [src/commands/key-value/setMany.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/setMany.ts)_

## `nim key-value ttl KEY`

Get ttl value for a Key

```
Get ttl value for a Key

USAGE
  $ nim key-value ttl KEY

ARGUMENTS
  KEY  The key for which ttl value is to be retrieved

OPTIONS
  -v, --verbose      Greater detail in error messages
  --apihost=apihost  API host of the namespace to list keys from
  --help             Show help

ALIASES
  $ nim kv ttl
```

_See code: [src/commands/key-value/ttl.ts](https://github.com/nimbella/nimbella-cli/blob/v1.13.0/src/commands/key-value/ttl.ts)_
