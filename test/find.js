import test from 'node:test'
import assert from 'node:assert/strict'
import types from '../index.js'
import Type from '../type.js'
import visa from '../types/visa.js'

test('find', () => {
  const found = types.find((type) => type.name === 'Visa')

  assert.ok(found)
  assert.equal(found, visa)
  assert.ok(visa instanceof Type)
})
