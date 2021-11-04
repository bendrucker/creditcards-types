'use strict'

const { CardName } = require('../cardName')
const Type = require('../type')

module.exports = Type({
  name: CardName.Uatp,
  digits: 15,
  pattern: /^1\d{14}$/,
  eagerPattern: /^1/,
  groupPattern: /(\d{1,4})(\d{1,5})?(\d{1,6})?/
})
