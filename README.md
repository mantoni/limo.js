# limo.js

Dependency injection with licy.js modules.

[![Build Status](https://secure.travis-ci.org/mantoni/limo.js.png?branch=master)](http://travis-ci.org/mantoni/limo.js)

## Install on Node

```
npm install limo
```

## What's it doing?

Limo `require`s plugins and registers them on [licy.js](https://github.com/mantoni/licy.js), a dependency and lifecycle management tool. You can then use `licy` to start, stop and destroy the plugins.

## Usage

The `limo` module exposes a single function. Pass either a config:

```js
var limo = require('limo');

limo({
  // plugins go here (see below)
})
```

or a path to a JSON file with the config:

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
  "server"          : {
    "module"        : "./lib/server",
    "dependencies"  : ["router.*"]
  }
}
```

The `limo` function returns the [licy.js](https://github.com/mantoni/licy.js) module for convenience:

```js
limo('index.json').start('**');
```
