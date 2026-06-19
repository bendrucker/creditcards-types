import assert from 'node:assert/strict'
import types from '../index.js'

export default function eagerType (type, number) {
  if (Array.isArray(number)) {
    return number.forEach((n) => eagerType(type, n))
  }
  assert.ok(type.test(number, true), 'eager ' + number)
  const conflicts = types.filter((other) => other !== type && other.test(number, true))
  assert.ok(
    conflicts.length === 0,
    'Eager type conflict between ' + type.name + ' and ' + conflicts.map((c) => c.name).join(', ')
  )
}
