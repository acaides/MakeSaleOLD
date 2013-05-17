module.exports.bind = function MSProductORMBinder ($) {
	var Sequelize = require('sequelize-mysql').sequelize,
		models = {
			Product: $.define('Product', {
				id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
				name: Sequelize.STRING,
				description: Sequelize.TEXT,
				imgUrl: Sequelize.TEXT,
				unitPrice: Sequelize.DECIMAL(12, 5), // 9999999.99999
				unit: Sequelize.STRING
			}, { freezeTableName: true }),
			ProductOption: $.define('ProductOption', {
				name: Sequelize.STRING,
				description: Sequelize.TEXT,
				defaultChoice: Sequelize.INTEGER
			}, { freezeTableName: true }),
			ProductOptionChoice: $.define('ProductOptionChoice', {
				name: Sequelize.STRING,
				description: Sequelize.TEXT,
				unitPriceDelta: Sequelize.DECIMAL(12, 5) // 9999999.99999
			}, { freezeTableName: true })
		};

	// Setup associations
	models.Product.hasMany(models.ProductOption, { as: 'options' });
	models.ProductOption.hasMany(models.ProductOptionChoice, { as: 'choices' });

	return models;
};