'use strict'

var test = require('tape')
var eagerType = require('./eager-type')
var amex = require('../types/american-express')

test('American Express', function (t) {
  t.ok(amex.test('378282246310005'), 'strict 37')
  t.ok(amex.test('378282246310005'), 'strict 34')
  eagerType(t, amex, ['37', '34'])
  t.test('Grouping', function (t) {
    t.deepEqual(amex.group('378282246310005'), [
      '3782',
      '822463',
      '10005'
    ], 'full number')
    t.deepEqual(amex.group('3782'), ['3782'], 'partial number')
    t.deepEqual(amex.group('378282'), ['3782', '82'], 'partial group')
    t.deepEqual(amex.group(''), [], 'no valid groups')
    t.end()
  })
  t.end()
})
