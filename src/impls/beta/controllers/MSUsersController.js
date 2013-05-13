exports.bind = function MSUsersControllerBinder (api, $, $$) {
    var swagger = require('swagger-node-express'),
        _ = require('lodash'),
        paging = require('./MSPagingHelper'),
        fields = require('./MSFieldsHelper');

    // createUser
    api.addPost({
        spec: {
            description: 'Create a new User.',
            path: '/users',
            notes: 'Called by an application on behalf of a new user in order to create a MakeSale account.',
            summary: 'Create a new User.',
            method: 'POST',
            params: [
                swagger.postParam(
                    // name:
                    'newUser',
                    // description:
                    'The new User to be created.',
                    // dataType:
                    'User'
                )
            ],
            responseClass: 'User',
            errorResponses: [
                fields.queryParamError
            ],
            nickname : 'createUser'
        },

        action: function MSUsersControllerCreateUser (req, res) {
            res.json({});
        }
    });

    api.addPost({
        spec: {
            description: 'Verify a newly created User.',
            path: '/verifyUser',
            notes: 'Called by an application to verify a newly-created User using the token provided to the user.',
            summary: 'Verify a new User.',
            method: 'POST',
            params: [ /* the verification token parameter */ ],
            responseClass: 'User',
            errorResponss: [ /* bad verification token, out of time, etc */ ]
        },

        action: function MSUsersControllerVerifyUser (req, res) {

        }
    });

    // Setup "retrieveUsersList"
    api.addGet({
        spec: {
            description: 'Retrieve a list of Users in the User\'s scope.',
            path: '/users',
            notes: 'Returns a list of Users visible to the User, paged and optionally filtered.',
            summary: 'List Users',
            method: 'GET',
            params: [
                _.cloneDeep(paging.offsetQueryParamSpec),
                _.cloneDeep(paging.limitQueryParamSpec),
                _.cloneDeep(fields.queryParamSpec)
            ],
            responseClass: 'List',
            errorResponses: [
                paging.offsetQueryParamError,
                paging.limitQueryParamError,
                fields.queryParamError
            ],
            nickname : 'retrieveUsersList'
        },

        action: function MSUsersControllerRetrieveUsersList (req, res) {
            paging.validateParams(req);
            fields.validateParam(req);
            res.json([]);
        }
    });

    // // Setup "updateProducts"
    // api.addPut({});

    // // Setup "deleteProducts"
    // api.addDelete({});
};