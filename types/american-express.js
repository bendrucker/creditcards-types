'use strict'

const { CardName } = require('../cardName')
const Type = require('../type')

module.exports = Type({
  name: CardName.AmericanExpress,
  digits: 15,
  pattern: /^3[47]\d{13}$/,
  eagerPattern: /^3[47]/,
  groupPattern: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
  cvcLength: 4
})
