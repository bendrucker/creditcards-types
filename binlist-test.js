import test from 'node:test'
import assert from 'node:assert/strict'
import { Transform, Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import csv from 'csv-parser'
import randomInt from 'random-int'
import luhn from 'luhn-generator'
import discover from './types/discover.js'
import maestro from './types/maestro.js'
import americanExpress from './types/american-express.js'
import unionpay from './types/unionpay.js'
import mastercard from './types/mastercard.js'
import visa from './types/visa.js'
import dinersClub from './types/diners-club.js'

const RANGES = 'https://raw.githubusercontent.com/binlist/data/master/ranges.csv'

const ccTypes = {
  discover: [discover, maestro],
  amex: americanExpress,
  unionpay,
  mastercard: [mastercard, maestro],
  visa,
  diners: dinersClub
}

test('binlist', async () => {
  const res = await fetch(RANGES)
  assert.equal(res.status, 200, `Exited with ${res.status}`)

  await pipeline(
    Readable.fromWeb(res.body),
    csv(),
    verifyCard()
  )
})

function verifyCard () {
  return new Transform({
    objectMode: true,
    transform (row, enc, callback) {
      try {
        const scheme = ccTypes[row.scheme]
        const types = scheme && (Array.isArray(scheme) ? scheme : [scheme])
        if (types) testCard(types, row)
        callback()
      } catch (err) {
        callback(err)
      }
    }
  })

  function testCard (types, range) {
    ['start', 'end'].forEach((bound) => {
      const value = range['iin_' + bound]
      if (!value) return

      const output = [range.scheme, bound, value]

      assert.ok(types.some((type) => type.test(value, true)), ['eager'].concat(output).join(' | '))

      const type = types.find((type) => type.test(value, true))
      const generated = generateCard(value, type)

      assert.ok(type.test(generated), ['strict'].concat(output, generated + ' (generated)').join(' | '))
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
