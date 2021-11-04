'use strict'

const { CardName } = require('../cardName')
const Type = require('../type')

module.exports = Type({
  name: CardName.Troy,
  pattern: /^9792\d{12}$/,
  eagerPattern: /^9792/
})
