# chainalize

> Refactoring tool for global instances

![npm](https://img.shields.io/npm/v/chainalize.svg?style=flat-square)
![Travis (.org)](https://img.shields.io/travis/mpachin/chainalize.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/mpachin/chainalize.svg?style=flat-square)

`chainalize` is a small tool which helps you take control over [singletons](https://en.wikipedia.org/wiki/Singleton_pattern) in your application.

# Motivation

Singletons are globally available instances and in Node.js their use may lead to big problems.

Client-side app development is a sample case scenario when you may set traps in your project. You may write your app in React, export singletons here and there and everything will be ok until you decide to move to SSR.

Since the moment you decide to implement SSR, your app becomes a hybrid app. That means it runs either on a single server and on clients and now you need to understand how Node.js works.

Node.js hoist your app in memory and let client requests run through that app in machines RAM. You may use for example some cookie module which always exports single instance. It will lead to the problem when one user will log in in one place, and second logged in user will get one's cookies or even session.

That may seem not a problem at all and what you need to do is just don't use singletons except when you definitely want to share some data between different calls to the server. However, there may be cases when the project already have more singletons than you can refactor right away. In such situations, you may consider using `chainalize` which will help you wrap chains of singletons together, and also it will help you avoid circular dependencies.

# Installation

```
npm install --save chainalize
```

# Usage

```js
const chainalize = require('chainalize');

const First = require('./first');

const {
  first,
  second
} = chainalize({
  First
}, {
  firstArgument: 'test'
});
```

Chainalize takes two arguments - first is an object enumerating classes from which you want get singletons. If your singletons are just statefull objects - rewrite them to be re-instantiated on which class instance creation.

Second argument is an optional object with arguments you may want to pass to your singletons.

Make sure your singletons cross-dependencies are enumerated in `dependencies` static field of the class:

```js
const Second from './second';

class First {
  constructor({ second, firstArgument }) {
    this.second = second;
    this.firstArgument = firstArgument;
  }
  // ...
}
First.dependencies = {
  Second
};
```

`chainalize` will use that static field to create singletons for your dependant singleton. That dependency singletons will be passed on the dependant singleton creation into the constructor, but before it that dependency object will be merged with second `chainalize` arguments object.

That way `chainalize` will chain all singletons together and will allow you to create such chains as many as you want - it's helpful for server applications, you may create such "global" instances for each client request without sharing data between requests processing.

If your initialization sequence will have circular dependencies `chainalize` will throw descriptive error message to help you find out where you have that.

# License

[MIT](LICENSE)
