'use strict'

const test = require('tape')
const get = require('simple-get')
const csv = require('csv-parser')
const pump = require('pump')
const Transform = require('stream').Transform
const array = require('cast-array')
const randomInt = require('random-int')
const luhn = require('luhn-generator')

const RANGES = 'https://raw.githubusercontent.com/binlist/data/master/ranges.csv'

const ccTypes = {
  discover: [
    require('./types/discover'),
    require('./types/maestro')
  ],
  amex: require('./types/american-express'),
  unionpay: require('./types/unionpay'),
  mastercard: [
    require('./types/mastercard'),
    require('./types/maestro')
  ],
  visa: require('./types/visa'),
  diners: require('./types/diners-club')
}

test('binlist', function (t) {
  get(RANGES, function (err, res) {
    if (err) return t.end(err)
    if (res.statusCode !== 200) {
      return t.end(new Error('Exited with ' + res.statusCode))
    }

    pump(res, csv(), verifyCard(t), t.end)
  })
})

function verifyCard (t) {
  return new Transform({
    objectMode: true,
    transform: function (row, enc, callback) {
      const types = ccTypes[row.scheme] && array(ccTypes[row.scheme])
      if (types) testCard(types, row)
      callback()
    }
  })

  function testCard (types, range) {
    ['start', 'end'].forEach(function (bound) {
      const value = range['iin_' + bound]
      if (!value) return

      const output = [range.scheme, bound, value]

      t.ok(types.some(type => type.test(value, true)), ['eager'].concat(output).join(' | '))

      const type = types.find(type => type.test(value, true))
      const generated = generateCard(value, type)

      t.ok(type.test(generated), ['strict'].concat(output, generated + ' (generated)').join(' | '))
    })
  }
}

function generateCard (seed, type) {
  seed = String(seed)
  const length = Array.isArray(type.digits) ? type.digits[1] : type.digits
  const random = new Array(length - seed.length - 1)
    .fill()
    .map(() => randomInt(0, 9))
    .join('')

  return luhn.generate(seed + random)
}
