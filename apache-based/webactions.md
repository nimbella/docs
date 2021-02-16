# Web Actions

Web actions are OpenWhisk actions annotated to help you  build web-based applications quickly. This lets you program backend logic that your web application can access anonymously without requiring an OpenWhisk authentication key. It is up to the action developer to implement their own desired authentication and authorization (i.e. OAuth flow).

Web action activations are associated with the user that created the action. This actions defers the cost of an action activation from the caller to the owner of the action.

## Create a web action

Here's an example of creating the _web action_ `hello` in the package `demo` in your Nimbella namespace using the CLI's `--web` flag, then getting the URI for the action.

Let's start with the following JavaScript action `hello.js`:

```javascript
function main({name}) {
  var msg = 'you did not tell me who you are.';
  if (name) {
    msg = `hello ${name}!`
  }
  return {body: `<html><body><h3>${msg}</h3></body></html>`}
}
```

In the `nim` CLI, create the `demo` package:

```bash
$ nim package create demo
```
**Note:** Successful completion of any `create` command has no console output.

Then create a `hello` action in the `demo` package in your namespace. Use the `--web` flag with a value of `true` or `yes`. The following procedures returns a URL that makes the action accessible via the REST interface without the need for credentials.

1. In your command terminal, use the `cd` command to navigate to the local directory in which you've placed _hello.js_.
  ```bash
  cd <local-directory>
  ```
2. Run the following command.
  ```bash
  $ nim action create demo/hello hello.js --web true
  ```
3. Get the URL for this webaction with the `action get` command and the `--url` parameter.
  `my-namespace` is the name of your own Nimbella Cloud namespace.
  ```bash
  $ nim action get demo/hello --url
      https://apigcp.nimbella.io/api/v1/web/my-namespace/demo/hello
  ```

See the next section on how to use this URL.

**Tip:** To configure a web action with credentials, refer to the Apache OpenWhisk document [Securing web actions](webactions.md#securing-web-actions).

### The URL for a web action

A web action can be invoked with a URL that is structured as follows:

```http
https://{APIHOST}/api/v1/web/{QUALIFIED ACTION NAME}.{EXT}
```

See [the previous section](#create-a-web-action) for the procedure on how to expose an action as a web action and get the entire URL preceding `.{EXT}`

The `.{EXT}` part of the URL is called the _extension_. It's typically `.http`, although other values are permitted, as described later. If `.{EXT}` is not specified, `.http` is assumed.

The web action API path can be used with `curl` or `wget` without an API key. It can even be entered directly in your browser.

For example, enter the URLfrom the `nim action get demo/hello --url` command into your browser with an `.http` extension. You should see the following result into your browser window:

```http
https://apigcp.nimbella.io/api/v1/web/my-namespace/demo/hello.http
    you did not tell me who you are.
```

This is the result returned by the JavaScript `name` function when the value is not provided. Now try providing the value with the following URL:

```http
https://apigcp.nimbella.io/api/v1/web/my-namespace/demo/hello.http?name=Jane
    hello Jane!
```

Or invoke the action via `curl` from the command line, again substituting the name of your Nimbella namespace:

```bash
$ curl https://apigcp.nimbella.io/api/v1/web/my-namespace/demo/hello.http

    <html><body><h3>you did not tell me who you are.</h3></body></html>
```
Or pass a `name` parameter:

```bash
$ curl https://apigcp.nimbella.io/api/v1/web/my-namespace/demo/hello.http?name=Jane

    <html><body><h3>hello Jane!</h3></body></html>
```

### Other web action examples

Here's an example of a web action that performs an HTTP redirect:

```javascript
function main() {
  return {
    headers: { location: 'http://nimbella.io' },
    statusCode: 302
  }
}
```

Or sets a cookie:
```javascript
function main() {
  return {
    headers: {
      'Set-Cookie': 'UserID=Jane; Max-Age=3600; Version=',
      'Content-Type': 'text/html'
    },
    statusCode: 200,
    body: '<html><body><h3>hello</h3></body></html>' }
}
```

Or sets multiple cookies:
```javascript
function main() {
  return {
    headers: {
      'Set-Cookie': [
        'UserID=Jane; Max-Age=3600; Version=',
        'SessionID=asdfgh123456; Path = /'
      ],
      'Content-Type': 'text/html'
    },
    statusCode: 200,
    body: '<html><body><h3>hello</h3></body></html>' }
}
```

Or returns an `image/png`:
```javascript
function main() {
    let png = <base 64 encoded string>
    return { headers: { 'Content-Type': 'image/png' },
             statusCode: 200,
             body: png };
}
```

Or returns `application/json`:
```javascript
function main(params) {
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: params
    };
}
```

The default `content-type` for an HTTP response is `application/json` and the body can be any allowed JSON value.

**Tip:** The default `content-type` can be omitted from the headers.

Be aware of the response size limit for actions [see the Apache OpenWhisk document on reference](reference.md), because a response fails if it exceeds the predefined system limits. Large objects should not be sent inline through Nimbella, but instead deferred to an object store, for example.

## HTTP request handling with actions

A `nim` action that has not been exposed as a web action requires authentication and must respond with a JSON object.

In contrast, web actions may be invoked without authentication and may be used to implement HTTP handlers that respond with _headers_, _statusCode_, and _body_ content of various types. The web action must still return a JSON object, but the Nimbella system (namely the `controller`) treats a web action differently if its result includes one or more of the following as top-level JSON properties:

* `headers`: a JSON object where the keys are header-names and the values are string, number, or boolean values for those headers. The default is no headers. To send multiple values for a single header, the header's value should be a JSON array of values.
* `statusCode`: a valid HTTP status code (default is `200 OK` if `body` is not empty, otherwise `204 No Content`).
* `body`: a string which is either plain text, a JSON object or array, or a base64-encoded string for binary data.
  The default is an empty response. The `body` is considered empty if it is `null`, the empty string `""` or `undefined`.

The controller passes along any action-specified headers to the HTTP client when terminating the request/response. The controller responds with the given status code when present. Lastly, the body is passed along as the body of the response. If a `content-type` header is not declared in the action result’s headers, the body is interpreted as `application/json` for non-string values or `text/html` otherwise. When the `content-type` is defined, the controller determines if the response is binary data or plain text and decodes the string, using a base64 decoder as needed. Should the body fail to be decoded correctly, an error is returned to the caller.

## HTTP context

All web actions, when invoked, receive one of the following additional HTTP request details as parameters to the action input argument.

| Parameter | Type | Description |
| :--------- | :--- | :------- |
| `__ow_method` | string | The HTTP method of the request. |
| `__ow_headers` | map string to string | The request headers. |
| `__ow_path` | string | The unmatched path of the request. (Matching stops after consuming the action extension.) |
| `__ow_user` | string | The namespace identifying the Nimbella authenticated subject. <br/>The `__ow_user` property is only present when the web action is annotated to require authentication and allows a web action to implement its own authorization policy. See the [Apache OpenWhisk document on annotations](https://github.com/apache/openwhisk/blob/master/docs/annotations.md/#annotations-specific-to-web-actions).|
| `__ow_body` | string | The request body entity: a base64-encoded string when content is binary or JSON object/array, otherwise a plain string. <br/>The `__ow_body` property is present either when handling "raw" HTTP requests, or when the HTTP request entity is not a JSON object or form data. |
| `__ow_query` | string | The query parameters from the request as an unparsed string. <br/>The `__ow_query` property is available only when a web action elects to handle the ["raw" HTTP request](#raw-http-handling). It is a string containing the query parameters parsed from the URI (separated by `&`).|


A request may not override any of these named `__ow_` parameters. Attempting to do so will result in a failed request with status equal to `400 Bad Request`.

Web actions otherwise receive query and body parameters as first-class properties in the action arguments, with body parameters taking precedence over query parameters, which in turn take precedence over action and package parameters.

## Additional web action features

Web actions bring additional features, including those described in the following sections.

### Content extensions

The request must specify its desired content type as one of the following: `.json`, `.html`, `.http`, `.svg` or `.text`. For example, in order to receive an HTTP response back, add an `.http` extension to the action name in the URI:
```http
/my-namespace/demo/hello.http
```

See the [Content Extensions](#content-extensions) section.

### Query and body parameters as input

Besides parameters, the action can receive query parameters in the request body.

This is precedence order for merging parameters:
* package parameters
* binding parameters
* action parameters
* query parameter
* body parameters

Each value overrides any previous values in case of overlap. For example, `/my-namespace/demo/hello.http?name=Jane` will pass the argument `{name: "Jane"}` to the action.

### Form data

  In addition to the standard `application/json`, web actions can receive URLs encoded from data `application/x-www-form-urlencoded data` as input.

### Activation via multiple HTTP verbs

A web action can be invoked by HTTP methods `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`, as well as `HEAD` and `OPTIONS`.

### Non-JSON body and raw HTTP entity handling

A web action can accept an HTTP request body other than a JSON object and can elect to always receive such values as opaque values (plain text when not binary, or a base64-encoded string otherwise).

### Examples of web action features

Here are some examples of how you might use these features in a web action.

Consider an action `/my-namespace/demo/prms` with the following body:

```javascript
function main(params) {
    return { response: params };
}
```

Here's an example of invoking the web action using the `.json` extension, indicating a JSON response.

```bash
$ curl https://${APIHOST}/api/v1/web/my-namespace/demo/prms.json

{
  "response": {
    "__ow_headers": {
      "accept": "*/*",
      "connection": "close",
      "host": "ccontroller",
      "user-agent": "curl/7.64.1",
      "x-request-id": "ec7162d9e80d777287717aacb7bc0930"
    },
    "__ow_method": "get",
    "__ow_path": ""
  }
}
```

You can supply query parameters:

```bash
$ curl https://${APIHOST}/api/v1/web/my-namespace/demo/prms.json?name=Jane

{
  "response": {
    "__ow_headers": {
      "accept": "*/*",
      "connection": "close",
      "host": "ccontroller",
      "user-agent": "curl/7.64.1",
      "x-request-id": "3bd23a0a51f4680bd3a30416e58dc92b"
    },
    "__ow_method": "get",
    "__ow_path": "",
    "name": "Jane"
  }
}
```

You can use form data as input:

```bash
$ curl https://${APIHOST}/api/v1/web/my-namespace/demo/pmrs.json -d "name":"Jane"

{
  "response": {
    "__ow_headers": {
      "accept": "*/*",
      "connection": "close",
      "content-type": "application/x-www-form-urlencoded",
      "host": "ccontroller",
      "user-agent": "curl/7.64.1",
      "x-request-id": "2c653229a17015185cf23763bef842b4"
    },
    "__ow_method": "post",
    "__ow_path": "",
    "name:Jane": ""
  }
}
```

You can also invoke the action with a JSON object.

```bash
$ curl https://${APIHOST}/api/v1/web/my-namespace/demo/pmrs.json -H 'Content-Type: application/json' -d '{"name":"Jane"}'

{
  "response": {
    "__ow_headers": {
      "accept": "*/*",
      "connection": "close",
      "content-type": "application/json",
      "host": "ccontroller",
      "user-agent": "curl/7.64.1",
      "x-request-id": "73d7d1d2e4fcfed638d9fbb2c61ea1ca"
    },
    "__ow_method": "post",
    "__ow_path": "",
    "name": "Jane"
  }
}
```

For convenience, query parameters, form data, and JSON object body entities are all treated as dictionaries and their values are directly accessible as action input properties. This is not the case for web actions that opt to handle HTTP request entities more directly or when the web action receives an entity that is not a JSON object.

Here's an example of using a `text/plain` content-type.

```bash
$ curl https://${APIHOST}/api/v1/web/my-namespace/demo/hello.json -H 'Content-Type: text/plain' -d "Jane"

{
  "response": {
    "__ow_body": "Jane",
    "__ow_headers": {
      "accept": "*/*",
      "connection": "close",
      "content-type": "text/plain",
      "host": "ccontroller",
      "user-agent": "curl/7.64.1",
      "x-request-id": "d02f5c2fb613de2ba882775c97ff8bf3"
    },
    "__ow_method": "post",
    "__ow_path": ""
  }
}
```

## Content extensions

A content extension is generally required when invoking a web action; the absence of an extension assumes `.http` as the default.

**Note:** The fully qualified name of the action must include its package name, which is `default` if the action is not in a named package.


## Protected parameters

Action parameters are protected and treated as immutable. Parameters are automatically finalized when enabling web actions.

```bash
$ nim action create /my-namespace/demo/hello hello.js \
      --parameter name Jane \
      --web true
```

The result of these changes is that `name` is bound to `Jane` and cannot be overridden by query or body parameters because of the final annotation. This secures the action against query or body parameters that try to change this value whether by accident or intentionally.

## Securing web actions

By default, a web action can be invoked by anyone having the web action's invocation URL. To secure the web action, use one of the following two options.

### Option 1: Use the `require-whisk-auth` web action annotation

When the `require-whisk-auth` annotation is set to `true`, the action authenticates the invocation request's Basic Authorization credentials to confirm they represent a valid OpenWhisk identity.  When set to a number or a case-sensitive string, the action's invocation request must include an `X-Require-Whisk-Auth` header having this same value. Secured web actions return `Not Authorized` when credential validation fails. For more information about annotations (`-a`), see [this Apache OpenWhisk document](https://github.com/apache/openwhisk/blob/master/docs/annotations.md).

### Options 2: Use the `--web-secure` flag

The `--web-secure` flag automatically sets the `require-whisk-auth` annotation to `true`.

### Examples of securing a web action

The first  example uses the `--web-secure` flag, the second uses the `require-whisk-auth` annotation, and the third example uses `curl`.

Example 1:

```bash
$ nim action update /my-namespace/demo/hello hello.js --web true --web-secure my-secret
```
Example 2:

```bash
$ nim action update /my-namespace/demo/hello hello.js --web true -a require-whisk-auth my-secret
```

Example 3:

```bash
$ curl https://${APIHOST}/api/v1/web/my-namespace/demo/hello.json?name=Jane -X GET -H "X-Require-Whisk-Auth: my-secret"
```

**Important:** The owner of the web action owns all of the web action's activation records and incurs the cost of running the action in the system regardless of how the action was invoked.

## Disable web actions

To disable a web action from being invoked via web API (`https://APIHOST/api/v1/web/`), pass a value of `false` or `no` to the `--web` flag while updating an action with the CLI.

```bash
$ nim action update /my-namespace/demo/hello hello.js --web false
```

## Raw HTTP handling

A web action can interpret and process an incoming HTTP body directly, without the promotion of a JSON object to first-class properties available to the action input (e.g., `args.name` versus parsing `args.__ow_query`). Use the `raw-http` annotation. See the [Apache OpenWhisk document on annotations](https://github.com/apache/openwhisk/blob/master/docs/annotations.md)).

Here's an example of a `curl` command for the previous `hello/pmrs` web action example but modified to show a raw HTTP web action, receiving `name` both as a query parameter and as a JSON value in the HTTP request body.

```bash
$ curl https://${APIHOST}/api/v1/web/my-namespace/demo/prms.json?name=Jane -X POST -H "Content-Type: application/json" -d '{"name":"Jane"}'

{
  "response": {
    "__ow_headers": {
      "accept": "*/*",
      "connection": "close",
      "content-type": "application/json",
      "host": "ccontroller",
      "user-agent": "curl/7.64.1",
      "x-request-id": "50544d62b655c858822d0c00df75c140"
    },
    "__ow_method": "post",
    "__ow_path": "",
    "name": "Jane"
  }
}
```

`nim` uses the [Akka Http](http://doc.akka.io/docs/akka-http/current/scala/http/) framework to [determine](http://doc.akka.io/api/akka-http/10.0.4/akka/http/scaladsl/model/MediaTypes$.html) which content types are binary and which are plain text.

### Enable raw HTTP handling

Enable raw HTTP web actions via the `--web` flag, using the value `raw`.

```bash
$ nim action create /my-namespace/demo/hello hello.js --web raw
```

### Disable raw HTTP handling

Disable raw HTTP by passing a value of `false` or `no` to the `--web` flag.

```bash
$ nim update create /my-namespace/demo/hello hello.js --web false
```

### Decode binary body content from Base64

With raw HTTP handling, the `__ow_body` content is encoded in Base64 when the request content-type is binary. The following functions demonstrate how to decode the body content in Node, Python, Swift and PHP. Simply save one of the methods shown below to file, create a raw HTTP web action utilizing the saved artifact, and invoke the web action.

#### Node

```javascript
function main(args) {
    decoded = new Buffer(args.__ow_body, 'base64').toString('utf-8')
    return {body: decoded}
}
```

#### Python

```python
def main(args):
    try:
        decoded = args['__ow_body'].decode('base64').strip()
        return {"body": decoded}
    except:
        return {"body": "Could not decode body from Base64."}
```

#### Swift

```swift
extension String {
    func base64Decode() -> String? {
        guard let data = Data(base64Encoded: self) else {
            return nil
        }

        return String(data: data, encoding: .utf8)
    }
}

func main(args: [String:Any]) -> [String:Any] {
    if let body = args["__ow_body"] as? String {
        if let decoded = body.base64Decode() {
            return [ "body" : decoded ]
        }
    }

    return ["body": "Could not decode body from Base64."]
}
```

#### PHP

```php
<?php

function main(array $args) : array
{
    $decoded = base64_decode($args['__ow_body']);
    return ["body" => $decoded];
}
```

For example, save the `Node` function as `decode.js` and execute the following commands:

```bash
$ nim action create decode decode.js --web raw
ok: created action decode
$ curl -k -H "content-type: application" -X POST -d "Decoded body" https://${APIHOST}/api/v1/web/my-namespace/default/decodeNode.json
{
  "body": "Decoded body"
}
```
## Options Requests

By default, an OPTIONS request made to a web action results in CORS headers being added automatically to the response headers. These headers allow all origins and the options `get`, `delete`, `post`, `put`, `head`, and `patch` HTTP verbs. In addition, the header `Access-Control-Request-Headers` is echoed back as the header `Access-Control-Allow-Headers` if it is present in the HTTP request. Otherwise, a default value is generated as shown below.

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: OPTIONS, GET, DELETE, POST, PUT, HEAD, PATCH
Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept, User-Agent
```

Alternatively, OPTIONS requests can be handled manually by a web action. To enable this option, add a `web-custom-options` annotation with a value of `true` to a web action. When this feature is enabled, CORS headers are not automatically added to the request response. Instead, it is the developer's responsibility to append their desired headers programmatically.

Here's an example of creating custom responses to OPTIONS requests.

```javascript
function main(params) {
  if (params.__ow_method == "options") {
    return {
      headers: {
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Origin': 'example.com'
      },
      statusCode: 200
    }
  }
}
```

Save this function to _custom-options.js_ and execute the following commands:

```bash
$ nim action create custom-option custom-options.js --web true -a web-custom-options true
$ curl https://${APIHOST}/api/v1/web/automatically/default/custom-options.http -kvX OPTIONS

  < HTTP/1.1 200 OK
  < Server: nginx/1.11.13
  < Content-Length: 0
  < Connection: keep-alive
  < Access-Control-Allow-Methods: OPTIONS, GET
  < Access-Control-Allow-Origin: example.com
```

## Web Actions in Shared Packages

A web action in a shared (public) package is accessible as a web action either directly via the package's fully qualified name, or via a package binding.

**Important:** A web action in a public package is accessible for all bindings of the package even if the binding is private. This is because the web action annotation is carried on the action and cannot be overridden. If you don't want to expose a web action through your package bindings, clone-and-own the package instead.

Action parameters are inherited from its package and, if there is one, the binding. You can make package parameters immutable by defining their values through a package binding. See the [Apache OpenWhisk document on annotations](https://github.com/apache/openwhisk/blob/master/docs/annotations.md/#protected-parameters).

## Error handling

When a `nim` action fails, there are two different failure modes. The first is known as an _application error_ and is analogous to a caught exception: the action returns a JSON object containing a top level `error` property. The second is a _developer error_, which occurs when the action fails catastrophically and does not produce a response. This developer error is similar to an uncaught exception. For web actions, the controller handles application errors as follows:

1. The controller projects an `error` property from the response object.
1. The controller applies the content handling implied by the action extension to the value of the `error` property.

Developers should be aware of how web actions might be used and generate error responses accordingly. A web action that is used with the `.http` extension should return an HTTP response, for example: `{error: { statusCode: 400 }`. Failing to specify the correct response will in a mismatch between the implied content-type from the extension and the action content-type in the error response. Special consideration must be given to web actions that are sequences, so that components that make up a sequence can generate adequate errors when necessary.

## Vanity URL

**[[This section to be rewritten by Josh or Rodric.]]**
