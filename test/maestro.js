'use strict'

var test = require('tape')
var eagerType = require('./eager-type')
var maestro = require('../types/maestro')

test('Maestro', function (t) {
  t.ok(maestro.test('6759649826438453'), 'normal')
  t.ok(maestro.test('6016607095058666'), '6016 range')
  t.ok(maestro.test('501800000009'), '12 digit')
  t.ok(maestro.test('6799990100000000019'), '19 digit')
  eagerType(t, maestro, [
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
  t.end()
})
