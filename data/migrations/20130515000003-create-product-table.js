module.exports = {
	up: function (migration, DataTypes, done) {
		migration.createTable('Product',
			{
				name: DataTypes.STRING,
				description: DataTypes.TEXT,
				unit: DataTypes.STRING,
				unitPrice: DataTypes.DECIMAL(12, 5)
			}
		);

		migration.addIndex('Product', ['name']);
		
		done();
	},

	// This migration cannot be automatically reverted.
	down: function (migration, DataTypes, done) { done(); }
};