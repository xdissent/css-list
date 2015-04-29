var list = {
	/**
	* @param string String
	* @param separators Array
	* @param cb Function (value, type) where type is one of ['separator', 'quote', 'func', null]
	*/
	each: function (string, separators, cb) {
		var i, max, letter;

		var split = false;
		var func = 0;
		var quote = false;
		var escape = false;
		var current = '';
		var type = null;

		for(i = 0, max = string.length; i < max; i++) {
			letter = string[i];

			if (quote) {
				if (escape) {
					escape = false;
				} else if (letter === '\\') {
					escape = true;
				} else if (letter === quote) {
					quote = false;
					type = 'quote';
				}
			} else if (letter === '"' || letter === '\'') {
				quote = letter;
			} else if (letter === '(') {
				func += 1;
			} else if (letter === ')') {
				if (func > 0) {
					func -= 1;
				}
				type = 'func';
			} else if (func === 0) {
				if (separators.indexOf(letter) > -1) {
					split = true;
				}
			}

			if(split) {
				if (current !== '') {
					cb(current.trim(), type);
					current = '';
					type = null;
				}
				cb(letter, 'separator')
				split = false;
			} else {
				current += letter;
			}
		}

		if(current !== '') {
			cb(current.trim(), type);
		}
	},

	/**
	* @param string String
	* @param separators Array
	* @param cb Function (value, type, prev, prevType) return value
	* @return String
	*/
	map: function (string, separators, cb) {
		var array = [];
		var prev = null;
		var prevType = null;

		list.each(string, separators, function (value, type) {
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
	},

	/**
	* @param string String
	* @param separators Array
	* @param last Boolean
	* @return Array
	*/
	split: function (string, separators, last) {
		var array = [];
		var isLastSep = false;

		list.each(string, separators, function (value, type) {
			if(type !== 'separator') {
				array.push(value);
				isLastSep = false;
			} else {
				isLastSep = true;
			}
		});

		if(last && isLastSep) {
			array.push('');
		}

		return array;
	}
};

module.exports = list;
