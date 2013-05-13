exports.bind = function MSTokensControllerBinder (api, $, $$) {
    var swagger = require('swagger-node-express'),
        _ = require('lodash'),
        paging = require('./MSPagingHelper'),
        fields = require('./MSFieldsHelper');

    // getTokens 
    api.addGet({
        spec: {
            description: 'Get a list of Tokens in the User\'s scope.',
            path: '/tokens',
            notes: 'Returns a list of Tokens associated with the authenticating User, paged and optionally filtered.',
            summary: 'Get Tokens.',
            method: 'GET',
            responseClass: 'List',
            errorResponses: [
                paging.offsetQueryParamError,
                paging.limitQueryParamError,
                fields.queryParamError
            ],
            nickname : 'getTokens'
        },
        action: function MSTokensControllerGetTokens(req, res) {
            res.json([]);
        }
    });

    // getToken
    api.addGet({
        spec: {
            desctiption: 'Get a specific Token in the User\'s scope.',
            path: '/tokens/{tokenId}',
            notes: 'Returns the identified Token associated with the authenticating User.',
            summary: 'Get Token',
            method: 'GET',
            params : [ swagger.pathParam('tokenId', 'The ID of the Token to be retrieved.', 'string') ],
            responseClass: 'Token',
            nickname: 'getToken'
        },
        action: function MSTokensControllerGetToken (req, res) {
            res.json({});
        }
    });

    // createToken
    api.addPost({
        spec: {
            description: 'Create a new Token in the User\'s scope.',
            path: '/tokens',
            notes: 'Creates a new Token associated with the authenticating User.',
            summary: 'Create a Token.',
            method: 'GET',
            params: [
                swagger.postParam(
                    // name:
                    'tokenSpecification',
                    // description:
                    'A specification of the new Token to be created.',
                    // dataType:
                    'TokenSpec'
                )
            ],
            responseClass: 'Token',
            nickname: 'createToken'
        },
        action: function MSTokensControllerCreateToken (req, res) {
            res.json({});
        }
    });

    // deleteToken
    api.addDelete({
        spec: {
            description: 'Delete a Token in the User\'s scope.',
            path: '/tokens/{tokenId}',
            notes: 'Deletes the idenfitied token from the User\'s scope, removing it entirely and immediately revoking any associated authorities.',
            summary: 'Create a Token.',
            method: 'GET',
            params : [ swagger.pathParam('tokenId', 'The ID of the Token to be retrieved.', 'string') ],
            responseClass: 'Token',
            nickname : 'createToken'
        },

        action: function MSTokensControllerDeleteToken (req, res) {
            res.json([]);
        }
    });
};