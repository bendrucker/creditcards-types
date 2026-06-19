import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import jcb from '../types/jcb.js'

test('JCB', () => {
  assert.ok(jcb.test('3530111333300000'), 'normal')
  eagerType(jcb, '35')
})
