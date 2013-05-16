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
        //MSProductsController = require.main.require(betaConfig.controllers.MSProductsController),

        // Resource models
        resourceModel = {
            models: {
                User: require.main.require(betaConfig.resourceModels.MSUser),
                //Product: require.main.require(betaConfig.resourceModels.MSProduct),
                UserSpec: require.main.require(betaConfig.resourceModels.MSUserSpec)
            }
        },

        // ORM 
        MSUserORM = require.main.require(betaConfig.orms.MSUserORM),
        MSTokenORM = require.main.require(betaConfig.orms.MSTokenORM);
        //MSProductORM = require.main.require(betaConfig.orms.MSProductORM);

    // Bind the models to the db and compose the data model. 
    _.extend($$, MSUserORM.bind($));
    _.extend($$, MSTokenORM.bind($));
    //_.extend($$, MSProductORM.bind($));

    // Attach the beta API to the api service and setup swagger handling.
    api.use('/beta', beta);
    swagger.setAppHandler(beta);

    // Bind resource controllers. 
    MSUsersController.bind(swagger, $, $$);
    MSTokensController.bind(swagger, $, $$);
    //MSProductsController.bind(swagger, $, $$);

    swagger.configureSwaggerPaths('', '/api-docs', '');
    swagger.configure(betaConfig.baseUrl, 'beta');
    swagger.addModels(resourceModel);
    // swagger.setHeaders = function setHeaders(res) {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    //     res.header('Access-Control-Allow-Headers', 'Content-Type');
    //     res.header('Content-Type', 'application/json; charset=utf-8');
    // };

    beta.options('*', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Content-Type', 'application/json; charset=utf-8');
        res.set('Allow', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
        res.send();
    });

    return beta;
};