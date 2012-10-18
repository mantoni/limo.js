/**
 * limo.js
 *
 * Copyright (c) 2012 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var test    = require('utest');
var assert  = require('assert');

var limo    = require('../lib/limo');


function testThrows(arg, message) {
  return function () {
    try {
      limo(arg);
      assert.fail('Exception expected');
    } catch (e) {
      assert.equal(e.name, 'TypeError');
      assert.equal(e.message, message);
    }
  };
}


test('illegal arguments', {

  'should throw for undefined': testThrows(undefined,
    'Config is undefined. Must be string or object.'),

  'should throw for null': testThrows(null,
    'Config is null. Must be string or object.'),

  'should throw for number': testThrows(0,
    'Config is number. Must be string or object.'),

  'should throw for array': testThrows([],
    'Config is array. Must be string or object.')

});
