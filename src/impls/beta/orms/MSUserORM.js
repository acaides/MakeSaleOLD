module.exports.bind = function MSUserORMBinder ($) {
	var Sequelize = require('sequelize-mysql').sequelize,
		models = {
			User: $.define('User', {
				firstName: Sequelize.STRING,
				lastName: Sequelize.STRING,
				email: Sequelize.STRING,
				hashword: Sequelize.TEXT
			})
		};

	return models;
};