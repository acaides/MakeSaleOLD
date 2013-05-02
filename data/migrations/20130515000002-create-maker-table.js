module.exports = {
	up: function (migration, DataTypes, done) {
		migration.createTable('Maker',
			{
				name: DataTypes.STRING,
				legalName: DataTypes.STRING,
				description: DataTypes.TEXT
			}
		);

		migration.addIndex('Maker', ['name']);
		
		done();
	},

	// This migration cannot be automatically reverted.
	down: function (migration, DataTypes, done) { done(); }
};