module.exports.bind = function MSTokenORMBinder ($) {
	var Sequelize = require('sequelize-mysql').sequelize,
		models = {
			Token: $.define('Token', {
				id: Sequelize.STRING,
				name: Sequelize.STRING,
				description: Sequelize.TEXT
			}, { freezeTableName: true })
		};

	return models;
};