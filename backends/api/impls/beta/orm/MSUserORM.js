module.exports = {
	bind: function MSUserORMBinder ($) {
		var models = {
			User: $.define('User', {
				firstName: $.STRING,
				lastName: $.STRING,
				email: $.STRING,
				hashword: $.TEXT
			})
		};

		return models;
	}
};