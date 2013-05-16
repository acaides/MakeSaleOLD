module.exports.bind = function MSUserORMBinder ($) {
    var Sequelize = require('sequelize-mysql').sequelize,
        models = {
            User: $.define('User', {
                id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
                state: { type: Sequelize.INTEGER, allowNull: false },
                name: { type: Sequelize.STRING, allowNull: false },
                email: { type: Sequelize.STRING, allowNull: false },
                password: { type: Sequelize.STRING, allowNull: false }
            }, { freezeTableName: true })
        };

    return models;
};