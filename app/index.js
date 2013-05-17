var nodemailer = require('nodemailer'),
    _ = require('lodash'),
    express = require('express'),
    listeningPortNumber = 3000,
    sm = require('sequelize-mysql'),
    Sequelize = sm.sequelize,
    MySQL = sm.mysql,
    app = express();

// Attach app configuration.
app.config = require('config');

// Bind Sequelize to the MakeSale MySQL database.
app.$ = new Sequelize(
    app.config.database.name,
    app.config.database.user,
    app.config.database.password
);

// Bind the MakeSale data model to the db. 
app.$$ = require('./orms').bind(app.$);

// Setup mail transport and attach to the API root.
app.mailTransport = nodemailer.createTransport.apply(this, app.config.mailTransportSetup);

// Setup some basic middleware used by all impls
app.use(express.bodyParser());  // Parse request body JSON.
app.use(express.compress());    // Compress response body JSON.
app.use(express.query());       // Parse query string parameters.
app.disable('x-powered-by');    // Disable express advertising. 

// Attach impls.
_.forEach(app.config.impls, function (implName) {
    require('./impls/' + implName).bind(app).disable('x-powered-by');
});

// Determine the port number to listen for incomming requests.
listeningPortNumber = process.env.PORT || app.config.portNumber;

console.log('listening on port ' + listeningPortNumber);
app.listen(listeningPortNumber);