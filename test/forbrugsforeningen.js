'use strict'

var test = require('tape')
var fb = require('../types/forbrugsforeningen')
var eagerType = require('./eager-type')

test('Forbrugsforeningen', function (t) {
  t.ok(fb.test('6007220000000004'), 'normal')
  eagerType(t, fb, '600')
  t.end()
})
