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


module.exports = function (config, dir) {
  var cwd         = dir || process.cwd();
  var configType  = typeOf(config);
  var file;
  if (configType === 'string') {
    file        = config;
    cwd         = path.resolve(cwd, config, '..');
    config      = JSON.parse(fs.readFileSync(file));
    configType  = typeOf(config);
  }
  if (configType !== 'object') {
    if (file) {
      throw new TypeError('Config \'' + file + '\' is ' + configType +
        '. Must be object.');
    }
    throw new TypeError('Config is ' + configType +
      '. Must be string or object.');
  }
  Object.keys(config).forEach(function (name) {
    var module      = config[name];
    var moduleType  = typeOf(module);
    var dependencies;

    if (moduleType === 'object') {
      dependencies  = module.dependencies;
      module        = module.module;
      moduleType    = typeOf(module);
    }
    if (moduleType !== 'string') {
      throw new TypeError('Module reference for \'' + name + '\' is ' +
        moduleType + '. Must be string or array.');
    }
    var file    = path.resolve(cwd, module);
    var plugin  = require(file);
    if (dependencies) {
      licy.plugin(name, dependencies, plugin);
    } else {
      licy.plugin(name, plugin);
    }
  });
  return licy;
};
