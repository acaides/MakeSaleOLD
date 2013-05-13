module.exports = {
	up: function (migration, DataTypes, done) {
		migration.createTable('Maker',
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
				legalName: DataTypes.STRING,
				description: DataTypes.TEXT,
				createdAt: {
					type: DataTypes.DATE,
					allowNull: false
				},
				updatedAt: {
					type: DataTypes.DATE,
					allowNull: false
				}
			}
		);

		migration.addIndex('Maker', [ 'name' ]);
		
		done();
	},

	// This migration cannot be automatically reverted.
	down: function (migration, DataTypes, done) { done(); }
};