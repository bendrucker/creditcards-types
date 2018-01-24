'use strict'

var test = require('tape')
var eagerType = require('./eager-type')
var uatp = require('../types/uatp')

test('UATP', function (t) {
  t.ok(uatp.test('181529834959453'), 'normal')
  eagerType(t, uatp, '1')
  t.test('Grouping', function (t) {
    t.deepEqual(uatp.group('181529834959453'), [
      '181',
      '5298',
      '3495',
      '9453'
    ], 'full number')
    t.deepEqual(uatp.group('181'), ['181'], 'partial number')
    t.deepEqual(uatp.group('18152'), ['181', '52'], 'partial group')
    t.deepEqual(uatp.group(''), [], 'no valid groups')
    t.end()
  })
  t.end()
})
