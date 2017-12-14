'use strict'

var test = require('tape')
var types = require('../')
var Type = require('../type')
var visa = require('../types/visa')

test('find', function (t) {
  var found = types.find(function (type) {
    return type.name === 'Visa'
  })

  t.ok(found)
  t.equal(found, visa)
  t.ok(visa instanceof Type)
  t.end()
})
