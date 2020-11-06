## The Nimbella workbench

Many (though not all) `nim` commands will also run in your web browser, which wraps some graphical assistance around `nim` and provides some additional commands.  This separate but closely related tool is called the Nimbella Workbench.

If you've never used the workbench (and assuming you are logged into a Nimbella account) you should enable the same Nimbella account on the workbench by opening it from the command line, as follows.

```
nim workbench login
```

This will open the workbench in your default browser and log you in there with the same Nimbella namespace credentials you are using locally (see [Nimbella Namespaces](namespaces.md)).  Those credentials will be remembered for that browser on the current machine.  You can bookmark the workbench, or you can run it again with a particular command, as in the two following examples.

```
nim workbench run
nim workbench run action list
```

Once you are in the workbench, all `nim` subcommands are available except for these few.

```
action create
action update
object create
object get
project create
project watch
web create
web get
workbench login
workbench run
```

Those few commands are either inappropriate for the workbench or require filesystem access, which is unavailable in a browser.

When running in the workbench, the `project deploy` command can only deploy from GitHub, not from the local file system.  If the project requires building as part of deployment, that build will be run remotely if possible (see [Remote Builds](building.md#remote-builds)).  If the project configuration requires a _local_ build, then the project cannot be deployed from the workbench.

The prefix `nim` is optional in front of workbench commands.

To transfer your credentials to the workbench running in a browser that is not the default browser, just visit the workbench there and type `auth login`.  You will need to provide some of the information you provided when you opened your Nimbella account but a duplicate account will not be created.  You will be connected to your existing account.
