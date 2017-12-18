'use strict'

var test = require('tape')
var eagerType = require('./eager-type')
var mc = require('../types/mastercard')

test('MasterCard', function (t) {
  t.ok(mc.test('5555555555554444'), 'normal')
  t.ok(mc.test('2223000048400011'), '1st valid 2 range')
  t.ok(mc.test('2234888888888882'), '2nd valid 2 range')
  t.ok(mc.test('2512777777777772'), '3rd valid 2 range')
  t.ok(mc.test('2705555555555553'), '4th valid 2 range')
  t.ok(mc.test('2720333333333334'), '5th valid 2 range')
  t.notOk(mc.test('2723000048400016'), '1st invalid 2 range')
  t.notOk(mc.test('2011111111111116'), '2nd invalid 2 range')
  t.ok(mc.test('5200828282828210'), 'debit')
  t.ok(mc.test('5105105105105100'), 'prepaid')
  t.notOk(mc.test('5611111111111113'), 'invalid 5 range')
  eagerType(t, mc, ['51', '55', '22', '27'])
  t.end()
})
