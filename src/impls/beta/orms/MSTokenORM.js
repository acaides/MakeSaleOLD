module.exports.bind = function MSTokenORMBinder ($) {
    var Sequelize = require('sequelize-mysql').sequelize,
        models = {
            Token: $.define('Token', {
                id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
                name: { type: Sequelize.STRING, allowNull: false },
                description: { type: Sequelize.TEXT }
            }, { freezeTableName: true })
        };

    return models;
};