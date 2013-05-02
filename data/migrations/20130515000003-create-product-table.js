module.exports = {
	up: function (migration, DataTypes, done) {
		migration.createTable('Product',
			{
				id: {
					type: DataTypes.STRING,
					primaryKey: true,
					allowNull: false
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false
				},
				description: DataTypes.TEXT,
				unit: {
					type: DataTypes.STRING,
					allowNull: false
				},
				unitPrice: {
					type: DataTypes.DECIMAL(12, 5),
					allowNull: false
				}
			}
		);

		migration.addIndex('Product', [ 'name' ]);
		
		done();
	},

	// This migration cannot be automatically reverted.
	down: function (migration, DataTypes, done) { done(); }
};