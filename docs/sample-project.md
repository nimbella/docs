---
id: sample-project-walkthrough
title: Sample Project Walkthrough
sidebar_label: Sample Project Walkthrough
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="js"
  values={[
    {label: 'Javascript', value: 'js'},
    {label: 'Python', value: 'py'},
    {label: 'Go', value: 'go'},
  ]}
  >
  <TabItem value="js">

```
function Logout(props) {

    const setLoginInfo = props.setLoginInfo;

    useEffect(() => {
        GoogleApi.delete('login')
        .then((response) => {
            setLoginInfo(null);
            window.location.replace('https://google.com/logout')
        });
    }, [setLoginInfo])

    return null;
}
```

  </TabItem>
  <TabItem value="py">

```
NEED TO CONVERT THIS FUNCTION IN PYTHON

function Logout(props) {

    const setLoginInfo = props.setLoginInfo;

    useEffect(() => {
        GoogleApi.delete('login')
        .then((response) => {
            setLoginInfo(null);
            window.location.replace('https://google.com/logout')
        });
    }, [setLoginInfo])

    return null;
}
```

  </TabItem>
  <TabItem value="go">

```
NEED TO CONVERT THIS FUNCTION IN GO

function Logout(props) {

    const setLoginInfo = props.setLoginInfo;

    useEffect(() => {
        GoogleApi.delete('login')
        .then((response) => {
            setLoginInfo(null);
            window.location.replace('https://google.com/logout')
        });
    }, [setLoginInfo])

    return null;
}
```

  </TabItem>
</Tabs>


## Taking an example project, we go through
## Creating packages
## Creating Actions
## Package.json and where to place them
## .env
## Sharing code between actions
## Adding packages to your actions
## Example on using redis/buckets
## How to debug your functions
## How to deploy your functions while developing
## Watching your project
## Fetching logs and activations
## Multiple stages of development/testing
## Testing your functions locally with express and jest
## Writing tests
## Taking your project to production
## Setting up CI/CD using github
