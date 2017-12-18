'use strict'

var test = require('tape')
var eagerType = require('./eager-type')
var mir = require('../types/mir')

test('Mir', function (t) {
  t.ok(mir.test('2202200128683966'), 'normal')
  eagerType(t, mir, [
    '2204',
    '2200'
  ])
  t.end()
})
