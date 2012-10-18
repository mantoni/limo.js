/**
 * licy.js
 *
 * Copyright (c) 2012 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var licy  = require('licy');
var fs    = require('fs');
var path  = require('path');


function typeOf(value) {
  if (value === null) {
    return 'null';
  }
  var type = Object.prototype.toString.call(value);
  return type.substring(8, type.length - 1).toLowerCase();
}


function register(cwd, name, plugin) {
  var file = path.resolve(cwd, plugin);
  licy.plugin(name, require(file));
}


module.exports = function (config) {
  var cwd         = process.cwd();
  var configType  = typeOf(config);
  if (configType === 'string') {
    cwd     = path.resolve(cwd, config, '..');
    config  = JSON.parse(fs.readFileSync(config));
  } else if (configType !== 'object') {
    throw new TypeError('Config is ' + configType +
      '. Must be string or object.');
  }
  Object.keys(config).forEach(function (name) {
    var plugin      = config[name];
    var pluginType  = typeOf(plugin);
    if (pluginType === 'array') {
      plugin.forEach(function (plugin) {
        register(cwd, name, plugin);
      });
    } else if (pluginType !== 'string') {
      throw new TypeError('Plugin reference for \'test\' is ' +
        pluginType + '. Must be string or array.');
    } else {
      register(cwd, name, plugin);
    }
  });
  return licy;
};
