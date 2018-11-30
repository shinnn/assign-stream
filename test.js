'use strict';

const arrayStream = require('from2-array').obj;
const assign = require('.');
const test = require('tape');

test('assign()', t => {
	t.plan(7);

	const targetObject = {foo: [0, 0], bar: 2};
	const stream = assign(targetObject, obj => {
		t.deepEqual(
			obj,
			{foo: 1, bar: 2, baz: 3},
			'should set property based on the file name, contents and encoding.'
		);
		t.strictEqual(targetObject, obj, 'should directly pass the target object to the callback.');
	});

	stream.write({foo: 1});
	stream.end({baz: 3});

	const targetArray = ['b'];
	arrayStream([['a', 'b', 'c'], {'1': false}, {'1_': true}, false, null, setTimeout])
	.on('end', () => {
		t.deepEqual(targetArray, {
			'0': 'a',
			'1': false,
			'2': 'c',
			'1_': true
		}, 'should regard the second argument as optional.');
	})
	.pipe(assign(targetArray));

	arrayStream([{a: true}, {a: undefined}, {a: undefined}]).pipe(assign(obj => {
		t.deepEqual(
			obj,
			{a: undefined},
			'should use default value when the first argument is not a function.'
		);
	}));

	assign(undefined).on('finish', function() {
		t.deepEqual(
			this._target, // eslint-disable-line no-underscore-dangle
			{},
			'should use default value when the first argument is null or undefined.'
		);
	}).end();

	assign().on('finish', function() {
		t.deepEqual(this._target, {}, 'should work even if it takes no arguments.'); // eslint-disable-line no-underscore-dangle
	}).end();

	t.throws(
		() => assign('string', {}),
		/TypeError.*must be a function/u,
		'should throw a type error when the second argument is not a function.'
	);
});
