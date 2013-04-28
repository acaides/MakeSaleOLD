module.exports = function MSBetaApiConstructor (api) {
    var express = require('express'),
        swagger = require('swagger-node-express'),
        _ = require('lodash'),

        // Bind Sequelize to the MakeSale MySQL database.
        $ = new require('sequelize-mysql').sequelize('MakeSale', 'username', ''),

        beta = express(),   // The beta API.
        $$ = {},    // The MakeSale data model. 

        // Resource controllers
        MSUsersController = require('MSUsersController.js'),
        MSMakersController = require('MSMakersController.js'),
        MSProductsController = require('MSProductsController.js'),

        // Resource models
        resourceModel = {
            User: require('MSUserResourceModel.json'),
            Maker: require('MSMakerResourceModel.json'),
            Product: require('MSProductResourceModel.json')
        },

        // ORM 
        MSUserORM = require('MSUserORM.js'),
        MSMakerORM = require('MSMakerORM.js'),
        MSProductORM = require('MSProductORM.js');

    // Bind the models to the db and compose the data model. 
    _.extend($$, MSUserORM.bind($));
    _.extend($$, MSMakerORM.bind($));
    _.extend($$, MSProductORM.bind($));

    // Attach the beta API to the api service and setup swagger handling.
    api.use('/beta', beta);
    swagger.setAppHandler(beta);

    // Bind resource controllers to the beta API and the data model.
    MSUsersController.bind(swagger, $$);
    MSMakersController.bind(swagger, $$);
    MSProductsController.bind(swagger, $$);

    swagger.configure('http://api.makesale.co', 'beta');

    //swagger.addValidator(function MSExampleValidator (req, path, httpMethod) {});
    swagger.addModels(resourceModel);
};