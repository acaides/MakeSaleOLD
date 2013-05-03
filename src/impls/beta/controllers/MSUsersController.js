exports.bind = function MSProductsControllerBinder (api) {
    var swagger = require('swagger-node-express'),
        _ = require('lodash'),
        paging = require('./MSPagingHelper'),
        fields = require('./MSFieldsHelper');

    // Setup "createUsers"
    api.addPost({
        spec: {
            description: 'Create multiple new Users.',
            path: '/users',
            notes: 'Creates new Users.',
            summary: 'Create Multiple Users',
            method: 'POST',
            params: [
                swagger.postParam(
                    // name:
                    'newUsersList',
                    // description:
                    'A List of new Users to be created.',
                    // dataType:
                    'List'
                )
            ],
            responseClass: 'List',
            errorResponses: [
                paging.offsetQueryParamError,
                paging.limitQueryParamError,
                fields.queryParamError
            ],
            nickname : 'createUsers'
        },

        action: function MSUsersControllerCreateUsers (req, res) {
            res.json([]);
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