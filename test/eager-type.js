'use strict'

const types = require('../')

module.exports = function eagerType (t, type, number) {
  if (Array.isArray(number)) {
    return number.forEach(eagerType.bind(null, t, type))
  }
  t.ok(type.test(number, true), 'eager ' + number)
  const expected = type
  const msg = types
    .filter(function (type) {
      return type !== expected && type.test(number, true)
    })
    .reduce(function (msg, conflict, index, conflicts) {
      if (!conflicts.length) return ''
      if (index === 0) {
        msg += 'Eager type conflict between '
        msg += type.name
        msg += ' and '
      }
      msg += conflict.name
      if (index < conflicts.length - 1) msg += ', '
      return msg
    }, '')

  if (msg) t.fail(msg)
}
