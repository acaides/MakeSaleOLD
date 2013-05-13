module.exports.bind = function MSUserORMBinder ($) {
	var Sequelize = require('sequelize-mysql').sequelize,
		models = {
			User: $.define('User', {
				id: Sequelize.STRING,
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password: Sequelize.TEXT
			}, { freezeTableName: true })
		};

	return models;
};