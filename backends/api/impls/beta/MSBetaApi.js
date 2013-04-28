exports.bind = function MSBetaApiBinder (api) {
    var betaConfig = require('config').beta,
        express = require('express'),
        swagger = require('swagger-node-express'),
        _ = require('lodash'),

        // Bind Sequelize to the MakeSale MySQL database.
        $ = new require('sequelize-mysql').sequelize(
            betaConfig.database.name,
            betaConfig.database.user,
            betaConfig.database.password
        ),

        beta = express(),   // The beta API.
        $$ = {},    // The MakeSale data model. 

        // Resource controllers
        // MSUsersController = require('./controllers/MSUsersController.js'),
        // MSMakersController = require('MSMakersController.js'),
        MSProductsController = require.main.require(betaConfig.controllers.MSProductsController),

        // Resource models
        resourceModel = {
            // User: require('MSUserResourceModel.json'),
            // Maker: require('MSMakerResourceModel.json'),
            Product: require.main.require(betaConfig.resourceModels.MSProductResourceModel)
        },

        // ORM 
        // MSUserORM = require('MSUserORM.js'),
        // MSMakerORM = require('MSMakerORM.js'),
        MSProductORM = require.main.require(betaConfig.orms.MSProductORM);

    // // Bind the models to the db and compose the data model. 
    // // _.extend($$, MSUserORM.bind($));
    // // _.extend($$, MSMakerORM.bind($));
    // _.extend($$, MSProductORM.bind($));

    // // Attach the beta API to the api service and setup swagger handling.
    // api.use('/beta', beta);
    // swagger.setAppHandler(beta);

    // // Bind resource controllers to the beta API and the data model.
    // // MSUsersController.bind(swagger, $$);
    // // MSMakersController.bind(swagger, $$);
    // MSProductsController.bind(swagger, $$);

    // swagger.configure('http://api.makesale.co', 'beta');

    // //swagger.addValidator(function MSExampleValidator (req, path, httpMethod) {});
    // swagger.addModels(resourceModel);
};