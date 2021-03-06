'use strict'

const test = require('tape')
const eagerType = require('./eager-type')
const discover = require('../types/discover')

test('Discover', function (t) {
  t.ok(discover.test('6011039964691945'), 'normal')
  t.ok(discover.test('6441111111111117'), '64')
  t.ok(discover.test('6501111111111117'), '65')
  eagerType(t, discover, [
    '60112',
    '644',
    '65'
  ])
  t.end()
})
