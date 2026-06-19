import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import mc from '../types/mastercard.js'

test('MasterCard', () => {
  assert.ok(mc.test('5555555555554444'), 'normal')
  assert.ok(mc.test('2223000048400011'), '1st valid 2 range')
  assert.ok(mc.test('2234888888888882'), '2nd valid 2 range')
  assert.ok(mc.test('2512777777777772'), '3rd valid 2 range')
  assert.ok(mc.test('2705555555555553'), '4th valid 2 range')
  assert.ok(mc.test('2720333333333334'), '5th valid 2 range')
  assert.ok(!mc.test('2723000048400016'), '1st invalid 2 range')
  assert.ok(!mc.test('2011111111111116'), '2nd invalid 2 range')
  assert.ok(mc.test('5200828282828210'), 'debit')
  assert.ok(mc.test('5105105105105100'), 'prepaid')
  assert.ok(!mc.test('5611111111111113'), 'invalid 5 range')

  eagerType(mc, [
    '51',
    '55',
    '222',
    '23',
    '27'
  ])
})
