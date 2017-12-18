# creditcards-types [![Build Status](https://travis-ci.org/bendrucker/creditcards-types.svg?branch=master)](https://travis-ci.org/bendrucker/creditcards-types)

> Card type definitions and methods used by [creditcards](https://github.com/bendrucker/creditcards), a JS library for all platforms for parsing, validating, and formatting credit card data. 

## Card Types

* Visa
* Mastercard
* American Express
* Diners Club
* Discover
* JCB
* UnionPay
* Maestro
* Forbrugsforeningen
* Dankort
* Troy
* Elo
* Mir

Visa Electron cards will validate and match as regular Visa cards. 

Card data can be required individually by [type](types/). The main module includes _all_ defined card types. You may want to select specific cards that your customers will use to save bytes or avoid confusion.

[Open an issue](https://github.com/bendrucker/creditcards-types/issues/new) or a PR if you'd like to contribute documentation/code for a type that's missing.

## Installing

```sh
npm install --save creditcards-types
```

## Usage

```js
// finding
var types = require('creditcards-types')
var type = types.find(type => type.test('4', true))
// type.name => Visa

// specific types
var visa = require('creditcards-types/types/visa')
visa.test('4242424242424242') // true

// creating custom types
var Type = require('creditcards-types/type')
var myCard = Type({
  name: 'My Card',
  pattern: /^999\d{13}$/
  eagerPattern: /^999/,
  luhn: false
})

var myTypes = types.concat(myCard) // myCard gets lowest priority
```

## API

#### `new Type(data)` -> `type`

Creates a new card type.

```js
var Type = require('creditcards-types/type')
var type = Type(data)
```

##### data

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
var visa = require('creditcards-types/types/visa')

// Strict type validation
visa.test('4242424242424242') // => true

// Eager type checking
visa.test('42', true) // => true
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
