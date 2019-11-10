# chainalize

![npm](https://img.shields.io/npm/v/chainalize.svg?style=flat-square)
![Travis (.org)](https://img.shields.io/travis/mpachin/chainalize.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/mpachin/chainalize.svg?style=flat-square)

`chainalize` is a small (100 lines of code) dependency injection tool.

# Installation

```
npm i chainalize
```

# Usage

```js
const chainalize = require('chainalize');

const First = require('./first');

const {
  first,
  second,
} = chainalize({
  First,
}, {
  globalArgument: 'test',
  First: 'local to first',
});
```

Chainalize takes two arguments - first is an object enumerating classes from which you want to get instances from.

Second argument is an optional object with arguments you may want to pass to your instances. You may use whichever argument name you want for globally visible arguments. However if you want instance-visible arguments you need to use class name as a key, and you will get local to your instance argument named `classLocalArg` - the name of the class with lowercased first letter (to preserve camelcase) + `LocalArg`-ending.

Make sure your classes cross-dependencies are enumerated in `dependencies` static field:

```js
const Second from './second';

class First {
  constructor({
    second,
    globalArgument,
    firstLocalArg,
  }) {
    this.second = second;
    this.firstArgument = firstArgument;
    this.firstLocalArg = firstLocalArg;
  }
  // ...
}
First.dependencies = {
  Second,
};
```

`chainalize` will use that static field to create instances for your dependant class.

If your initialization sequence will have circular dependencies `chainalize` will throw descriptive error message to help you find out how to fix it.

# License

[MIT](LICENSE)
