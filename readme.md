# creditcards-types [![tests](https://github.com/bendrucker/creditcards-types/workflows/tests/badge.svg)](https://github.com/bendrucker/creditcards-types/actions?query=workflow%3Atests)

> Card type definitions in JavaScript modules

This library powers [creditcards](https://github.com/bendrucker/creditcards), a higher level tool for parsing/formatting/validating card data. This repository focuses on [tests](#tests) and [documentation](docs). Card types are primarily represented by static values and regular expressions.

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
* UATP

Visa Electron cards will validate and match as regular Visa cards. 

Card data can be required individually by [type](types/). The main module includes _all_ defined card types. You may want to select specific cards that your customers will use to save bytes or avoid confusion.

## Co-Branded Cards

The main types in this library have unique patterns that map to major card networks. In some locales, companies issue co-branded with other card networks within the major partner's BIN range. This library includes these types as modules but _does not_ include co-branded types in the main export. Custom types include:

* Mada
* Meeza

Similar to [using custom types](#usage), you can prepend optional types to the main list. Cards that previously matched as a major issuer will instead match the custom type if applicable.

```js
var types = [ require('creditcards-types/types/mada') ].concat(require('creditcards-types'))
```

[Open an issue](https://github.com/bendrucker/creditcards-types/issues/new) or a PR if you'd like to contribute documentation/code for a type that's missing.

## Test Card Numbers

Some processors (e.g. [Stripe](https://stripe.com/docs/testing)) support fake card numbers used for testing payments. In some cases, these test card numbers do not fall within the actual issuing range. For example, `6011 1111 1111 1117` is provided as a Discover test card, but falls outside of the [documented range](./docs/discover.md). If you need to match these cards, you'll need to handle them outside this library or [add a custom type](#usage). 

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
  * description: A regular expression for guessing the card type from a partial number.
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

## Tests

This repository is designed to support a large volume of automated testing. There are two types of tests.

#### Regression tests (~100)

Traditional regression tests are included in the [`test/`](test) folder. These tests describe the regular expressions and make assertions about a few possible card patterns. Each type tests checks that expedcted eager matches for that type do not also match another card type. There's also a coverage check that will fail the test run if any type module is missing an identically named test file.

#### Fuzz tests (~12,500)

As an additional check, `npm test` downloads [range data from binlist](https://github.com/binlist/data). The [binlist tests](binlist-test.js):

* Check the BIN range start and end to make sure they are an eager match for their corresponding type
* Generate a random card number matching the maximum length for that type
* Strictly test the generated number against the type

This data is not guaranteed to be accurate but provides a valuable external check against the validity of the type definitions with far more assertions than could ever be written by hand. 



## License

MIT © [Ben Drucker](http://bendrucker.me)
