'use strict'

const test = require('tape')
const eagerType = require('./eager-type')
const meeza = require('../types/meeza')

test('Meeza', function (t) {
  t.ok(meeza.test('5078036246600381'), 'normal')
  eagerType(t, meeza, [
    '507803'
  ])
  t.end()
})
