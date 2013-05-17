module.exports.bind = function bindV1 (app) {
    var express = require('express'),
        impl = require('swagger-node-express'),
        _ = require('lodash'),
        controllers = require('./controllers'),
        v1 = express();

    // Attach the impl to the app and setup swagger handling.
    app.use('/v1', v1);
    impl.setAppHandler(v1);
    impl.config = require('./config.json');
    impl.configureSwaggerPaths('', '/api-docs', '');
    impl.configure(app.config.baseUrl + '/v1', 'v1');
    impl.utils = require('./utils');
    impl.models = require('./models');

    v1.options('*', function (req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Content-Type', 'application/json; charset=utf-8');
        res.set('Allow', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
        res.send();
    });

    // Bind controllers. 
    controllers.bind(app, impl);

    return v1;
};