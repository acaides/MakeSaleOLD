module.exports = {
	up: function (migration, DataTypes, done) {
		migration.createTable('User',
			{
				name: DataTypes.STRING,
				email: DataTypes.STRING,
				password: DataTypes.TEXT
			}
		);

		migration.addIndex('User', ['email']);
		
		done();
	},

	// This migration cannot be automatically reverted.
	down: function (migration, DataTypes, done) { done(); }
};