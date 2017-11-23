# express-curl

Simple but effective, this `ExpressJS` middleware prints out the equivalent curl command. Typically this would be used as a utility for backend developers for replicating requests that may be causing problems.


### Installation
Install the package by running the command below, from the root of your NodeJS project.

```npm install --save express-curl```


### Usage
1. Include the package in your ExpressJS app along with other dependencies.

```
const fs = require('fs');
const express = require('express');

// Include express-curl as a dependency
const expressCurl = require('express-curl);

let app = express();
...
```

2. Declare this as a middleware just above the route definitions

```
app.use(bodyParser.json());
app.use(multiplart());
...

// Include the express curl middleware
app.use(expressCurl);

...
app.use('/auth', authRouter);
app.use('/users', usersRouter);
```

Now the `stdout` will print the curl.

![Alt text](https://i.imgur.com/DHTTrj9.png "curl")
