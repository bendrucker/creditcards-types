'use strict'

var test = require('tape')
var eagerType = require('./eager-type')
var d = require('../types/dankort')

test('Dankort', function (t) {
  t.ok(d.test('5019717010103742'), 'normal')
  eagerType(t, d, '5019')
  t.end()
})
