'use strict';

var arrayStream = require('stream-array');
var assign = require('./');
var test = require('tape');

test('assign()', function(t) {
  t.plan(8);

  t.equal(assign.name, 'AssignStream', 'should have a function name.');

  var targetObject = {foo: [0, 0], bar: 2};
  var stream = assign(targetObject, function(obj) {
    t.deepEqual(
      obj,
      {foo: 1, bar: 2, baz: 3},
      'should set property based on the file name, contents and encoding.'
    );
    t.strictEqual(targetObject, obj, 'should directly pass the target object to the callback.');
  });

  stream.write({foo: 1});
  stream.end({baz: 3});

  var targetArray = ['b'];
  arrayStream([['a', 'b', 'c'], {'1': false}, {'1_': true}, false, null, setTimeout])
  .on('end', function() {
    t.deepEqual(targetArray, {
      '0': 'a',
      '1': false,
      '2': 'c',
      '1_': true
    }, 'should regard the second argument as optional.');
  })
  .pipe(assign(targetArray));

  arrayStream([{a: true}, {a: undefined}, {a: undefined}]).pipe(assign(function(obj) {
    t.deepEqual(
      obj,
      {a: undefined},
      'should use default value when the first argument is not a function.'
    );
  }));

  assign(undefined).on('finish', function() {
    t.deepEqual(
      this._target,
      {},
      'should use default value when the first argument is null or undefined.'
    );
  }).end();

  assign().on('finish', function() {
    t.deepEqual(this._target, {}, 'should work even if it takes no arguments.');
  }).end();

  t.throws(
    assign.bind(null, 'string', {}),
    /TypeError.*must be a function/,
    'should throw a type error when the second argument is not a function.'
  );
});
