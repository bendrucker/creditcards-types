'use strict';

var extend = require('xtend/mutable');

function CardType (name, config) {
  extend(this, {name: name}, config);
}

CardType.prototype.luhn = true;

CardType.prototype.groupPattern = /(\d{1,4})/g;

CardType.prototype.group = function (number) {
  return number.match(this.groupPattern);
};

CardType.prototype.test = function (number, eager) {
  return this[eager ? 'eagerPattern' : 'pattern'].test(number);
};

module.exports = CardType;
