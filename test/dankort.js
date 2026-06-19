import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import d from '../types/dankort.js'

test('Dankort', () => {
  assert.ok(d.test('5019717010103742'), 'normal')
  eagerType(d, '5019')
})
