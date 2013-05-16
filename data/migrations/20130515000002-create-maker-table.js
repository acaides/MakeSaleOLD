module.exports = {
    up: function (migration, DataTypes, done) {
        migration.createTable('Maker',
            {
                id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
                name: { type: DataTypes.STRING, allowNull: false },
                legalName: { type: DataTypes.STRING, allowNull: false },
                description: { type: DataTypes.TEXT },
                createdAt: { type: DataTypes.DATE, allowNull: false },
                updatedAt: { type: DataTypes.DATE, allowNull: false }
            }
        );

        migration.addIndex('Maker', [ 'name' ]);

        done();
    },

    // This migration cannot be automatically reverted.
    down: function (migration, DataTypes, done) { done(); }
};