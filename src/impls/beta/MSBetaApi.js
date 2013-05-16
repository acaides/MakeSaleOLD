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

        // The beta API.
        beta = express(),

        // resource models
        resourceModel = (function (resourceModels) {
            _.forEach(betaConfig.resourceModels, function (rmPath, rmName) {
                resourceModels.models[rmName] = require.main.require(rmPath);
            });

            return resourceModels;
        })({ models: {} }),

        // The MakeSale data model. 
        $$ = (function ($$) {
            _.forEach(betaConfig.orms, function (ormPath, ormName) {
                _.extend($$, require.main.require(ormPath).bind($));
            });

            return $$;
        })({});

    // Attach the beta API to the api service and setup swagger handling.
    api.use('/beta', beta);
    swagger.setAppHandler(beta);

    // Bind controllers. 
    _.forEach(betaConfig.controllers, function (cPath, cName) {
        require.main.require(cPath).bind(swagger, $, $$);
    });

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