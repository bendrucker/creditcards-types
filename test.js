'use strict'

var test = require('tape')
var ccTypes = require('./')
var types = ccTypes.types
var Type = ccTypes.Type
var find = ccTypes.find

function eagerType (t, type, number) {
  if (Array.isArray(number)) {
    return number.forEach(eagerType.bind(null, t, type))
  }
  t.ok(type.test(number, true), 'eager ' + number)
  var expected = type
  var msg = Object.keys(types)
    .map(function (name) {
      return types[name]
    })
    .filter(function (type) {
      return type !== expected && type.test(number, true)
    })
    .reduce(function (msg, conflict, index, conflicts) {
      if (!conflicts.length) return ''
      if (index === 0) {
        msg += 'Eager type conflict between '
        msg += type.name
        msg += ' and '
      }
      msg += conflict.name
      if (index < conflicts.length - 1) msg += ', '
      return msg
    }, '')

  if (msg) t.fail(msg)
}

test('Visa', function (t) {
  var visa = types.visa
  t.ok(visa.test('4242424242424242'), 'normal')
  t.ok(visa.test('4000056655665556'), 'debit')
  t.ok(visa.test('4000056655665'), '13 digit')
  t.ok(visa.test('4917610000000000003'), '19 digit')
  eagerType(t, visa, '4')
  t.test('Grouping', function (t) {
    t.deepEqual(visa.group('4242424242424242'), [
      '4242',
      '4242',
      '4242',
      '4242'
    ], 'full number')
    t.deepEqual(visa.group('4242'), ['4242'], 'partial number')
    t.deepEqual(visa.group('42424'), ['4242', '4'], 'partial group')
    t.deepEqual(visa.group(''), [], 'no valid groups')
    t.deepEqual(visa.group('4242424242424242424'), [
      '4242',
      '4242',
      '4242',
      '4242',
      '424'
    ], '19 digit')
    t.deepEqual(visa.group('4242424242424242424000'), [
      '4242',
      '4242',
      '4242',
      '4242',
      '424'
    ], 'truncated')
    t.end()
  })
  t.end()
})

test('Maestro', function (t) {
  var maestro = types.maestro
  t.ok(maestro.test('6759649826438453'), 'normal')
  t.ok(maestro.test('6016607095058666'), '6016 range')
  t.ok(maestro.test('501800000009'), '12 digit')
  t.ok(maestro.test('6799990100000000019'), '19 digit')
  eagerType(t, maestro, [
    '5018',
    '503',
    '502',
    '58',
    '63',
    '67',
    '60111',
    '60115',
    '601185',
    '642',
    '66'
  ])
  t.end()
})

test('Forbrugsforeningen', function (t) {
  var fb = types.forbrugsforeningen
  t.ok(fb.test('6007220000000004'), 'normal')
  eagerType(t, fb, '600')
  t.end()
})

test('Dankort', function (t) {
  var d = types.dankort
  t.ok(d.test('5019717010103742'), 'normal')
  eagerType(t, d, '5019')
  t.end()
})

test('MasterCard', function (t) {
  var mc = types.masterCard
  t.ok(mc.test('5555555555554444'), 'normal')
  t.ok(mc.test('2223000048400011'), '1st valid 2 range')
  t.ok(mc.test('2234888888888882'), '2nd valid 2 range')
  t.ok(mc.test('2512777777777772'), '3rd valid 2 range')
  t.ok(mc.test('2705555555555553'), '4th valid 2 range')
  t.ok(mc.test('2720333333333334'), '5th valid 2 range')
  t.notOk(mc.test('2723000048400016'), '1st invalid 2 range')
  t.notOk(mc.test('2011111111111116'), '2nd invalid 2 range')
  t.ok(mc.test('5200828282828210'), 'debit')
  t.ok(mc.test('5105105105105100'), 'prepaid')
  t.notOk(mc.test('5611111111111113'), 'invalid 5 range')
  eagerType(t, mc, ['51', '55', '222', '27'])
  t.end()
})

test('American Express', function (t) {
  var amex = types.americanExpress
  t.ok(amex.test('378282246310005'), 'strict 37')
  t.ok(amex.test('378282246310005'), 'strict 34')
  eagerType(t, amex, ['37', '34'])
  t.test('Grouping', function (t) {
    t.deepEqual(amex.group('378282246310005'), [
      '3782',
      '822463',
      '10005'
    ], 'full number')
    t.deepEqual(amex.group('3782'), ['3782'], 'partial number')
    t.deepEqual(amex.group('378282'), ['3782', '82'], 'partial group')
    t.deepEqual(amex.group(''), [], 'no valid groups')
    t.end()
  })
  t.end()
})

test('Diners Club', function (t) {
  var dc = types.dinersClub
  t.ok(dc.test('30569309025904'), 'full 30')
  t.ok(dc.test('38520000023237'), 'full 38')
  eagerType(t, dc, ['30', '36', '38'])
  t.test('Grouping', function (t) {
    t.deepEqual(dc.group('30569309025904'), [
      '3056',
      '930902',
      '5904'
    ], 'full number')
    t.deepEqual(dc.group('3056'), ['3056'], 'partial number')
    t.deepEqual(dc.group('305693'), ['3056', '93'], 'partial group')
    t.deepEqual(dc.group(''), [], 'no valid groups')
    t.end()
  })
  t.end()
})

test('Discover', function (t) {
  var discover = types.discover
  t.ok(discover.test('6011039964691945'), 'normal')
  t.ok(discover.test('6441111111111117'), '64')
  t.ok(discover.test('6501111111111117'), '65')
  eagerType(t, discover, [
    '60112',
    '644',
    '65'
  ])
  t.end()
})

test('JCB', function (t) {
  var jcb = types.jcb
  t.ok(jcb.test('3530111333300000'), 'normal')
  eagerType(t, jcb, '35')
  t.end()
})

test('UnionPay', function (t) {
  var up = types.unionPay
  t.ok(up.test('6240008631401148'), 'normal')
  t.ok(up.test('6240008631401148000'), '19 digit')
  t.deepEqual(up.group('4242424242424242424'), [
    '4242',
    '4242',
    '4242',
    '4242',
    '424'
  ], 'group 19 digit')
  eagerType(t, up, '62')
  t.end()
})

test('Mir', function (t) {
  var mir = types.mir
  t.ok(mir.test('2202200128683966'), 'normal')
  eagerType(t, mir, [
    '2204',
    '2200'
  ])
  t.end()
})

test('find', function (t) {
  var visa = find(function (type) {
    return type.name === 'Visa'
  })
  t.ok(visa)
  t.ok(visa instanceof Type)
  t.end()
})
