module.exports.bind = function MSProductsControllerBinder (api, $, $$) {
    var swagger = require('swagger-node-express'),
        _ = require('lodash'),
        betaConfig = require('config').beta,
        paging = require.main.require(betaConfig.utils.MSPagingHelper),
        fields = require.main.require(betaConfig.utils.MSFieldsHelper);

    // Setup "createProducts"
    api.addPost({
        spec: {
            description: 'Create multiple new Products in the User\'s writable scope.',
            path: '/products',
            notes: 'Creates a new Product in the User\'s writable scope for each specifed in the request list.',
            summary: 'Create Multiple Products',
            method: 'GET',
            params: [
                swagger.postParam(
                    // name:
                    'newProductsList',
                    // description:
                    'A List of new Products to be created.',
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
            nickname : 'createProducts'
        },

        action: function MSProductsControllerRetrieveProductsList (req, res) {
            res.json([]);
        }
    });

    // getProducts
    api.addGet({
        spec: {
            description: 'Retrieve a list of Products in the User\'s scope.',
            path: '/products',
            notes: 'Returns a list of Products visible to the user, paged and optionally filtered.',
            summary: 'List Products',
            method: 'GET',
            params: [
                _.cloneDeep(paging.offsetQueryParamSpec),
                _.cloneDeep(paging.limitQueryParamSpec),
                _.cloneDeep(fields.queryParamSpec),
                swagger.queryParam(
                    // name:
                    'fromMaker',
                    // description:
                    'Limit response to Products from the specified Maker (by makerId).',
                    // dataType:
                    'string',
                    // required:
                    false,
                    // allowMultiple:
                    true
                )
            ],
            responseClass: 'List',
            errorResponses: [
                paging.offsetQueryParamError,
                paging.limitQueryParamError,
                fields.queryParamError
            ],
            nickname : 'retrieveProductsList'
        },

        action: function MSProductsControllerRetrieveProductsList (req, res) {
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