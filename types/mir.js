'use strict'

const Type = require('../type')

module.exports = Type({
  name: 'Mir',
  pattern: /^220[0-4]\d{12}$/,
  eagerPattern: /^220[0-4]/,
  groupPattern: /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,3})?/
})
