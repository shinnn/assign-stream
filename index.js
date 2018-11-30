/*!
* assign-stream | MIT (c) Shinnosuke Watanabe
* https://github.com/shinnn/assign-stream
*/
'use strict';

var inherits = require('inherits');
var objectAssign = require('object-assign');
var Writable = require('readable-stream').Writable;

function AssignStream(target, cb) {
	if (!(this instanceof AssignStream)) {
		return new AssignStream(target, cb);
	}

	if (typeof target === 'function') {
		cb = target;
		target = {};
	} else {
		target = target || {};
	}

	this._target = target;

	Writable.call(this, {objectMode: true});

	if (cb) {
		if (typeof cb !== 'function') {
			throw new TypeError(cb + ' is not a function. Second argument must be a function.');
		}

		this.on('finish', function() {
			cb(target);
		});
	}
}

inherits(AssignStream, Writable);
module.exports = AssignStream;

AssignStream.prototype._write = function(source, enc, done) {
	objectAssign(this._target, source);
	done();
};
