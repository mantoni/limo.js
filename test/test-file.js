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
var sinon   = require('sinon');

var licy    = require('licy');
var limo    = require('../lib/limo');

var a       = require('./fixture/a');
var b       = require('./fixture/b');
var c       = require('./fixture/c');


test('file', {

  after: function () {
    licy.removeAllListeners();
  },


  'should install fixtures as plugins': sinon.test(function () {
    this.stub(licy, 'plugin');

    limo('test/fixture/index.json');

    sinon.assert.calledThrice(licy.plugin);
    sinon.assert.calledWith(licy.plugin, 'fixture.a', a);
    sinon.assert.calledWith(licy.plugin, 'fixture.b', b);
    sinon.assert.calledWith(licy.plugin, 'fixture.c',
      ['fixture.a', 'fixture.b'], c);
  }),


  'should throw if path cannot be found': function () {
    try {
      limo('test/fixture/unknown');
      assert.fail('Exception expected');
    } catch (e) {
      assert.equal(e.name, 'Error');
      assert.equal(e.message,
        'ENOENT, no such file or directory \'test/fixture/unknown\'');
    }
  },


  'should return licy': function () {
    var result = limo('test/fixture/index.json');

    assert.strictEqual(result, licy);
  }

});
