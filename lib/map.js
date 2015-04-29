var each = require('./each');

/**
* @param string String
* @param separators Array
* @param cb Function (value, type, prev, prevType) return value
* @return String
*/
module.exports = function (string, separators, cb) {
	var array = [];
	var prev = null;
	var prevType = null;

	each(string, separators, function (value, type) {
		var result;

		if(type === 'separator') {
			array.push(value);
		} else {
			result = cb(value, type, prev, prevType);
			array.push(result !== undefined ? result : value);
		}

		if(type !== 'separator') {
			prev = value;
			prevType = type;
		}
	});

	return array.join('');
};
