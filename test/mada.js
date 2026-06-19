import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import mada from '../types/mada.js'

test('Mada', () => {
  assert.ok(mada.test('5297412542005689'), 'normal')
  eagerType(mada, [
    '508160'
  ])
})
