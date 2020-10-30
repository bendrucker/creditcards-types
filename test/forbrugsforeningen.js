'use strict'

const test = require('tape')
const fb = require('../types/forbrugsforeningen')
const eagerType = require('./eager-type')

test('Forbrugsforeningen', function (t) {
  t.ok(fb.test('6007220000000004'), 'normal')
  eagerType(t, fb, '600')
  t.end()
})
