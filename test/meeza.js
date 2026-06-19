import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import meeza from '../types/meeza.js'

test('Meeza', () => {
  assert.ok(meeza.test('5078036246600381'), 'normal')
  eagerType(meeza, [
    '507803'
  ])
})
