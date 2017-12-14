'use strict'

var test = require('tape')
var eagerType = require('./eager-type')
var dc = require('../types/diners-club')

test('Diners Club', function (t) {
  t.ok(dc.test('30569309025904'), 'full 30')
  t.ok(dc.test('38520000023237'), 'full 38')
  eagerType(t, dc, ['30', '36', '38'])
  t.test('Grouping', function (t) {
    t.deepEqual(dc.group('30569309025904'), [
      '3056',
      '930902',
      '5904'
    ], 'full number')
    t.deepEqual(dc.group('3056'), ['3056'], 'partial number')
    t.deepEqual(dc.group('305693'), ['3056', '93'], 'partial group')
    t.deepEqual(dc.group(''), [], 'no valid groups')
    t.end()
  })
  t.end()
})
