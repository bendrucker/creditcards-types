'use strict';

var test  = require('tape');
var types = require('../');

test('Visa', function (t) {
  var visa = types.visa;
  t.ok(visa.test('4242424242424242'), 'normal');
  t.ok(visa.test('4000056655665556'), 'debit');
  t.ok(visa.test('4000056655665'), '13 digit');
  t.end();
});

test('MasterCard', function (t) {
  var mc = types.masterCard;
  t.ok(mc.test('5555555555554444'), 'normal');
  t.ok(mc.test('5200828282828210'), 'debit');
  t.ok(mc.test('5105105105105100'), 'prepaid');
  t.end();
});

test('American Express', function (t) {
  var amex = types.americanExpress;
  t.ok(amex.test('378282246310005'), '37');
  t.ok(amex.test('378282246310005'), '34');
  t.end();
});

test('Diners Club', function (t) {
  var dc = types.dinersClub;
  t.ok(dc.test('30569309025904'), '30');
  t.ok(dc.test('38520000023237'), '38');
  t.end();
});

test('Discover', function (t) {
  var discover = types.discover;
  t.ok(discover.test('6011111111111117'), 'normal');
  t.end();
});

test('JCB', function (t) {
  var jcb = types.jcb;
  t.ok(jcb.test('3530111333300000'), 'normal');
  t.end();
});
