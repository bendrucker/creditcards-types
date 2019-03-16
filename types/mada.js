'use strict'

var Type = require('../type')

module.exports = Type({
  name: 'Mada',
  digits: 16,
  pattern: /^(4[^79][^1][^19][0-9][0-9]|5[^67][0-9][^6][^7][^8]|636120)\d{10}$/,
  eagerPattern: /^6361/
})
