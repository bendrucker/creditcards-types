'use strict'

var test = require('tape')
// var eagerType = require('./eager-type')
var mada = require('../types/mada')

test('Mada', function (t) {
  t.ok(mada.test('5297412542005689'), 'normal')
  // eagerType(t, mada, '6361')
  t.end()
})
