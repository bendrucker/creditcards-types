'use strict'

const { CardName } = require('../cardName')
const Type = require('../type')

module.exports = Type({
  name: CardName.Jcb,
  pattern: /^35\d{14}$/,
  eagerPattern: /^35/
})
