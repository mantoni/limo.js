# limo.js

Dependency injection with [https://github.com/mantoni/licy.js](licy.js) modules.

[![Build Status](https://secure.travis-ci.org/mantoni/limo.js.png?branch=master)](http://travis-ci.org/mantoni/limo.js)

## Install on Node

```
npm install limo
```

## Usage

The `limo` module exposes a single function. Pass either a config:

```js
var limo = require('limo');

limo```

or a path to a json file with the config:

```js
var limo = require('limo');

limo('index.json');
```

The path must be relative to the cwd.

A config contains key value pairs where the key is going to be used as the licy.js plugin name and the value is `require`d and used as the plugin.

```js
{
  "router.static"   : "./lib/router/static",
  "router.template" : "./lib/router/template",
  "server"          : "./lib/server"
}
```

It's also valid to specify an array of plugins for a single name:

```js
{
  "routers" : ["./lib/router/static", "router.template" : "./lib/router/template"],
  "server"  : "./lib/server"
}
```

The `limo` function returns the `licy` module for convenience:

```js
limo('index.json').start('**');
```
