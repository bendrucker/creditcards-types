# creditcards-types [![Build Status](https://travis-ci.org/bendrucker/creditcards-types.svg?branch=master)](https://travis-ci.org/bendrucker/creditcards-types)

Card type definitions and methods used by [creditcards](https://github.com/bendrucker/creditcards), a JS library for all platforms for parsing, validating, and formatting credit card data. 

## Card Types

#### Currently Supported

* Visa
* MasterCard
* American Express
* Diners Club
* Discover
* JCB
* UnionPay

#### Planned

These cards will still validate but will be matched to the wrong brand:

* Visa Electron
* Maestro
* Forbrugsforeningen
* Dankort

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
* `cvcLength` (Number): The length of the CVC expected for the card type.
* `luhn` (Boolean): Setting for whether a valid card number will pass a [Luhn check](http://en.wikipedia.org/wiki/Luhn_algorithm). Defaults to `true` and is only false for UnionPay.

Each type also provides a `test` method for verifying a card number.

##### `type.test(number, eager)` -> `Boolean`

`type.test` receives a card number (`String`) and an `eager` setting (`Boolean`). Spaces and punctuation must be stripped from `number` before passing it. `eager` is `false` by default and defines whether the `number` will be checking against the `eagerPattern` or the full validation `pattern`. `type.test` returns a `Boolean` indicating whether or not the specified `number` passes for the given `type`. 

```js
var types = require('creditcards-types').types;
var visa  = types.visa;

// Strict type validation
visa.test('4242424242424242'); // => true

// Eager type checking
visa.test('42', true); // => true
```
