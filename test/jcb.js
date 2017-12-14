'use strict'

var test = require('tape')
var eagerType = require('./eager-type')
var jcb = require('../types/jcb')

test('JCB', function (t) {
  t.ok(jcb.test('3530111333300000'), 'normal')
  eagerType(t, jcb, '35')
  t.end()
})
