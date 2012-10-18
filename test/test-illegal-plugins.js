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
      limo({
        test : arg
      });
      assert.fail('Exception expected');
    } catch (e) {
      assert.equal(e.name, 'TypeError');
      assert.equal(e.message, message);
    }
  };
}


test('illegal plugins', {

  'should throw for undefined': testThrows(undefined,
    'Plugin reference for \'test\' is undefined. Must be string or array.'),

  'should throw for null': testThrows(null,
    'Plugin reference for \'test\' is null. Must be string or array.'),

  'should throw for number': testThrows(0,
    'Plugin reference for \'test\' is number. Must be string or array.'),

  'should throw for object': testThrows({},
    'Plugin reference for \'test\' is object. Must be string or array.')

});
