module.exports = {
    up: function (migration, DataTypes, done) {
        migration.createTable('Product',
            {
                id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
                name: { type: DataTypes.STRING, allowNull: false },
                description: { type: DataTypes.TEXT },
                unit: { type: DataTypes.STRING, allowNull: false },
                unitPrice: { type: DataTypes.DECIMAL(12, 5), allowNull: false },
                createdAt: { type: DataTypes.DATE, allowNull: false },
                updatedAt: { type: DataTypes.DATE, allowNull: false }
            }
        );

        migration.addIndex('Product', [ 'name' ]);

        done();
    },

    // This migration cannot be automatically reverted.
    down: function (migration, DataTypes, done) { done(); }
};