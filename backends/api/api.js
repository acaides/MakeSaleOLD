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
	api = express(),
	productsController = require('MSProductsController');

api.use(express.json());	// Parse request body JSON.
api.use(express.compress());	// Compress response body JSON.
api.use(express.query());	// Parse query string parameters.
api.use(express.basicAuth());	// Parse HTTP Basic Auth header.
api.use(require('MSAuth.js')());	// Process MakeSale authorization. 

api.map = function MSApiMapper (a, route) {
	route = route || '';
	for (var key in a) {
		switch (typeof a[key]) {
			// { '/path': { ... }}
			case 'object':
				app.map(a[key], route + key);
				break;
			// get: function(){ ... }
			case 'function':
				app[key](route, a[key]);
				break;
		}
	}
};

app.map({
	'/users': {
		get: users.list,
		del: users.del,
		'/:uid': {
			get: users.get,
			'/pets': {
				get: pets.list,
				'/:pid': {
					del: pets.del
				}
			}
		}
}
});

api.listen(3000);