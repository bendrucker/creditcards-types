'use strict';

var Type = require('./type');

exports.visa = new Type('Visa', {
  pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
  eagerPattern: /^4/,
  cvcLength: 3
});

exports.masterCard = new Type('MasterCard', {
  pattern: /^5[1-5][0-9]{14}$/,
  eagerPattern: /^5/,
  cvcLength: 3
});

exports.americanExpress = new Type('American Express', {
  pattern: /^3[47][0-9]{13}$/,
  eagerPattern: /^3[47]/,
  cvcLength: 4
});

exports.dinersClub = new Type('Diners Club', {
  pattern: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  eagerPattern: /^3(?:0|[68])/,
  cvcLength: 3
});

exports.discover = new Type('Discover', {
  pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  eagerPattern: /^6/,
  cvcLength: 3
});

exports.jcb = new Type('JCB', {
  pattern: /^(?:2131|1800|35\d{3})\d{11}$/,
  cvcLength: 3
});
