'use strict'

const test = require('tape')
const types = require('../')
const Type = require('../type')
const visa = require('../types/visa')

test('find', function (t) {
  const found = types.find(function (type) {
    return type.name === 'Visa'
  })

  t.ok(found)
  t.equal(found, visa)
  t.ok(visa instanceof Type)
  t.end()
})
