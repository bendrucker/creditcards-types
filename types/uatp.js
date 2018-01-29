'use strict'

var Type = require('../type')

module.exports = Type({
  name: 'UATP',
  digits: 15,
  pattern: /^1\d{14}$/,
  eagerPattern: /^1/,
  groupPattern: /(1\d{3})(\d{1,5})?(\d{1,6})?/
})
