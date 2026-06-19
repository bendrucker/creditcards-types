import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import maestro from '../types/maestro.js'

test('Maestro', () => {
  assert.ok(maestro.test('6759649826438453'), 'normal')
  assert.ok(maestro.test('6016607095058666'), '6016 range')
  assert.ok(maestro.test('501800000009'), '12 digit')
  assert.ok(maestro.test('6799990100000000019'), '19 digit')
  eagerType(maestro, [
    '5018',
    '503',
    '502',
    '58',
    '63',
    '67',
    '60111',
    '60115',
    '601185',
    '642',
    '66'
  ])
})
