exports = function MSAuthMiddlewareConstructor () {
	return function MSAuthMiddlware (req, res, next) {
		// look for processed HTTP Basic Auth
		// if present, use it to create/fetch an access token
		// and embed it in the response 
		// if no present, look for an MS auth header
		//  if present, pull out the access token and lookup the
		//  user authentication, if invalid authenticated = false
		//  if not present, authenticated = false
		//  
		//  the end result of this processing should be a MSAuth object
		//  attached to the req object that looks like this:
		req.MSAuth = {
			authenticated: true,	// always present, true or false
			// all other properties always present if authenticated=true, absent otherwise
			username: 'jeff@beurrage.com',
			accessToken: '550E8400E29B41D4A716446655440000',
			authorites: [
				{
					resource: '/vendors/beurrage/*',
					methods: [ '*' ]
				},
				{
					resource: '/products/beurrage/*',
					methods: [ '*' ]
				},
				{
					resource: '/users/beurrage/*',
					methods: [ 'GET', 'PATCH', 'POST' ]
				}
			]
		};

		next();
	};
};