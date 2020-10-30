'use strict'

const test = require('tape')
const eagerType = require('./eager-type')
const jcb = require('../types/jcb')

test('JCB', function (t) {
  t.ok(jcb.test('3530111333300000'), 'normal')
  eagerType(t, jcb, '35')
  t.end()
})
