var test = require('tape'),
	list = require('..'),
	map = list.map;

test('css-list.map parse', function (t) {
	t.equal(map(' a b ', [' '], function (val, type, prev, prevType) {
		return 'val';
	}), ' val val ');

	t.equal(map(' a, "hello, world!" b ', [' ', ','], function (val, type, prev, prevType) {
		if(type === 'quote') {
			return 'quote';
		}

		if(prevType === 'quote') {
			return prev;
		}
	}), ' a, quote "hello, world!" ');

	t.end();
});