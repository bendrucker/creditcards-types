import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import up from '../types/unionpay.js'

test('UnionPay', () => {
  assert.ok(up.test('6240008631401148'), 'normal')
  assert.ok(up.test('6240008631401148000'), '19 digit')
  assert.deepEqual(up.group('4242424242424242424'), [
    '4242',
    '4242',
    '4242',
    '4242',
    '424'
  ], 'group 19 digit')
  eagerType(up, '62')
})
