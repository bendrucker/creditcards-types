'use strict'

const test = require('tape')
const eagerType = require('./eager-type')
const mada = require('../types/mada')

test('Mada', function (t) {
  t.ok(mada.test('5297412542005689'), 'normal')
  eagerType(t, mada, [
    '508160'
  ])
  t.end()
})
