# assign-stream

[![Build Status](https://travis-ci.org/shinnn/assign-stream.svg?branch=master)](https://travis-ci.org/shinnn/assign-stream)
[![Build status](https://ci.appveyor.com/api/projects/status/cvrigoevalmbny44?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/assign-stream)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/assign-stream.svg)](https://coveralls.io/r/shinnn/assign-stream)
[![Dependency Status](https://david-dm.org/shinnn/assign-stream.svg)](https://david-dm.org/shinnn/assign-stream)
[![devDependency Status](https://david-dm.org/shinnn/assign-stream/dev-status.svg)](https://david-dm.org/shinnn/assign-stream#info=devDependencies)

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

[![NPM version](https://badge.fury.io/js/assign-stream.svg)](https://www.npmjs.com/package/assign-stream)

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install assign-stream
```

## API

```javascript
var assign = require('assign-stream');
```

### assign([*target*,] [*callback*])

*target*: any value without `null` (`{}` by default)  
*callback*: `Function`  
Return: `Object` ([stream.Writable](http://nodejs.org/api/stream.html#stream_class_stream_writable_1))

It returns a writable stream that assigns enumerable own properties of chunk objects to the target object using [`Object.assign()`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign).

```javascript
var assign = require('assign-stream');
var array = require('stream-array'); // npm install stream-array

var target = {baz: 2};

array([{foo: 0, bar: 1}, {qux: 3}]);
.on('end', function() {
  target; //=> {foo: 0, bar: 1, baz: 2, qux: 3}
});

arrayStream.pipe(assign());
```

Target object is optional.

```javascript
var assign = require('assign-stream');

// this._target is an internal property to keep target object
assign
.on('finish', function() {
  this._target; //=> {}
})
.end();
```

#### callback(target)

You can specify a function to be called on `finish` event. it will be called with the target object.

```javascript
var assign = require('assign-stream');

assign(function(target) {
  target; //=> [0, 1, 2]
}).end([0, 1, 2]);

assign([0, 1, 2], function(target) {
  target; //=> [0, 1, 2]
}).end();
```

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
