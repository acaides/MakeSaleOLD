module.exports.bind = function MSBetaApiBinder (api) {
    var betaConfig = require('config').beta,
        express = require('express'),
        swagger = require('swagger-node-express'),

        _ = require('lodash'),

        Sequelize = require('sequelize-mysql').sequelize,

        // Bind Sequelize to the MakeSale MySQL database.
        $ = new Sequelize(
            betaConfig.database.name,
            betaConfig.database.user,
            betaConfig.database.password
        ),

        $$ = {},    // The MakeSale data model. 

        beta = express(),   // The beta API.

        // Resource controllers
        MSUsersController = require.main.require(betaConfig.controllers.MSUsersController),
        MSTokensController = require.main.require(betaConfig.controllers.MSTokensController),
        MSProductsController = require.main.require(betaConfig.controllers.MSProductsController),

        // Resource models
        resourceModel = {
            User: require.main.require(betaConfig.resourceModels.MSUserResourceModel),
            Product: require.main.require(betaConfig.resourceModels.MSProductResourceModel)
        },

        // ORM 
        MSUserORM = require.main.require(betaConfig.orms.MSUserORM),
        MSTokenORM = require.main.require(betaConfig.orms.MSTokenORM),
        MSProductORM = require.main.require(betaConfig.orms.MSProductORM);

    // Bind the models to the db and compose the data model. 
    _.extend($$, MSUserORM.bind($));
    _.extend($$, MSTokenORM.bind($));
    _.extend($$, MSProductORM.bind($));

    // Attach the beta API to the api service and setup swagger handling.
    api.use('/beta', beta);
    swagger.setAppHandler(beta);

    // Bind resource controllers. 
    MSUsersController.bind(swagger, $, $$);
    MSTokensController.bind(swagger, $, $$);
    MSProductsController.bind(swagger, $, $$);

    swagger.configure('http://api.makesale.co', 'beta');

    //swagger.addValidator(function MSExampleValidator (req, path, httpMethod) {});
    swagger.addModels(resourceModel);

    return beta;
};