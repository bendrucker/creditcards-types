import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import amex from '../types/american-express.js'

test('American Express', async (t) => {
  assert.ok(amex.test('378282246310005'), 'strict 37')
  assert.ok(amex.test('378282246310005'), 'strict 34')
  eagerType(amex, ['37', '34'])
  await t.test('Grouping', () => {
    assert.deepEqual(amex.group('378282246310005'), [
      '3782',
      '822463',
      '10005'
    ], 'full number')
    assert.deepEqual(amex.group('3782'), ['3782'], 'partial number')
    assert.deepEqual(amex.group('378282'), ['3782', '82'], 'partial group')
    assert.deepEqual(amex.group(''), [], 'no valid groups')
  })
})
