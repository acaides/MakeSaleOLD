module.exports.bind = function MSConfirmationORMBinder ($) {
    var Sequelize = require('sequelize-mysql').sequelize,
        models = {
            Confirmation: $.define('Confirmation', {
                id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
                code: { type: Sequelize.STRING, allowNull: false },
                type: { type: Sequelize.INTEGER, allowNull: false },
                action: { type: Sequelize.TEXT }
            }, { freezeTableName: true })
        };

    return models;
};