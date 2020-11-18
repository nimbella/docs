`nim project`
=============

manage and deploy Nimbella projects

* [`nim project create [NAME]`](#nim-project-create-name)
* [`nim project deploy [PROJECTS]`](#nim-project-deploy-projects)
* [`nim project watch [PROJECTS]`](#nim-project-watch-projects)

## `nim project create [NAME]`

Create a Nimbella Project

```
USAGE
  $ nim project create [NAME]

ARGUMENTS
  NAME  Project name

OPTIONS
  -c, --clientCode                           Generates client code
  -i, --id=id                                API specs id/name/path
  -k, --key=key                              Key to access the source API
  -l, --language=go|js|ts|py|java|swift|php  [default: js] Language for the project (creates sample project unless source is specified)
  -o, --overwrite                            Overwrites the existing file(s)
  -s, --source=postman|openapi               API specs source
  -u, --updateSource                         Sync updated API specs back to source
  -v, --verbose                              Greater detail in error messages
  --config                                   Generate template config file
  --help                                     Show help
```

_See code: [src/commands/project/create.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/project/create.ts)_

## `nim project deploy [PROJECTS]`

Deploy Nimbella projects

```
USAGE
  $ nim project deploy [PROJECTS]

ARGUMENTS
  PROJECTS  One or more paths to projects

OPTIONS
  -v, --verbose          Greater detail in error messages
  --anon-github          Attempt GitHub deploys anonymously
  --apihost=apihost      API host to use
  --auth=auth            OpenWhisk auth token to use
  --env=env              Path to environment file
  --exclude=exclude      Project portions to exclude
  --help                 Show help
  --include=include      Project portions to include
  --incremental          Deploy only changes since last deploy
  --insecure             Ignore SSL Certificates
  --production           Deploy to the production namespace instead of the test one
  --target=target        The target namespace
  --verbose-build        Display build details
  --verbose-zip          Display start/end of zipping phase for each action
  --web-local=web-local  A local directory to receive web deploy, instead of uploading
  --yarn                 Use yarn instead of npm for node builds
```

_See code: [src/commands/project/deploy.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/project/deploy.ts)_

## `nim project watch [PROJECTS]`

Watch Nimbella projects, deploying incrementally on change

```
USAGE
  $ nim project watch [PROJECTS]

ARGUMENTS
  PROJECTS  One or more paths to projects

OPTIONS
  -v, --verbose          Greater detail in error messages
  --apihost=apihost      API host to use
  --auth=auth            OpenWhisk auth token to use
  --env=env              Path to environment file
  --exclude=exclude      Project portions to exclude
  --help                 Show help
  --include=include      Project portions to include
  --insecure             Ignore SSL Certificates
  --target=target        The target namespace
  --verbose-build        Display build details
  --verbose-zip          Display start/end of zipping phase for each action
  --web-local=web-local  A local directory to receive web deploy, instead of uploading
  --yarn                 Use yarn instead of npm for node builds
```

_See code: [src/commands/project/watch.ts](https://github.com/nimbella/nimbella-cli/blob/v1.9.3/src/commands/project/watch.ts)_
