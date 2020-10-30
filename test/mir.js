'use strict'

const test = require('tape')
const eagerType = require('./eager-type')
const mir = require('../types/mir')

test('Mir', function (t) {
  t.ok(mir.test('2202200128683966'), 'normal')
  eagerType(t, mir, [
    '2204',
    '2200'
  ])
  t.end()
})
