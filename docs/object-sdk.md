----
id: object-sdk
title: The Nimbella File Stores
sidebar_label: Nimbella File Stores
----
# The Nimbella File Stores

A Nimbella account that has been provisioned with "storage" will have two file stores associated with it.  Often this kind of store is called an "object" store or "blob" store.  It is designed to hold unstructured items of varying size, named and managed as files.

1.  The _web_ store contains files to be served as the front-end portion of your app.
2.  The _data_ store contains files managed by the actions of your app.

The `nim` command will show the current contents of these stores.

```
# To show web store contents
nim web list

# To show data store contents (may be empty initially)
nim object list
```

Yes, we use `object` to refer to the data store.  The term `data` would be too generic in this context.

This document divides into these parts.

- [Conceptual Overview](#conceptual-overview)
- Using a file store from actions via a [Nimbella SDK](#using-file-stores-via-the-nimbella-sdk).
   - [The `nodejs` SDK](#the-nodejs-sdk)
   - [The `php` SDK](#the-php-sdk)
   - [The `python` SDK](#the-python-sdk)
- Managing a file store with the [`nim` CLI](#managing-file-stores-with-the-nim-CLI).

## Conceptual overview

An file store behaves like a file _system_ in many ways.

- the entities in a file store are often called "files", and they have names, metadata, and contents, just like files in a filesystem
- the names are hierarchical, separated by slashes and can be used to organize information into a hierarchy
    - however, unlike in a file system, the "directories" are just portions names: they cannot be empty and are not created or deleted explicitly

The two file stores provided with your Nimbella namespace are similar in some ways and specialized in others.

- Only the web store provides permanent public URLs to its files (as opposed to time-limited signed URLs).  It is intended to hold the front end of your application.
- The web store is directly provisioned from a Nimbella project when you issue `nim project deploy`.  There is no direct provisioning of the data store from a project.
- Both can be accessed by using one of the Nimbella SDKs inside an action
- Both can be queried and updated using `nim` 
- Using the SDK, you can generate a _signed URL_ for a file in either store, allowing your application's front-end (or your end-users) a time-limited means to upload or download the contents of that file
    - the upload capability can be useful in either store
    - the download capability is useful for the data store: files in the web store already have world-accessible URLs

## Using a file store via the Nimbella SDK

Nimbella provides SDKs for use within actions.  Currently, these exist for `nodejs`, `php`, and `python`.   An SDK is under development for `java` and the plan is to eventually cover all supported languages.

### Using the `nodejs` SDK

In an action written in JavaScript, you should include

```
const nim = require('@nimbella/sdk')
```

The `nim` object serves as a client factory for both file stores and for the key-value store.  Only the file store usage is covered here.  

To obtain a client for use with your data store, use

```
const client = await nim.storage()  // client will access the data store
// or equivalently
const client = await nim.storage(false) // client will access the data store
```

You can also obtain a client for use with your web store.

```
const client = await nim.storage(true) // client will access the web store
```

The boolean argument is used to select which file store the client will work with.

Note the `await` keyword in the examples.   The `storage` function returns a `Promise` resolving to a client, not the client itself.

#### Programming file store operations in Javascript

In the present Nimbella SDK, the file store client is an instance of what the Google Cloud Storage SDK calls a `Bucket` object.  The API references for what you can do with this object are provided by [Google](https://googleapis.dev/nodejs/storage/latest/Bucket.html).

- **Note: we may provide a greater level of abstraction in future releases of the SDK**

##### Bucket

Most of the methods of `Bucket` should not be used without fully understanding the implications, since they are administrative in nature and Nimbella has pre-configured the file store for you.  The important ones are listed here.

- [bucket.file(name)](https://googleapis.dev/nodejs/storage/latest/Bucket.html#file) -- returns a [File](https://googleapis.dev/nodejs/storage/latest/File.html) object, which acts as a handle on a specific file within the file store.  The file may or may not exist.
- [bucket.upload(pathString, options)](https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload) -- uploads a file from the local file system to the file store.

Note that inside an action, "local" means local to the action runtime container.  Thus, while `upload` has its uses, the `save` method of `File` is more general since it can provide the file contents from memory.

##### File

The most commonly used methods of [File](https://googleapis.dev/nodejs/storage/latest/File.html) are the following:

- [file.exists()](https://googleapis.dev/nodejs/storage/latest/File.html#exists) -- test whether a file exists in the store
- [file.download(options)](https://googleapis.dev/nodejs/storage/latest/File.html#download) -- return the contents of a file in the store
- [file.save(data)](https://googleapis.dev/nodejs/storage/latest/File.html#save) -- store contents from memory into the file on the store
- [file.delete()](https://googleapis.dev/nodejs/storage/latest/File.html#delete) -- deletes the file from the store
- [file.copy(destination)](https://googleapis.dev/nodejs/storage/latest/File.html#copy) -- copies the file within the store
- [file.move(destination)](https://googleapis.dev/nodejs/storage/latest/File.html#move) -- moves the file within the store

##### getSignedUrl vs save or download

With the basic operations of the previous section, you are able to both read and write data from a file store inside an action.  In some cases, however, the data originates in the front-end.  If the data is limited in size (less than a megabyte), it is perfectly reasonable for the front-end to pass this data as a parameter to the action, or receive as part of the action result.  For larger volumes of data, however, this cannot work because actions have limits on the sizes of their inputs and outputs.  For that case we have one more important method of `File`.

- [file.getSignedUrl(config)](https://googleapis.dev/nodejs/storage/latest/File.html#getSignedUrl)

The result returned from this method is a URL that can be used, for a limited time, to directly transfer data to the file in the file store (or to delete it) using one of the HTTP verbs GET, PUT, or DELETE.

The `config` object must contain at least these members.

- **action** -- either "read", "write", or "delete" (corresponding to the HTTP verbs GET, PUT, and DELETE).  The URL can only be used for the enabled action.
- **expires** -- a timestamp when the URL will expire.  The value given is paossed to `new Date()`.  The maximum is 7 days from now.
- **version** -- must be **'v4'**.  This controls the signing version to use.

The `config` object may also contain

- **contentType** -- the mime type of the expected content.  If this is provided, then the actual content must match when the URL is used.  If it omitted, then the content type of the actual content is not restricted.

### Using the `php` SDK

In an action written in php, you should include

```
use Nimbella\Nimbella;
$nim = new Nimbella()
```

The `nim` object serves as a client factory for the data store and for the key-value store.  Only the file store usage is covered here.  

To obtain a client for use with your data store, use

```
$client = $nim->storage();
```

Unlike the `nodejs` and `python` SDKs, the `php` SDK does not currently provide access to the web store.   We expect to rectify this in an upcoming release.

#### Programming file store operations in php

In the present Nimbella SDK, the file store client is an instance of what the Google Cloud Storage SDK calls a `Bucket` object.  The API references for what you can do with this object are provided by [Google](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/bucket).

- **Note: we may provide a greater level of abstraction in future releases of the SDK**

##### Bucket

Most of the methods of `Bucket` should not be used without fully understanding the implications, since they are administrative in nature and Nimbella has pre-configured the file store for you.  The important ones are listed here.

- [$bucket->object(name)](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/bucket?method=object) -- returns a [StorageObject](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject) object, which acts as a handle on a specific file within the file store.  The file may or may not exist.
- [$bucket->upload(data)] -- uploads a file from the local file system to the file store.

The `data` argument may be a string, a resource, or a stream.

##### StorageObject

In the php SDK, a [StorageObject](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject) denotes a file in the file store.  

- [file.exists()](https://googleapis.dev/nodejs/storage/latest/File.html#exists) -- test whether a file exists in the store
- [file.download(options)](https://googleapis.dev/nodejs/storage/latest/File.html#download) -- return the contents of a file in the store
- [file.save(data)](https://googleapis.dev/nodejs/storage/latest/File.html#save) -- store contents from memory into the file on the store
- [file.delete()](https://googleapis.dev/nodejs/storage/latest/File.html#delete) -- deletes the file from the store
- [file.copy(destination)](https://googleapis.dev/nodejs/storage/latest/File.html#copy) -- copies the file within the store
- [file.move(destination)](https://googleapis.dev/nodejs/storage/latest/File.html#move) -- moves the file within the store
- [for python](https://googleapis.dev/python/storage/latest/buckets.html)

### Using the `python` SDK

You install the SDK with

```
pip install nimbella
```

To use it

```
import nimbella
```

The `nimbella` object serves as a client factory for both file stores and for the key-value store.  Only the file store usage is covered here.

To obtain a client for use with your data store, use

```
client = nimbella.storage() # client will access the data store
# or equivalently
client = nimbella.storage(False) # client will access the data store
```

You can also obtain a client for use with your web store.

```
client = nimbella.storage(True) # client will access the web store
```

The boolean argument is used to select which file store the client will work with.


## Managing file stores with the `nim` CLI

The `nim` CLI provides access to both file stores to support management programming in shell scripts and the like.  Under `nim object` we have the following commands, which access the data store.

```
nim object clean   Deletes all content from the data Store
nim object create  Adds a a file to the data Store
nim object delete  Deletes a file from the data Store
nim object get     Gets a file from the data Store
nim object list    Lists files in the data Store
nim object update  Updates a file in the data Store
nim object url     Generates a signed URL for a file in the data Store
```

Under `nim web` we have the following commands, which access the web store.

```
nim web clean   Deletes all content from the web store
nim web create  Adds a file to the web store
nim web delete  Deletes a file from the web store
nim web get     Gets a file from the web store
nim web list    Lists files in the web store
nim web update  Updates a file in the web store
```

Note that the `url` command is only available for the data store.  The other commands behave analogously for both stores.

**To remove all files from one of the file stores**

```
nim [object|web] clean <namespace>
```

The `<namespace>` name is optional.  If omitted, the command applies to the data object or web store of current namespace.  You will be asked for confirmation unless you supply a `--force` (or `-f`) flag on the command.  You may notice that a "clean" web store actually has one file in it, `404.html`.  This is a "not found" page for your web content, supplied by Nimbella.  You can replace this page with one of your own, but when the web store is cleaned it reverts to the Nimbella-provided page.

**To add content to one of the file stores**

```
nim [object|web] [create|update] 
```


