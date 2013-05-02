var config = require('config'),
	listeningPortNumber = process.env.PORT || config.portNumber,
	apiConfig = config.api,
	_ = require('lodash'),
	express = require('express'),
	api = express(),
	impls = [];
	// Memcached = require('memcached'),	// npm install memcached
	// memcached = new Memcached(config.cache.serverLocations, config.cache.options),
	// solr = require('solr-client'),	// npm install solr-client
	// solrClient = solr.createClient(config.search.clientOptions),

// Setup some basic middleware used by all impls
api.use(express.json());	// Parse request body JSON.
api.use(express.compress());	// Compress response body JSON.
api.use(express.query());	// Parse query string parameters.
api.disable('x-powered-by');

// this probably belongs in the impls
//api.use(express.basicAuth());	// Parse HTTP Basic Auth header.
//api.use(require('MSAuth.js')());	// Process MakeSale authorization. 

// Require, register, and bind all impls.
_.forEach(apiConfig.impls, function (implName) {
	var impl = require(config[implName].module);
	impls.push(impl);
	impl.bind(api).disable('x-powered-by');
});

console.log('listening on port ' + listeningPortNumber);
api.listen(listeningPortNumber);