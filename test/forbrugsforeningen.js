import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import fb from '../types/forbrugsforeningen.js'

test('Forbrugsforeningen', () => {
  assert.ok(fb.test('6007220000000004'), 'normal')
  eagerType(fb, '600')
})
