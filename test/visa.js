'use strict'

const test = require('tape')
const eagerType = require('./eager-type')
const visa = require('../types/visa')

test('Visa', function (t) {
  t.ok(visa.test('4242424242424242'), 'normal')
  t.ok(visa.test('4000056655665556'), 'debit')
  t.ok(visa.test('4000056655665'), '13 digit')
  t.ok(visa.test('4917610000000000003'), '19 digit')
  eagerType(t, visa, '4')
  t.test('Grouping', function (t) {
    t.deepEqual(visa.group('4242424242424242'), [
      '4242',
      '4242',
      '4242',
      '4242'
    ], 'full number')
    t.deepEqual(visa.group('4242'), ['4242'], 'partial number')
    t.deepEqual(visa.group('42424'), ['4242', '4'], 'partial group')
    t.deepEqual(visa.group(''), [], 'no valid groups')
    t.deepEqual(visa.group('4242424242424242424'), [
      '4242',
      '4242',
      '4242',
      '4242',
      '424'
    ], '19 digit')
    t.deepEqual(visa.group('4242424242424242424000'), [
      '4242',
      '4242',
      '4242',
      '4242',
      '424'
    ], 'truncated')
    t.end()
  })
  t.end()
})
