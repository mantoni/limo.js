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

test('config', {

  after: function () {
    licy.removeAllListeners();
  },


  'should install fixtures as plugins': sinon.test(function () {
    this.stub(licy, 'plugin');

    limo({
      'fixture.a' : 'test/fixture/a',
      'fixture.b' : 'test/fixture/b'
    });

    sinon.assert.calledTwice(licy.plugin);
    sinon.assert.calledWith(licy.plugin, 'fixture.a', a);
    sinon.assert.calledWith(licy.plugin, 'fixture.b', b);
  }),


  'should register multiple plugins under same name': sinon.test(function () {
    this.stub(licy, 'plugin');

    limo({
      'fixtures' : ['test/fixture/a', 'test/fixture/b']
    });

    sinon.assert.calledTwice(licy.plugin);
    sinon.assert.calledWith(licy.plugin, 'fixtures', a);
    sinon.assert.calledWith(licy.plugin, 'fixtures', b);
  }),


  'should throw if module cannot be loaded': function () {
    try {
      limo({
        'unknown' : 'test/fixture/unknown'
      });
      assert.fail('Exception expected');
    } catch (e) {
      assert.equal(e.name, 'Error');
      assert(/^Cannot find module '/.test(e.message));
      assert(/\/test\/fixture\/unknown'$/.test(e.message));
    }
  },


  'should return licy': function () {
    var result = limo({ a : 'test/fixture/a' });

    assert.strictEqual(result, licy);
  }

});
