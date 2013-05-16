module.exports = {
    up: function (migration, DataTypes, done) {
        migration.createTable('User',
            {
                id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
                state: { type: DataTypes.INTEGER, allowNull: false },
                name: { type: DataTypes.STRING, allowNull: false },
                email: { type: DataTypes.STRING, allowNull: false },
                password: { type: DataTypes.TEXT, allowNull: false },
                createdAt: { type: DataTypes.DATE, allowNull: false },
                updatedAt: { type: DataTypes.DATE, allowNull: false }
            }
        );

        migration.addIndex('User', [ 'email' ]);

        done();
    },

    // This migration cannot be automatically reverted.
    down: function (migration, DataTypes, done) { done(); }
};