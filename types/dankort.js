'use strict'

const { CardName } = require('../cardName')
const Type = require('../type')

module.exports = Type({
  name: CardName.Dankort,
  pattern: /^5019\d{12}$/,
  eagerPattern: /^5019/
})
