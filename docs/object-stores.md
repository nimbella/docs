# The Nimbella Object Stores

A Nimbella account that has been provisioned with "storage" will have two object stores associated with it.

1.  The _web_ store contains objects to be served as the front-end portion of your app.
2.  The _data object_ store contains objects managed by the actions of your app.

The `nim` command will show the current contents of these stores.

```
# To show web store contents
nim web list

# To show data object store contents
nim object list
```

This document divides into these parts.

1. [Conceptual Overview](#conceptual-overview)
2. How to use either object store from serverless functions via a [Nimbella SDK](#using-object-stores-via-the-nimbella-sdk).
   - [Using the `nodejs` SDK](#using-the-nodejs-sdk)
   - [Using the `php` SDK](#using-the-php-sdk)
   - [Using the `python` SDK](#using-the-python-sdk)
3. How manage either object store from the [`nim` CLI](#using-object-stores-via-the-nim-CLI).

## Conceptual overview

An object store behaves like a file system in a number of ways.

- the objects in the object store are often called "files" and they have names, metadata, and contents, just like files in a filesystem
- the names of objects in the object store are hierarchical and resemble file names in a file system
    - unlike a file system, there are no directories or folders, per se.  There may appear to be, but they are just a naming convention

We will call the objects in the object stores "files" in this document.

The two object stores provided with your Nimbella namespace are similar in some ways and specialized in others.

- Both are implemented using the object storage capabilities of the hosting cloud
- Both can be accessed from the Nimbella SDK inside an action
- Using the SDK, you can generate a _signed URL_ for a file in either object store, allowing your application's front-end (or your end-users) a time-limited means to upload or download the contents of that file
    - the upload capability can be useful in either object store
    - the download capability is useful for the data object store: files in the web store already have world-accessible URLs that can be used to download
- Both can be queried and updated using `nim` but some details of those capabilities vary because of the different intended purposes of the stores
- Only the web store provides permanent public URLs to its objects (as opposed to time-limited signed URLs).  It is intended to hold the front end of your application.
- The web store is directly provisioned from a Nimbella project when you issue `nim project deploy`.  There is no direct provisioning of the data object store from a project.

## Using object stores via the Nimbella SDK

Nimbella provides SDKs for use within actions.  Currently, these exist for `nodejs`, `php`, and `python`.   An SDK is under development for `java` and the plan is to eventually cover all supported languages.

### Using the `nodejs` SDK

In an action written in JavaScript, you should include

```
const nim = require('@nimbella/sdk')
```

The `nim` object serves as a client factory both object stores and for the key-value store.  Only the object store usage is covered here.  To obtain a client for use
with your data object store, use

```
const client = await nim.storage()  // client will access the data object store
// or equivalently
const client = await nim.storage(false) // client will access the data object store
```

You can also obtain a client for use with your web store.

```
const client = await nim.storage(true) // client will access the web store
```

The boolean argument is used to select which object store the client will work with.   We expect that working with the data object store is going to be the usual case.  However, an action can also programmatically modify the contents of the web store.  This should be done cautiously if the web store (as is usually the case) will also be directly updated from your Nimbella project.

Note the `await` keyword in the examples.   The `storage` function returns a `Promise` resolving to a client, not the client itself.

#### Capabilities of an Object Store Client

In the present Nimbella SDK, the object store client is an instance of what the Google Cloud Storage SDK calls a `Bucket` object.  The API reference for what you can do with this object is provided by [Google](https://googleapis.dev/nodejs/storage/latest/Bucket.html).  

- **Note: we may provide a greater level of abstraction in future releases of the SDKs**

Most of the methods of `Bucket` should not be needed and should not be used without fully understanding the implications.  The important ones are the following.

- [file](https://googleapis.dev/nodejs/storage/latest/Bucket.html#file) -- returns a `File` object, which denotes a file within the object store.  The returned object is a handle (the underlying resource may or may not exist), so it can be used for creating new files as well as reading or modifying existing ones.
- [upload](https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload) -- uploads a file from the local file system to the object store.  Note that inside an action, "local" means local to the action runtime container.  While this has possible uses, the `save` method of `File` is more general since it can provide the contents from memory.

The most commonly used methods of [File](https://googleapis.dev/nodejs/storage/latest/File.html) are the following:

- [exists](https://googleapis.dev/nodejs/storage/latest/File.html#exists) -- test whether a file exists in the object store
- [download](https://googleapis.dev/nodejs/storage/latest/File.html#download) -- get the contents of a file in the object store (can return contents to memory or store in a local file)
- [save](https://googleapis.dev/nodejs/storage/latest/File.html#save) -- store contents from memory into the object store file
- [getSignedUrl](https://googleapis.dev/nodejs/storage/latest/File.html#getSignedUrl) -- see [below](#getsignedurl-vs-save-or-download)
- [delete](https://googleapis.dev/nodejs/storage/latest/File.html#) -- deletes the file from the object store
- [copy](https://googleapis.dev/nodejs/storage/latest/File.html#) -- copies the file within the object store
- [move](https://googleapis.dev/nodejs/storage/latest/File.html#) -- moves the file within the object store

##### getSignedUrl vs save or download

The primary means for storing or retrieving modest amounts of data in an object store is to use the `save` (storing) or `download` (retrieving) methods of `File`.  But, what about _large_ amounts of data?  You will be using the storage client inside an action, remember.  As long as the data fits in memory and does not have to be uploaded into the action from your front end, or returned from the action to your front end, you should be fine just using `save` or `download` to store or retrieve the data.

However, actions have a limit of one megabyte on their input and output data size.  If data must flow between your front-end and a file in your object store, and its size may exceed that limit, you cannot interpose the action in the middle but must enable a direct channel between your front-end and the object store itself.   The `getSignedUrl` method is designed for this purpose.  The method returns a URL that can be returned by the action to your front-end and then used directly by your front end.  Every signed URL

- has an expiration that cannot be more than 7 days in the future (it will stop working once it expires)
- is enabled for a specific action (read, write, or delete)
- can be restricted to a particular content type



## Using object stores via the `nim` CLI