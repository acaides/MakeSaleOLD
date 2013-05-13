module.exports = {
	up: function (migration, DataTypes, done) {
		migration.createTable('Token',
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

		migration.addIndex('Token', [ 'name' ]);

		done();
	},

	// This migration cannot be automatically reverted.
	down: function (migration, DataTypes, done) { done(); }
};