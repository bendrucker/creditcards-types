'use strict';

var test  = require('tape');
var types = require('../').types;

test('Visa', function (t) {
  var visa = types.visa;
  t.ok(visa.test('4242424242424242'), 'normal');
  t.ok(visa.test('4000056655665556'), 'debit');
  t.ok(visa.test('4000056655665'), '13 digit');
  t.ok(visa.test('4', true), 'eager');
  t.test('Grouping', function (t) {
    t.deepEqual(visa.group('4242424242424242'), [
      '4242',
      '4242',
      '4242',
      '4242'
    ], 'full number');
    t.deepEqual(visa.group('4242'), ['4242'], 'partial number');
    t.deepEqual(visa.group('42424'), ['4242', '4'], 'partial group');
    t.deepEqual(visa.group(''), [], 'no valid groups');
    t.deepEqual(visa.group('4242424242424242424'), [
      '4242',
      '4242',
      '4242',
      '4242'
    ], 'truncating');
    t.end();
  });
  t.end();
});

test('MasterCard', function (t) {
  var mc = types.masterCard;
  t.ok(mc.test('5555555555554444'), 'normal');
  t.ok(mc.test('5200828282828210'), 'debit');
  t.ok(mc.test('5105105105105100'), 'prepaid');
  t.ok(mc.test('5', true), 'eager');
  t.end();
});

test('American Express', function (t) {
  var amex = types.americanExpress;
  t.ok(amex.test('378282246310005'), 'strict 37');
  t.ok(amex.test('378282246310005'), 'strict 34');
  t.ok(amex.test('37', true), 'eager 37');
  t.ok(amex.test('34', true), 'eager 34');
  t.test('Grouping', function (t) {
    t.deepEqual(amex.group('378282246310005'), [
      '3782',
      '822463',
      '10005',
    ], 'full number');
    t.deepEqual(amex.group('3782'), ['3782'], 'partial number');
    t.deepEqual(amex.group('378282'), ['3782', '82'], 'partial group');
    t.deepEqual(amex.group(''), [], 'no valid groups');
    t.end();
  });
  t.end();
});

test('Diners Club', function (t) {
  var dc = types.dinersClub;
  t.ok(dc.test('30569309025904'), 'full 30');
  t.ok(dc.test('38520000023237'), 'full 38');
  t.ok(dc.test('30', true), 'eager 30');
  t.ok(dc.test('36', true), 'eager 36');
  t.ok(dc.test('38', true), 'eager 38');
  t.notOk(dc.test('37', true), 'no amex 34 conflict');
  t.notOk(dc.test('37', true), 'no amex 37 conflict');
  t.notOk(dc.test('35', true), 'no jcb 35 conflict');
  t.end();
});

test('Discover', function (t) {
  var discover = types.discover;
  t.ok(discover.test('6011111111111117'), 'normal');
  t.ok(discover.test('6', true), 'eager');
  t.end();
});

test('JCB', function (t) {
  var jcb = types.jcb;
  t.ok(jcb.test('3530111333300000'), 'normal');
  t.ok(jcb.test('35', true), 'eager');
  t.end();
});

test('UnionPay', function (t) {
  var up = types.unionPay;
  t.ok(up.test('6240008631401148'), 'normal');
  t.ok(up.test('6240008631401148000'), '19 digit');
  t.deepEqual(up.group('4242424242424242424'), [
    '4242',
    '4242',
    '4242',
    '4242',
    '424'
  ], 'group 19 digit');
  t.end();
});
