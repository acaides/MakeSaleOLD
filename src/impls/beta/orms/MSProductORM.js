exports.bind = function MSProductORMBinder ($) {
	var Sequelize = require('sequelize-mysql').sequelize,
		models = {
			Product: $.define('Product', {
				name: Sequelize.STRING,
				description: Sequelize.TEXT,
				imgUrl: Sequelize.TEXT,
				unitPrice: Sequelize.DECIMAL(12, 5), // 9999999.99999
				unit: Sequelize.STRING
			}),
			ProductOption: $.define('ProductOption', {
				name: Sequelize.STRING,
				description: Sequelize.TEXT,
				defaultChoice: Sequelize.INTEGER
			}),
			ProductOptionChoice: $.define('ProductOptionChoice', {
				name: Sequelize.STRING,
				description: Sequelize.TEXT,
				unitPriceDelta: Sequelize.DECIMAL(12, 5) // 9999999.99999
			})
		};

	// Setup associations
	models.Product.hasMany(models.ProductOption, { as: 'options' });
	models.ProductOption.hasMany(models.ProductOptionChoice, { as: 'choices' });

	return models;
};