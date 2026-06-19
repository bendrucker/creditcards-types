import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import visa from '../types/visa.js'

test('Visa', async (t) => {
  assert.ok(visa.test('4242424242424242'), 'normal')
  assert.ok(visa.test('4000056655665556'), 'debit')
  assert.ok(visa.test('4000056655665'), '13 digit')
  assert.ok(visa.test('4917610000000000003'), '19 digit')
  eagerType(visa, '4')
  await t.test('Grouping', () => {
    assert.deepEqual(visa.group('4242424242424242'), [
      '4242',
      '4242',
      '4242',
      '4242'
    ], 'full number')
    assert.deepEqual(visa.group('4242'), ['4242'], 'partial number')
    assert.deepEqual(visa.group('42424'), ['4242', '4'], 'partial group')
    assert.deepEqual(visa.group(''), [], 'no valid groups')
    assert.deepEqual(visa.group('4242424242424242424'), [
      '4242',
      '4242',
      '4242',
      '4242',
      '424'
    ], '19 digit')
    assert.deepEqual(visa.group('4242424242424242424000'), [
      '4242',
      '4242',
      '4242',
      '4242',
      '424'
    ], 'truncated')
  })
})
