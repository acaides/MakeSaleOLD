module.exports = {
    up: function (migration, DataTypes, done) {
        migration.createTable('Confirmation',
            {
                id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
                code: { type: DataTypes.STRING, allowNull: false },
                type: { type: DataTypes.INTEGER, allowNull: false },
                action: { type: DataTypes.TEXT },
                createdAt: { type: DataTypes.DATE, allowNull: false },
                updatedAt: { type: DataTypes.DATE, allowNull: false }
            }
        );

        migration.addIndex('Confirmation', [ 'code' ]);

        done();
    },

    // This migration cannot be automatically reverted.
    down: function (migration, DataTypes, done) { done(); }
};