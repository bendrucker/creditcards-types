'use strict'

const test = require('tape')
const eagerType = require('./eager-type')
const uatp = require('../types/uatp')

test('UATP', function (t) {
  t.ok(uatp.test('181529834959453'), 'normal')
  eagerType(t, uatp, '1')
  t.test('Grouping', function (t) {
    t.deepEqual(uatp.group('181529834959453'), [
      '1815',
      '29834',
      '959453'
    ], 'full number')
    t.deepEqual(uatp.group('181'), ['181'], 'partial number')
    t.deepEqual(uatp.group('181529'), ['1815', '29'], 'partial group')
    t.deepEqual(uatp.group(''), [], 'no valid groups')
    t.end()
  })
  t.end()
})
