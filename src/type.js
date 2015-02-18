'use strict';

var extend = require('xtend/mutable');

function CardType (name, config) {
  extend(this, {name: name}, config);
}

CardType.prototype.test = function (number, eager) {
  return this[eager ? 'eagerPattern' : 'pattern'].test(number);
};

module.exports = CardType;
