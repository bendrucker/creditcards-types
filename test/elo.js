import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import elo from '../types/elo.js'

test('Elo', () => {
  assert.ok(elo.test('5090004243572015'), 'normal')
  assert.ok(elo.test('6516794250726603'), '651679 range')
  eagerType(elo, [
    '506250',
    '506702'
  ])
})
