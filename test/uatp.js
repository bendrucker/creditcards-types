import test from 'node:test'
import assert from 'node:assert/strict'
import eagerType from './eager-type.js'
import uatp from '../types/uatp.js'

test('UATP', async (t) => {
  assert.ok(uatp.test('181529834959453'), 'normal')
  eagerType(uatp, '1')
  await t.test('Grouping', () => {
    assert.deepEqual(uatp.group('181529834959453'), [
      '1815',
      '29834',
      '959453'
    ], 'full number')
    assert.deepEqual(uatp.group('181'), ['181'], 'partial number')
    assert.deepEqual(uatp.group('181529'), ['1815', '29'], 'partial group')
    assert.deepEqual(uatp.group(''), [], 'no valid groups')
  })
})
