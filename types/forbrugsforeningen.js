'use strict'

const { CardName } = require('../cardName')
const Type = require('../type')

module.exports = Type({
  name: CardName.Forbrugsforeningen,
  pattern: /^600722\d{10}$/,
  eagerPattern: /^600/
})
