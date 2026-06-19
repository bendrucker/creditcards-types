import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import mir from '../types/mir.js'

test('Mir', () => {
  assert.ok(mir.test('2202200128683966'), 'normal')
  eagerType(mir, [
    '2204',
    '2200'
  ])
})
