module.exports = {
	up: function (migration, DataTypes, done) {
		migration.createTable('User',
			{
				id: {
					type: DataTypes.STRING,
					primaryKey: true,
					allowNull: false
				},
				state: {
					type: DataTypes.STRING,

					// .ENUM(
					// 	'ACTIVATING',
					// 	'ACTIVE',
					// 	'DELETING',
					// 	'DELETED',
					// 	'DISABLING',
					// 	'DISABLED'
					// ),

					allowNull: false
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false
				},
				password: {
					type: DataTypes.TEXT,
					allowNull: false
				},
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

		migration.addIndex('User', [ 'email' ]);
		
		done();
	},

	// This migration cannot be automatically reverted.
	down: function (migration, DataTypes, done) { done(); }
};