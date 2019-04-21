# chainalize

> Refactoring tool for global instances

_**This project is a work in progress**_

`chainalize` is a small tool which helps you take control over ["singletons"](https://en.wikipedia.org/wiki/Singleton_pattern) in your application.

Singletons are globally available instances and in Node.js their use may lead to big problems.

Client-side app development is a sample case scenario when you may set traps in your project. You may write your app in React, export singletons here and there and everything will be ok until you decide to move to SSR.

Since the moment you decide to implement SSR, your app becomes a hybrid app. That means it runs either on a single server and on clients and now you need to understand how Node.js works.

Node.js hoist your app in memory and let client requests run through that app in machines RAM. You may use for example some cookie module which always exports single instance. It will lead to the problem when one user will log in in one place, and second logged in user will get one's cookies or even session.

That may seem not a problem at all and what you need to do is just don't use singletons except when you definitely want to share some data between different calls to the server. However, there may be cases when the project already have more singletons than you can refactor right away. In such situations, you may consider using `chainalize` which will help you wrap chains of singletons together, and also it will help you avoid circular dependencies.
