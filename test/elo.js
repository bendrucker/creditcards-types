'use strict'

var test = require('tape')
var eagerType = require('./eager-type')
var elo = require('../types/elo')

test('Elo', function (t) {
  t.ok(elo.test('5090004243572015'), 'normal')
  t.ok(elo.test('6516794250726603'), '651679 range')
  eagerType(t, elo, [
    '506250',
    '506702'
  ], 'full number')
  t.end()
})
