import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import dc from '../types/diners-club.js'

test('Diners Club', async (t) => {
  assert.ok(dc.test('30569309025904'), 'full 30')
  assert.ok(dc.test('38520000023237'), 'full 38')
  eagerType(dc, ['30', '36', '38'])
  await t.test('Grouping', () => {
    assert.deepEqual(dc.group('30569309025904'), [
      '3056',
      '930902',
      '5904'
    ], 'full number')
    assert.deepEqual(dc.group('3056'), ['3056'], 'partial number')
    assert.deepEqual(dc.group('305693'), ['3056', '93'], 'partial group')
    assert.deepEqual(dc.group(''), [], 'no valid groups')
  })
})
