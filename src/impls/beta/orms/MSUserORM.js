module.exports.bind = function MSUserORMBinder ($) {
	var Sequelize = require('sequelize-mysql').sequelize,
		models = {
			User: $.define('User', {
				id: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
				state: { type: Sequelize.STRING, allowNull: false },
				name: { type: Sequelize.STRING, allowNull: false },
				email: { type: Sequelize.STRING, allowNull: false },
				password: { type: Sequelize.STRING, allowNull: false }
			}, { freezeTableName: true })
		};

	return models;
};