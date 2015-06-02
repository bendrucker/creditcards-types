# creditcards-types [![Build Status](https://travis-ci.org/bendrucker/creditcards-types.svg?branch=master)](https://travis-ci.org/bendrucker/creditcards-types)

> Card type definitions and methods used by [creditcards](https://github.com/bendrucker/creditcards), a JS library for all platforms for parsing, validating, and formatting credit card data. 

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

## Usage

```js
var types = require('creditcards-types').types
var visa = types.visa
visa.test('4242424242424242') // true
```

## API

#### `find(callback)` -> `type` / `undefined`

Iterates through the available types until the `callback` returns a truthy value. Returns the first matching type. Iteration order is undefined.

##### callback

*Required*  
Type: `function`

Callback that is called with card type objects and should return truthy/falsy until a match is found.

#### `new Type(config)` -> `type`

Creates a new card type.

```js
var Type = require('creditcards-types').Type
var type = new Type(config)
```

##### config

*Required*  
Type: `object`

The type configuration, containing the following properties:

* `pattern`
  * description: A regular expression for validating a full card number.
  * required: `true`
  * type: `regexp`
* `eagerPattern`
  * description: A regular expression for guessing the card number from a partial number.
  * required: `true`
  * type: `regexp`
* `groupPattern`
  * description: A regular expression for separating the card number into formatting. groups
  * type: `regexp`
  * default: `/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/`
* `cvcLength`
  * description: The length of the CVC expected for the card type.
  * type: `number`
  * default: `3`
* `luhn`
  * description: Setting for whether the card should pass a [Luhn](https://github.com/bendrucker/fast-luhn) check. Not used internally, purely informational.
  * type: `boolean`
  * default: `true`

---

#### `type.test(number, [eager])` -> `boolean`

Check whether a card number matches the type.

##### number

*Required*  
Type: `string`

The card number to test.

##### eager

Type: `Boolean`  
Default: `false`

When `false`, the full card pattern is used. When `true`, the eager pattern is tested instead.

```js
var types = require('creditcards-types').types;
var visa  = types.visa;

// Strict type validation
visa.test('4242424242424242'); // => true

// Eager type checking
visa.test('42', true); // => true
```

---

#### `type.group(number)` -> `array[string]`

Separates the card number into formatting groups. 

##### number

*Required*  
Type: `string`

The card number to group. This may be a complete or partial card number. Any digits past the type's maximum length will be discarded.

## License

MIT © [Ben Drucker](http://bendrucker.me)
