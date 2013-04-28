module.exports = {
	bind: function MSProductORMBinder ($) {
		var models = {
				Product: $.define('Product', {
					name: $.STRING,
					description: $.TEXT,
					unitPrice: $.DECIMAL(12, 5), // 9999999.99999
					unit: $.STRING
				}),
				ProductOption: $.define('ProductOption', {
					name: $.STRING,
					description: $.TEXT,
					defaultChoice: $.INTEGER
				}),
				ProductOptionChoice: $.define('ProductOptionChoice', {
					name: $.STRING,
					description: $.TEXT,
					unitPriceDelta: $.DECIMAL(12, 5) // 9999999.99999
				})
			};

		// Setup associations
		models.Product.hasMany(models.ProductOption, { as: 'options' });
		models.ProductOption.hasMany(models.ProductOptionChoice, { as: 'choices' });

		return models;
	}
};