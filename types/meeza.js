'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Meeza',
  digits: 16,
  pattern: /^5078(03|08|09|10)\d{10}$/,
  eagerPattern: /^5078(03|08|09|10)/
})
