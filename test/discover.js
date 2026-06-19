import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import discover from '../types/discover.js'

test('Discover', () => {
  assert.ok(discover.test('6011039964691945'), 'normal')
  assert.ok(discover.test('6441111111111117'), '64')
  assert.ok(discover.test('6501111111111117'), '65')
  eagerType(discover, [
    '60112',
    '644',
    '65'
  ])
})
