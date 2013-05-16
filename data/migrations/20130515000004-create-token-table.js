module.exports = {
    up: function (migration, DataTypes, done) {
        migration.createTable('Token',
            {
                id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
                name: { type: DataTypes.STRING, allowNull: false },
                description: { type: DataTypes.TEXT },
                createdAt: { type: DataTypes.DATE, allowNull: false },
                updatedAt: { type: DataTypes.DATE, allowNull: false }
            }
        );

        migration.addIndex('Token', [ 'name' ]);

        done();
    },

    // This migration cannot be automatically reverted.
    down: function (migration, DataTypes, done) { done(); }
};