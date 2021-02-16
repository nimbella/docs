---
id: file-stores
title: The Nimbella File Stores
sidebar_label: Nimbella File Stores
---

A Nimbella account that has been provisioned with "storage" will have two file stores associated with it.  Often this kind of store is called an "object" store or "blob" store.  It is designed to hold unstructured items of varying size, named and managed as files.

1.  The _web_ store contains files to be served as the front-end portion of your app.
2.  The _data_ store contains files managed by the actions of your app.

The `nim` command will show the current contents of these stores.

```shell
# To show web store contents
nim web list

# To show data store contents (may be empty initially)
nim object list
```

Yes, we use `object` to refer to the data store.  The term `data` would be too generic in this context.

This document divides into these parts.

- [Conceptual Overview](#conceptual-overview)
- [Using a file store inside actions](#using-a-file-store-inside-actions) using a Nimbella SDK
   - [The `nodejs` SDK](#the-nodejs-sdk)
   - [The `php` SDK](#the-php-sdk)
   - [The `python` SDK](#the-python-sdk)
- [Using signed URLs](#using-signed-urls)
- [Managing file stores with the `nim` CLI](#managing-file-stores-with-the-nim-CLI).

### Conceptual overview

An file store behaves like a file _system_ in many ways.

- The entities in a file store are often called "files", and they have names, metadata, and contents, just like files in a filesystem.
- The names are hierarchical, separated by slashes and can be used to organize information into a hierarchy.
- Unlike in a file system, the "directories" are just segments of names: they cannot be empty and are not created or deleted explicitly.

The two file stores provided with your Nimbella namespace are similar in several ways.

- Both can be accessed by using one of the Nimbella SDKs inside an action.
- Both can be queried and updated using `nim`.
- You can generate a _signed URL_ for a file in either store, granting temporary read, write, or delete access to the file.
    - For motivations and details see [Using signed URLs](#using-signed-urls).

The file stores are also different in several ways.

- Only the web store provides permanent public URLs to its files (as opposed to time-limited signed URLs).  It is intended to hold the front end of your application.
- The web store is directly provisioned from a Nimbella project when you issue `nim project deploy`.  There is no direct provisioning of the data store from a project.
- Files in the web store are connected to a CDN so that their delivery as web content can be done efficiently.  The caching policy is controlled at the time you deploy the content as described in [Nimbella deployer documentation](configuration.md#specifying-cache-behavior)

### Using a file store inside actions

Nimbella provides SDKs for use within actions.  Currently, these exist for [`nodejs`](https://github.com/nimbella/nimbella-sdk-nodejs), [`php`](https://github.com/nimbella/nimbella-sdk-php), and [`python`](https://github.com/nimbella/nimbella-sdk-python).   An SDK is under development for [`java`](https://github.com/nimbella/nimbella-sdk-java) and the plan is to eventually cover all supported languages.

#### Using the `nodejs` SDK

In an action written in JavaScript, you should include

```js
const nim = require('@nimbella/sdk')
```

The `nim` object serves as a client factory for both file stores and for the key-value store.  Only the file store usage is covered here.  

To obtain a client for use with your data store, use

```js
const client = await nim.storage()  // client will access the data store
// or equivalently
const client = await nim.storage(false) // client will access the data store
```

You can also obtain a client for use with your web store.

```js
const client = await nim.storage(true) // client will access the web store
```

The boolean argument is used to select which file store the client will work with.

**Note:** The `storage` function returns a `Promise` resolving to a client, not the client itself.  The keyword `await` in the examples suggests one way to handle this, inside an `async` function.

##### Programming file store operations in JavaScript

In the present Nimbella SDK, the file store client is an instance of what the Google Cloud Storage SDK calls a `Bucket` object.  The API references for what you can do with this object are provided by [Google](https://googleapis.dev/nodejs/storage/latest/Bucket.html).

- **Note: we may provide a greater level of abstraction in future releases of the SDK**

###### Bucket

Most of the methods of `Bucket` should not be used without fully understanding the implications, since they are administrative in nature and Nimbella has pre-configured the file store for you.  The important ones are listed here.

- [bucket.file(name)](https://googleapis.dev/nodejs/storage/latest/Bucket.html#file) -- returns a [File](https://googleapis.dev/nodejs/storage/latest/File.html) object, which acts as a handle on a specific file within the file store.  The file may or may not exist.
- [bucket.upload(pathString, options)](https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload) -- uploads a file from the local file system to the file store.

Note that inside an action, "local" means local to the action runtime container.  Thus, while `upload` has its uses, the `save` method of `File` is more general since it can provide the file contents from memory.

###### File

The most commonly used methods of [File](https://googleapis.dev/nodejs/storage/latest/File.html) are the following:

- [file.exists()](https://googleapis.dev/nodejs/storage/latest/File.html#exists) -- test whether a file exists in the store
- [file.download(options)](https://googleapis.dev/nodejs/storage/latest/File.html#download) -- return the contents of a file in the store
- [file.save(data)](https://googleapis.dev/nodejs/storage/latest/File.html#save) -- store contents from memory into the file on the store
- [file.delete()](https://googleapis.dev/nodejs/storage/latest/File.html#delete) -- deletes the file from the store
- [file.copy(destination)](https://googleapis.dev/nodejs/storage/latest/File.html#copy) -- copies the file within the store
- [file.move(destination)](https://googleapis.dev/nodejs/storage/latest/File.html#move) -- moves the file within the store
- [file.getSignedUrl(config)](https://googleapis.dev/nodejs/storage/latest/File.html#getSignedUrl) -- gets a signed URL.  See [Using signed URLs](#using-signed-urls)

#### Using the `php` SDK

In an action written in php, you should include

```php
use Nimbella\Nimbella;
$nim = new Nimbella()
```

The `nim` object serves as a client factory for the data store and for the key-value store.  Only the file store usage is covered here.  

To obtain a client for use with your data store, use

```php
$client = $nim->storage();
```

Unlike the `nodejs` and `python` SDKs, the `php` SDK does not currently provide access to the web store.   We expect to rectify this in an upcoming release.

##### Programming file store operations in php

In the present Nimbella SDK, the file store client is an instance of what the Google Cloud Storage SDK calls a `Bucket` object.  The API references for what you can do with this object are provided by [Google](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/bucket).

- **Note: we may provide a greater level of abstraction in future releases of the SDK**

###### Bucket

Most of the methods of `Bucket` should not be used without fully understanding the implications, since they are administrative in nature and Nimbella has pre-configured the file store for you.  The important ones are listed here.

- [$bucket->object(name)](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/bucket?method=object) -- returns a [StorageObject](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject) object, which acts as a handle on a specific file within the file store.  The file may or may not exist.
- [$bucket->upload(data, options)](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/bucket?method=upload) -- uploads content to the file store.

The `data` argument for `upload` may be a string, a stream, or a resource in the local file system.  But, note that inside an action, "local" means local to the action runtime container.   A string or stream is usually more useful here.

###### StorageObject

In the php SDK, a [StorageObject](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject) denotes a file in the file store.  Its most commonly used operations are the following.

- [$object->exists()](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject?method=exists) -- test whether a file exists in the store
- [$object->downloadAsString(options)](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject?method=downloadAsString) -- return the contents of a file in the store as a string
- [$object->downloadAsStream(options)](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject?method=downloadAsStream) -- return the contents of a file in the store as a stream
- [$object->delete()](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject?method=delete) -- deletes the file from the store
- [$object->copy(destination, options)](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject?method=copy) -- copies the file
    - **Note:** in the php SDK, unlike in nodejs or python, the copy operation requires you to specify the destination bucket as well as the file name within the bucket.  The link above provides more details.
- [$object->rename(destination)](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject?method=rename) -- moves the file within the store
- [$object->signedUrl(expires, options)](https://googleapis.github.io/google-cloud-php/#/docs/google-cloud/v0.122.0/storage/storageobject?method=signedUrl) -- gets a signed URL.  See [Using signed URLs](#using-signed-urls)

#### Using the `python` SDK

In an action written in python, you should include

```python
import nimbella
```

The `nimbella` object serves as a client factory for both file stores and for the key-value store.  Only the file store usage is covered here.

To obtain a client for use with your data store, use

```python
client = nimbella.storage() # client will access the data store
# or equivalently
client = nimbella.storage(False) # client will access the data store
```

You can also obtain a client for use with your web store.

```python
client = nimbella.storage(True) # client will access the web store
```

The boolean argument is used to select which file store the client will work with.

##### Programming file store operations in python

In the present Nimbella SDK, the file store client is an instance of what the Google Cloud Storage SDK calls a `Bucket` object.  The API references for what you can do with this object are provided by [Google](https://googleapis.dev/python/storage/latest/buckets.html).

- **Note: we may provide a greater level of abstraction in future releases of the SDK**

###### Bucket

Most of the methods of `Bucket` should not be used without fully understanding the implications, since they are administrative in nature and Nimbella has pre-configured the file store for you.  The important one is listed here.

- **bucket.blob(name)** -- returns a [Blob](https://googleapis.dev/python/storage/latest/blobs.html) object, which acts as a handle on a specific file within the file store.  The file may or may not exist.

##### Blob

In the python SDK, a [Blob](https://googleapis.dev/python/storage/latest/blobs.html) denotes a file in the file store.  Its most commonly used operations are the following.

- **blob.exists()** -- test whether a file exists in the store
- **blob.download\_as\_\[bytes|text\]()** -- reads the contents of the file as either bytes or a string according to the method name
- **blob.upload\_from\_string(data)** -- writes data (either a string or bytes) to the file on the file store
- **blob.delete()** -- deletes the file from the store
- **blob.rewrite(source)** -- rewrites a source blob into this one (effectively a copy operation within the file store)
- **blob.generate\_signed\_url** -- gets a signed URL.  See [Using signed URLs](#using-signed-urls)

### Using signed Urls

As documented in the language-specific sections, each SDK provides your actions with basic operations to read and write data from a file store.    When reading or writing files that could exceed a megabyte in size, an additional consideration applies.  

If the data originates in your application's front-end, rather than internally to the action, the data would have to be transferred between the front-end and the action in order to use the simpler methods.  However, actions are limited to one megabyte of data in each direction.  To avoid exceeding this limit, you can create a direct time-limited channel between your front-end (or you end users) and one of your file stores.  This direct channel is called a _signed URL_ and it is, in fact, a network URL that can be used for data transfer _to_ a file in a file store (using `PUT`) or _from_ a file in a file store (using `GET`) or to delete a file (with `DELETE`).

Note that it is not necessary to create a signed URL to read from the web store since every file there has a permanent world-readable URL.

Each of the SDKs has a method to obtain a signed URL, although the methods are named differently in each SDK (documented above).  When obtaining a signed URL it is necessary to specify at least the following values.

- The HTTP method to use (GET, PUT, and DELETE).  The URL can only be used for the enabled action.
    - the `nodejs` SDK uses configuration options member `action` for this and uses `read`, `write`, and `delete` as the names for the methods
    - the `php` and `python` SDKs use the options argument `method` for this and uses the standard HTTP names
- The expiration: a timestamp when the URL will expire.  The value given is passed to `new Date()`.  The maximum is 7 days from now.
	- the `nodejs` SDK uses configuration options member `expires` for this
	- the `php` SDK requires this as the first argument to `signedUrl`
	- the `python` SDK uses the options argument `expiration` for this
- The signing version to use.  The current version to use is **'v4'**.
	- all three SDKs call this value `version`

You may also specify at least this additional value.

- **contentType** -- the mime type of the expected content.  If this is provided, then the actual content must match when the URL is used.  If it omitted, then the content type of the actual content is not restricted.

There are many more options available but these usually suffice for most purposes.  You are directed to the individual SDK sections in which there are links to the original documentation provided by Google for further details.

### Managing file stores with the `nim` CLI

The `nim` CLI provides access to both file stores to support management programming in shell scripts and the like.  The commands under [`nim object`](nim-cmds/object.md) are directed to the data store and those under [`nim web`](nim-cmds/web.md) are directed to the web store.

**To remove all files from one of the file stores**

```shell
nim [object|web] clean
```

You will be asked for confirmation unless you supply a `--force` (or `-f`) flag on the command.

You may notice that a "clean" web store actually has one file in it, `404.html`.  This is a "not found" page for your web content, supplied by Nimbella.  You can replace this page with one of your own, but when the web store is cleaned it reverts to the Nimbella-provided page.

**To remove a single file from one of the file stores**

```shell
nim [object|web] delete FILENAME
```

The file you name is deleted without prompting.

**To add content to one of the file stores**

```shell
nim [object|web] [create|update] FILEPATH
```

The `create` and `update` commands are similar.  The `create` commands will fail if the file already exists and `update` will replace the file contents of an existing file.

The argument should be the path to the local file that is to be copied to the file-store.  The name of the
file is duplicated on the file-store unless you use the `--destination` (or `-d`) flag.  A destination can
either be a new name for the file (if it does not end in a slash) or a "directory" to be pre-pended to the
path (if it ends in a slash).

**Note:** Be careful with absolute paths or paths containing `../`.  They may be duplicated literally in the file store.  We are looking at making some syntax improvements to avoid this pitfall.

**To list the files in a file store**

```shell
nim [object|web] list [PREFIX]
```

If the prefix argument is omitted, this lists all the files.  Otherwise, it lists all files whose names begin with the prefix.  The `--long` (or `-l) flag causes the list to include more detail.

**To retrieve file contents from a file store**

```shell
nim [object|web] get FILENAME
```

There will be an attempt to print the file contents on the console, unless you specify the `--save` or `--saveAs=NAME` flag.  The former saves the file under its existing name in the current directory and the latter saves it under a new name, also in the current directory.   This target directory can be changed by supplying a second argument to the command (**Note:** this syntax has caused some confusion and may be changed in a future release).

**To obtain a signed URL (data store only)**

```shell
nim object url FILENAME
```

By default, the returned URL grants permission to "read" (GET) the content of the file for 15 minutes.  You can change the permission to "write" (PUT) with the `--permission` (or `-p`) flag and you can change the "time to live" with the `--ttl` (or `-t`) flag.  The unit for `--ttl` is minutes.  Note that there is maximum of 7 days (7 * 1440 minutes).