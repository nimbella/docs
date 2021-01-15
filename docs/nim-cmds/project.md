`nim project`
=============

manage and deploy Nimbella projects

* [`nim project create [PROJECT]`](#nim-project-create-project)
* [`nim project deploy [PROJECTS]`](#nim-project-deploy-projects)
* [`nim project watch [PROJECTS]`](#nim-project-watch-projects)

## `nim project create [PROJECT]`

Create a Nimbella Project

```
Create a Nimbella Project

USAGE
  $ nim project create [PROJECT]

ARGUMENTS
  PROJECT  project path in the file system

OPTIONS
  -l, --language=go|golang|js|javascript|ts|typescript|py|python|java|swift|php  [default: js] Language for the project (creates sample project unless source is specified)
  -o, --overwrite                                                                Overwrites the existing file(s)
  -t, --type=postman|openapi|sample                                              API specs source
  -v, --verbose                                                                  Greater detail in error messages
  --config                                                                       Generate template config file
  --help                                                                         Show help
```

_See code: [src/commands/project/create.ts](https://github.com/nimbella/nimbella-cli/blob/v1.10.2/src/commands/project/create.ts)_

## `nim project deploy [PROJECTS]`

Deploy Nimbella projects

```
Deploy Nimbella projects

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
  --remote-build         Run builds remotely
  --target=target        The target namespace
  --verbose-build        Display build details
  --verbose-zip          Display start/end of zipping phase for each action
  --web-local=web-local  A local directory to receive web deploy, instead of uploading
  --yarn                 Use yarn instead of npm for node builds
```

_See code: [src/commands/project/deploy.ts](https://github.com/nimbella/nimbella-cli/blob/v1.10.2/src/commands/project/deploy.ts)_

## `nim project watch [PROJECTS]`

Watch Nimbella projects, deploying incrementally on change

```
Watch Nimbella projects, deploying incrementally on change

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
  --remote-build         Run builds remotely
  --target=target        The target namespace
  --verbose-build        Display build details
  --verbose-zip          Display start/end of zipping phase for each action
  --web-local=web-local  A local directory to receive web deploy, instead of uploading
  --yarn                 Use yarn instead of npm for node builds
```

_See code: [src/commands/project/watch.ts](https://github.com/nimbella/nimbella-cli/blob/v1.10.2/src/commands/project/watch.ts)_
