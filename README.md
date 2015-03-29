# creditcards-types [![Build Status](https://travis-ci.org/bendrucker/creditcards-types.svg?branch=master)](https://travis-ci.org/bendrucker/creditcards-types)

Card type definitions and methods used by [creditcards](https://github.com/bendrucker/creditcards), a JS library for all platforms for parsing, validating, and formatting credit card data. 

## Card Types

* Visa
* MasterCard
* American Express
* Diners Club
* Discover
* JCB
* UnionPay
* Maestro
* Forbrugsforeningen
* Dankort

Visa Electron cards will validate and match as regular Visa cards.

[Open an issue](https://github.com/bendrucker/creditcards-types/issues/new) if you need a type that's missing.

## Installing

```sh
npm install creditcards-types
```

## API

Card types are exposed under `types`.

Each type provides:

* `pattern` (RegEx): A regular expression for validating a full card number.
* `eagerPattern` (RegEx): A regular expression for guessing the card number from a partial number.
* `groupPattern` (RegEx): A regular expression for separating the card number into formatting groups.
* `cvcLength` (Number): The length of the CVC expected for the card type.
* `luhn` (Boolean): Setting for whether a valid card number will pass a [Luhn check](http://en.wikipedia.org/wiki/Luhn_algorithm). Defaults to `true` and is only false for UnionPay.

Each type also provides the methods listed below. `number` must always be a `String` without any punctuation or spaces.

##### `type.test(number, eager)` -> `Boolean`

`type.test` receives a card `number` and an `eager` setting (`Boolean`).`eager` is `false` by default and defines whether the `number` will be checked against the `eagerPattern` or the full validation `pattern`. `type.test` returns a `Boolean` indicating whether or not the specified `number` passes for the given `type`. 

```js
var types = require('creditcards-types').types;
var visa  = types.visa;

// Strict type validation
visa.test('4242424242424242'); // => true

// Eager type checking
visa.test('42', true); // => true
```

##### `type.group(number)` -> `Array`

`type.group` separates the given card `number` into formatting groups. It can receive either a partial or complete card number. If the `number` exceeds the valid length for the card, any digits past the maximum length are discarded.

```js
var visa = types.visa;
// Full groups
visa.group('4242424242424242'); // => ['4242', '4242', '4242', '4242']

// Partial groups
visa.group('424242'); // => ['4242', '42']
```
