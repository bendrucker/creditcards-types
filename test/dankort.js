'use strict'

const test = require('tape')
const eagerType = require('./eager-type')
const d = require('../types/dankort')

test('Dankort', function (t) {
  t.ok(d.test('5019717010103742'), 'normal')
  eagerType(t, d, '5019')
  t.end()
})
