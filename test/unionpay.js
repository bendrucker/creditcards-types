'use strict'

var test = require('tape')
var eagerType = require('./eager-type')
var up = require('../types/unionpay')

test('UnionPay', function (t) {
  t.ok(up.test('6240008631401148'), 'normal')
  t.ok(up.test('6240008631401148000'), '19 digit')
  t.deepEqual(up.group('4242424242424242424'), [
    '4242',
    '4242',
    '4242',
    '4242',
    '424'
  ], 'group 19 digit')
  eagerType(t, up, '62')
  t.end()
})
