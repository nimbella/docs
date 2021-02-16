# Using and creating `nim` packages

You can use packages to bundle together a set of related actions and share them with others.

A package can include *actions* and *feeds*.

An _action_ is a piece of functional code that runs in the Nimbella cloud. Actions can be written in various source languages: JavaScript, Python, PHP, and so on. For details about actions, see the document on [actions](actions.md#about-actions) and the [Nimbella Command Line Tool Guide](https://nimbella.io/downloads/nim/nim.html#project-directory-structure).

A _feed_ is used to configure an external event source to fire trigger events.

Every `nim` entity, including packages, belongs in a *namespace*, and the fully qualified name of an entity is `/my-namespace[/packageName]/entityName`, where `my-namespace` is the name of your Nimbella namespace. We follow the [OpenWhisk naming guidelines](./reference.md#openwhisk-entities).

Tip: You can find the name of your namespace with the command `nim auth list`. If you have only one namespace, you can omit it from the package name for convenience.

The following sections describe how to browse packages and use the triggers and feeds in them.

## Browsing packages

You can get a list of packages in a namespace, list the entities in a package, and get a description of the individual entities in a package.

Get a list of packages in the Nimbella `my-namespace` namespace:

```bash
$ nim package list my-namespace

Datetime        Access   Kind     Version  Packages
05/10 11:50:58  private  package  0.0.1    /my-namespace/demo
05/07 10:41:53  private  package  0.0.1    /my-namespace/utils
05/07 10:41:53  private  package  0.0.1    /my-namespace/ocr
```

Get a list of entities in the `demo` package, which has a single action called `hello`.

```bash
$ nim package get /my-namespace/demo

{
  "actions": [
    {
      "annotations": [
        {
          "key": "web-export",
          "value": true
        },
        {
          "key": "provide-api-key",
          "value": false
        },
        {
          "key": "exec",
          "value": "nodejs:10"
        }
      ],
      "name": "hello",
      "version": "0.0.4"
    }
  ],
  "annotations": [],
  "binding": {},
  "feeds": [],
  "name": "demo",
  "namespace": "my-namespace",
  "parameters": [],
  "publish": false,
  "updated": 1589136658325,
  "version": "0.0.1",
  "date": "2020-05-10 11:50:58"
}
```
**Notes**:
* Parameters listed under the package on the `"parameters"` line with a prefix `*` are predefined, bound parameters. Parameters without a `*` are listed under the [annotations](./annotations.md) for each entity.
* Any parameters with the prefix `**` are finalized bound parameters. This means that they are immutable and cannot be changed by the user.
* Any entity listed under a package inherits specific bound parameters from the package. To view the list of known parameters of an entity belonging to a package, a `get` of the individual entity. In this example, the command would be `nim action get demo/hello`.

Get a description of the `/my-namespace/demo/hello` action.

```
  $ nim action get /my-namespace/demo/hello
  {
    "annotations": [
      {
        "key": "web-export",
        "value": true
      },
      {
        "key": "provide-api-key",
        "value": false
      },
      {
        "key": "exec",
        "value": "nodejs:10"
      }
    ],
    "exec": {
      "kind": "nodejs:10",
      "binary": false
    },
    "limits": {
      "concurrency": 1,
      "logs": 16,
      "memory": 256,
      "timeout": 3000
    },
    "name": "hello",
    "namespace": "my-namespace/demo",
    "parameters": [],
    "publish": false,
    "updated": 1589145786003,
    "version": "0.0.4",
    "date": "2020-05-10 14:23:06"
  }
```

**Note:** If the deployed project is under git control, the `annotations` section has details for the key `deployer`. For example, here's the output for the `acceptImage` action in the [Nimbella OCR demo project](https://github.com/nimbella/demo-projects/tree/master/ocr) running in `my-namespace`:

```bash
nim action get ocr/acceptImage

{
  "annotations": [
    {
      "key": "web-export",
      "value": true
    },
    {
      "key": "deployer",
      "value": {
        "commit": "04904569",
        "digest": "9784aa8a",
        "projectPath": "ocr",
        "repository": "https://github.com/nimbella/demo-projects.git",
        "user": "ghusername@example.com",
        "zipped": false
      }
    },
    {
      "key": "raw-http",
      "value": false
    },
    {
      "key": "final",
      "value": true
    },
    {
      "key": "provide-api-key",
      "value": false
    },
    {
      "key": "exec",
      "value": "nodejs:10"
    }
  ],
  "exec": {
    "kind": "nodejs:10",
    "binary": false
  },
  "limits": {
    "concurrency": 1,
    "logs": 10,
    "memory": 256,
    "timeout": 60000
  },
  "name": "acceptImage",
  "namespace": "my-namespace/ocr",
  "parameters": [],
  "publish": false,
  "updated": 1588873314451,
  "version": "0.0.1",
  "date": "2020-05-07 10:41:54"
}
```

## Invoking actions in a package

You can invoke actions in a package, just as with other actions. Here are a few simple examples using the `greeting` action in the [Actions article](actions.md). First let's get the source code for the `/my-namespace/demo/greeting` action. For these examples, we won't use the fully qualified action name but instead omit the namespace and use just the `package/action` format.

```bash
nim action get demo/greeting --code
/**
 * @params is a JSON object with optional fields "name" and "place".
 * @return a JSON object containing the message in a field called "msg".
 */
function main(params) {
  // log the parameters to stdout
  console.log('params:', params);

  // if a value for name is provided, use it else use a default
  var name = params.name || 'stranger';

  // if a value for place is provided, use it else use a default
  var place = params.place || 'somewhere';

  // construct the message using the values for name and place
  return {msg:  'Hello, ' + name + ' from ' + place + '!'};
}
```

You can see there are two parameters, `name` and `place`.

Now invoke the action.

```bash
nim action invoke demo/greeting

{
  "msg": "Hello, stranger from somewhere!"
}
```

Now invoke the action by passing different parameter values for `name` and `place` from the command line.

```bash
nim action invoke demo/greeting --param name Mark --param place Ork

{
  "msg": "Hello, Mark from Ork!"
}
```

## Creating and using package bindings

Instead of passing the same parameters to the action every time, you can bind to a package and specify default parameters. These parameters are inherited by the actions in the package.

For example, in the `demo/greeting` package, you can set default `name` and `place` values in a package binding and these values are automatically passed to any actions in the package.

The following example sets a default `place` parameter value to the `demo` package. The `nim package bind` syntax requires the name of the package and a bound package name. In this case we'll call the bound package name `demoPlace`.

```bash
nim package bind demo demoPlace --param place Mumbai
```

Now get a description of the package binding. In the following example, the `package get` command shows the annotations for the `demo` package and all its actions (in this case there's only one, the `greeting` action). It also shows the binding on the package with the key-value pair for the `place` parameter.

```bash
nim package get demoPlace

{
  "actions": [
    {
      "annotations": [
        {
          "key": "provide-api-key",
          "value": false
        },
        {
          "key": "exec",
          "value": "nodejs:10"
        }
      ],
      "name": "greeting",
      "version": "0.0.1"
    },
  ],
  "annotations": [
    {
      "key": "binding",
      "value": {
        "name": "demo",
        "namespace": "my-namespace"
      }
    }
  ],
  "binding": {
    "name": "demo",
    "namespace": "my-namespace"
  },
  "feeds": [],
  "name": "demoPlace",
  "namespace": "my-namespace",
  "parameters": [
    {
      "key": "place",
      "value": "Mumbai"
    }
  ],
  "publish": false,
  "updated": 1590443251826,
  "version": "0.0.1",
  "date": "2020-05-25 14:47:31"
}
```

Now you can invoke an action using the bound package name:

```bash
nim action invoke demoPlace/greeting

{
  "msg": "Hello, stranger from Mumbai!"
}
```

You can define the name parameter at the command line:

```bash
nim action invoke demoPlace/greeting --param name Sanjay

{
  "msg": "Hello, Sanjay from Mumbai!"
}
```

You can see that the action inherits the `place` parameter you set when you created the `demoPlace` package binding. The following command temporarily overrides the default parameter value.

```bash
nim action invoke demoPlace/greeting --param name Natasha --param place Russia

{
  "msg": "Hello, Natasha from Russia!"
}
```

Now if you invoke the `demoPlace/greeting` action, you'll see the place parameter has returned to its bound value:

```bash
nim action invoke demoPlace/greeting

{
  "msg": "Hello, stranger from Mumbai!"
}
```

## Creating a package

A package is used to organize a set of related actions and feeds.
It also allows for parameters to be shared across all entities in the package.

To create a custom package that contains a simple action, try the following example:

1. Create a package called "custom".
  ```bash
  $ nim package create custom
  ```
2. Get a summary of the package.
  ```bash
  nim package get custom

  {
    "actions": [],
    "annotations": [],
    "binding": {},
    "feeds": [],
    "name": "custom",
    "namespace": "my-namespace",
    "parameters": [],
    "publish": false,
    "updated": 1590447387087,
    "version": "0.0.1",
    "date": "2020-05-25 15:56:27"
  }
  ```

  Notice that the package is empty.

3. Create a file called _identity.js_ that contains the following action code. This action returns all input parameters.

  ```js
  function main(args) { return args; }
  ```
4. Create an `identity` action in the `custom` package.
  ```bash
  $ nim action create custom/identity identity.js
  ```
  Creating an action in a package requires that you prefix the action name with a package name. Package nesting is not allowed. A package can contain only actions and can't contain another package.

5. Get a summary of the package again. Now you can see the `identity` action listed.
  ```bash
  nim package get custom

  {
    "actions": [
      {
        "annotations": [
          {
            "key": "provide-api-key",
            "value": false
          },
          {
            "key": "exec",
            "value": "nodejs:10"
          }
        ],
        "name": "identity",
        "version": "0.0.1"
      }
    ],
    "annotations": [],
    "binding": {},
    "feeds": [],
    "name": "custom",
    "namespace": "my-namespace",
    "parameters": [],
    "publish": false,
    "updated": 1590447387087,
    "version": "0.0.1",
    "date": "2020-05-25 15:56:27"
  }
  ```

6. Invoke the action in the package.
  ```bash
  nim action invoke custom/identity

    {}
  ```

### Set default parameters
You can set default parameters for all the entities in a package by setting package-level parameters that are inherited by all actions in the package. To see how this works, try the following example:

1. Update the `custom` package with two parameters: `city` and `country`.
  ```bash
  nim package update custom --param city Austin --param country USA
  ```
2. Display the parameters in the package, and see how the `identity` action in the package inherits parameters from the package.

  ```bash
  $ nim package get custom

  {
    "actions": [
      {
        "annotations": [
          {
            "key": "provide-api-key",
            "value": false
          },
          {
            "key": "exec",
            "value": "nodejs:10"
          }
        ],
        "name": "identity",
        "version": "0.0.1"
      }
    ],
    "annotations": [],
    "binding": {},
    "feeds": [],
    "name": "custom",
    "namespace": "my-namespace",
    "parameters": [
      {
        "key": "city",
        "value": "Austin"
      },
      {
        "key": "country",
        "value": "USA"
      }
    ],
    "publish": false,
    "updated": 1590448367857,
    "version": "0.0.2",
    "date": "2020-05-25 16:12:47"
  }
    ```
3. Display the action and see the `city` and `country` parameters in the command output.
  ```bash
  nim action get custom/identity

  nim action get custom/identity
{
  "annotations": [
    {
      "key": "provide-api-key",
      "value": false
    },
    {
      "key": "exec",
      "value": "nodejs:10"
    }
  ],
  "exec": {
    "kind": "nodejs:10",
    "binary": false
  },
  "limits": {
    "concurrency": 1,
    "logs": 16,
    "memory": 256,
    "timeout": 3000
  },
  "name": "identity",
  "namespace": "my-namespace",
  "parameters": [
    {
      "key": "city",
      "value": "Austin"
    },
    {
      "key": "country",
      "value": "USA"
    }
  ],
  "publish": false,
  "updated": 1590447831131,
  "version": "0.0.1",
  "date": "2020-05-25 16:03:51"
}
  ```
4. Invoke the identity action without any parameters to verify that the action indeed inherits the parameters.
  ```bash
  $ nim action invoke custom/identity

  {
    "city": "Austin",
    "country": "USA"
  }
    ```
5. Invoke the `identity` action with some parameters. Invocation parameters are merged with the package parameters and the invocation parameters override the package parameters.
  ```bash
  nim action invoke --result custom/identity --param city Dallas --param state Texas

  {
      "city": "Dallas",
      "country": "USA",
      "state": "Texas"
  }
  ```

## Sharing a package

After the actions and feeds that comprise a package are debugged and tested, the package can be shared with all Nimbella users. Sharing the package makes it possible for the users to bind the package, invoke actions in the package, and author rules and sequence actions.

1. Share the package with all users:
  ```bash
  $ nim package update custom --shared yes
  ```
2. Verify that the `publish` property of the package is now true.
  ```bash
  $ nim package get custom

  {
    "actions": [
      {
        "annotations": [
          {
            "key": "provide-api-key",
            "value": false
          },
          {
            "key": "exec",
            "value": "nodejs:10"
          }
        ],
        "name": "identity",
        "version": "0.0.1"
      }
    ],
    "annotations": [],
    "binding": {},
    "feeds": [],
    "name": "custom",
    "namespace": "my-namespace",
    "parameters": [
      {
        "key": "city",
        "value": "Austin"
      },
      {
        "key": "country",
        "value": "USA"
      }
    ],
    "publish": true,
    "updated": 1590449866968,
    "version": "0.0.5",
    "date": "2020-05-25 16:37:46"
  }
  ```

Others can now use your `custom` package, including binding to the package or directly invoking an action in it but they must use the fully qualified name of the package to bind it or invoke actions in it.

**Note:** Actions and feeds within a shared package are _public_. If the package is private, then all of its contents are also private.

## Creating and using trigger feeds

**[[NH: I don't know what to do with this section. I see that `nim` has `trigger` and `rule` commands to manage entities, but I also see this statement in the CLI guide: "OpenWhisk has additional entities called rules, triggers, routes (aka “API gateway”), and activations; the nim command supports these individually but not as part of a project." I can't find any nim-specific documentation on triggers. I can't find anything in the Nimbella repos on GitHub that matches `/whisk.system/alarms`, so I don't know if you can import the OW package.]]**

Feeds offer a convenient way to configure an external event source to fire these events to a trigger. This example shows how to use a feed in the Alarms package to fire a trigger every second, and how to use a rule to invoke an action every second.

1. Get a description of the feed in the `/whisk.system/alarms` package.

  ```
  $ wsk package get --summary /whisk.system/alarms
  ```
  ```
  package /whisk.system/alarms: Alarms and periodic utility
     (parameters: *apihost, *cron, *trigger_payload)
   feed   /whisk.system/alarms/alarm: Fire trigger when alarm occurs
      (parameters: none defined)
  ```

  ```
  $ wsk action get --summary /whisk.system/alarms/alarm
  ```
  ```
  action /whisk.system/alarms/alarm: Fire trigger when alarm occurs
     (parameters: *apihost, *cron, *trigger_payload)
  ```

  The `/whisk.system/alarms/alarm` feed takes two parameters:
  - `cron`: A crontab specification of when to fire the trigger.
  - `trigger_payload`: The payload parameter value to set in each trigger event.
  - `apihost`: The API host endpoint that will be receiving the feed.

2. Create a trigger that fires every eight seconds.

  ```
  $ wsk trigger create everyEightSeconds --feed /whisk.system/alarms/alarm -p cron "*/8 * * * * *" -p trigger_payload "{\"name\":\"Mork\", \"place\":\"Ork\"}"
  ```
  ```
  ok: created trigger feed everyEightSeconds
  ```

3. Create a 'hello.js' file with the following action code.

  ```
  function main(params) {
      return {payload:  'Hello, ' + params.name + ' from ' + params.place};
  }
  ```

4. Make sure that the action exists.

  ```
  $ wsk action update hello hello.js
  ```

5. Create a rule that invokes the `hello` action every time the `everyEightSeconds` trigger fires.

  ```
  $ wsk rule create myRule everyEightSeconds hello
  ```
  ```
  ok: created rule myRule
  ```

6. Check that the action is being invoked by polling for activation logs.

  ```
  $ wsk activation poll
  ```

  You should see activations every eight seconds for the trigger, the rule, and the action. The action receives the parameters `{"name":"Mork", "place":"Ork"}` on every invocation.


