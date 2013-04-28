module.exports = function MSBetaApiConstructor (api) {
    var express = require('express'),
        swagger = require('swagger-node-express'),
        beta = express(),

    // Require beta resource controllers.
    MSProductsController = require('MSProductsController.js'),
    MSUsersController = require('MSUsersController.js'),
    MSMakersController = require('MSMakersController.js');

    // Attach and setup the beta api.
    api.use('/beta', beta);
    swagger.setAppHandler(beta);

    swagger.configure('http://api.makesale.co', 'beta');

    //swagger.addValidator(function MSExampleValidator (req, path, httpMethod) {});
//swagger.addModels(require('MSResourceModel.js')); // Pull in the resource model.
};