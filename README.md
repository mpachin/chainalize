# chainalize

![npm](https://img.shields.io/npm/v/chainalize.svg?style=flat-square)
![Travis (.org)](https://img.shields.io/travis/mpachin/chainalize.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/mpachin/chainalize.svg?style=flat-square)

`chainalize` is a small (65 lines of code) dependency injection tool.

# Installation

```
npm i chainalize
```

# Usage

```js
const chainalize = require('chainalize');

const First = require('./first');
const Second = require('./second');

const {
  first,
  second,
} = chainalize({
  first: [First, Second, 'local arg'],
  second: [Second, /* ... */],
});
```

Chainalize takes single argument - an object with keys as names for initializing instance, which it will return to you in an object after initialization is complete; and values - as an arrays, first item of which should be class/constructor function, and all subsequent items are arguments which will be supplied to that constructor function. Subsequent arguments can be whichever you want.

If you want to get dependency injection with an instance initialized by `chainalize` - use link to class/constructor function without initialization, that class also should be used once as the first item in an initialization array so `chainalize` will understand that it should construct an object before passing it as an argument.

In the example above - `Second` will be constructed once by `chainalize`, and since its class enumerated as an argument for `first` instance - initialized `second` will be used in place of `Second` argument.

If your initialization sequence will have circular dependencies `chainalize` will throw descriptive error message to help you find out how to fix it.

# License

[MIT](LICENSE)
