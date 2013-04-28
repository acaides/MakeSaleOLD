var config = require('config'),	// npm install config
	mysql = require('mysql'),	// npm install mysql@2.0.0-alpha7
	dbConnection = mysql.createConnection({
		host: config.database.host,
		user: config.database.user,
		password: config.database.password
	}),
	Memcached = require('memcached'),	// npm install memcached
	memcached = new Memcached(config.cache.serverLocations, config.cache.options),
	solr = require('solr-client'),	// npm install solr-client
	solrClient = solr.createClient(config.search.clientOptions),
	express = require('express'),	// npm install -g express
	swagger = require('swagger-node-express'),
	api = express(),
	betaApi = require('MSBetaApi.js');
//	v1Api = require('MSVersionOneApi.js');

api.use(express.json());	// Parse request body JSON.
api.use(express.compress());	// Compress response body JSON.
api.use(express.query());	// Parse query string parameters.
api.use(express.basicAuth());	// Parse HTTP Basic Auth header.
api.use(require('MSAuth.js')());	// Process MakeSale authorization. 

// Setup api versions
betaApi(api);
//v1Api(api);



// Allowing all CORs, for now
swagger.setHeaders = function setHeaders(res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-API-KEY');
  res.header('Content-Type', 'application/json; charset=utf-8');
};

api.listen(3000);