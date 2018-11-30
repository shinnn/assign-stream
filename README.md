# assign-stream

[![npm version](https://img.shields.io/npm/v/array-find-predecessor.svg)](https://www.npmjs.com/package/array-find-predecessor)
[![Build Status](https://travis-ci.com/shinnn/assign-stream.svg?branch=master)](https://travis-ci.com/shinnn/assign-stream)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/assign-stream.svg)](https://coveralls.io/github/shinnn/assign-stream)

Streaming [`Object.assign()`](http://www.2ality.com/2014/01/object-assign.html)

```javascript
var assign = require('assign-stream');

var target = {foo: 'Hi'};
var assignStream = assign(target);

assignStream.on('finish', function() {
  target; //=> {foo: 'Hello', bar: 'World'}
});

assignStream.write({foo: 'Hello'});
assignStream.write({bar: 'World'});

assignStream.end();
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install assign-stream
```

## API

```javascript
const assignStream = require('assign-stream');
```

### assignStream([*target*,] [*callback*])

*target*: any value except for `null` (`{}` by default)  
*callback*: `Function`  
Return: [`stream.Writable`](https://nodejs.org/api/stream.html#stream_class_stream_writable)

It returns a writable stream that assigns enumerable own properties of chunk objects to the target object using [`Object.assign()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

```javascript
const assignStream = require('assign-stream');
const array = require('stream-array'); // npm install stream-array

const target = {baz: 2};

assignStream([{foo: 0, bar: 1}, {qux: 3}]);
.on('end', () => {
  target; //=> {foo: 0, bar: 1, baz: 2, qux: 3}
});

arrayStream.pipe(assignStream());
```

Target object is optional.

```javascript
const assign = require('assign-stream');

// this._target is an internal property to keep target object
assign
.on('finish', () => {
  this._target; //=> {}
})
.end();
```

#### callback(target)

You can specify a function to be called on `finish` event. it will be called with the target object.

```javascript
const assignStream = require('assign-stream');

assignStream(target => {
  target; //=> [0, 1, 2]
}).end([0, 1, 2]);

assignStream([0, 1, 2], target => {
  target; //=> [0, 1, 2]
}).end();
```

## License

Copyright (c) 2014 - 2018 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
