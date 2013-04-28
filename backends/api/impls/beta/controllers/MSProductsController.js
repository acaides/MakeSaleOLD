module.exports = function MSProductsControllerConstructor (api) {
    var swagger = require('swagger-node-express'),
        _ = require('lodash'),
        offsetQueryParamSpec = swagger.queryParam(
            // name:
            'offset',
            // description:
            'The index of the first Product in the list to be included in the response.',
            // dataType:
            'number',
            // required:
            false,
            // allowMultiple:
            false,
            // allowableValues:
            {
                valueType: 'RANGE',
                min: 0
            },
            // defaultValue:
            0
        ),
        offsetQueryParamError = swagger.errors.invalid('offset'),

        limitQueryParamSpec = swagger.queryParam(
            // name:
            'limit',
            // description:
            'The maximum number of Products to include in the response.',
            // dataType:
            'number',
            // required:
            false,
            // allowMultiple:
            false,
            // allowableValues:
            {
                valueType: 'RANGE',
                min: 1,
                max: 50
            },
            // defaultValue:
            10
        ),
        limitQueryParamError = swagger.errors.invalid('limit'),

        validatePagingParams = function MSProductsControllerPagingParamsValidator (req) {
            if(req.params.limit) {
                if(req.params.limit <= 0 || req.params.limit > 50) {
                    throw limitQueryParamError;
                }
            } else {
                req.params.limit = 10;
            }

            if(req.params.offset) {
                if(req.params.offset <= 0 || req.params.offset > 50) {
                    throw offsetQueryParamError;
                }
            } else {
                req.params.offset = 0;
            }
        },

        fieldsQueryParamSpec = swagger.queryParam(
            // name:
            'fields',
            // description:
            'Limit fields of Products in the response to only those specified in a comma-separated list.',
            // dataType:
            'string',
            // required:
            false,
            // allowMultiple:
            true
        ),
        fieldsQueryParamError = swagger.errors.invalid('fields'),
        validateFieldsParam = function MSProductsControllerFieldsParamValidator (req) {

        };

    // Setup "createProducts"
    api.addPost({
        spec: {
            description: 'Create multiple new Products in the User\'s writable scope.',
            path: '/products',
            notes: 'Creates a new Product in the User\'s writable scope for each specifed in the request list.',
            summary: 'Create Multiple Products',
            method: 'GET',
            params: [
                swagger.bodyParam(
                    // name:
                    'newProductsList',
                    // description:
                    'A List of new Products to be created.',
                    // dataType:
                    'List'
                )
            ],
            responseClass: 'List',
            errorResponses: [ offsetQueryParamError, limitQueryParamError, fieldsQueryParamError ],
            nickname : 'createProducts'
        },

        action: function MSProductsControllerRetrieveProductsList (req, res) {

        }
    });

    // Setup "retrieveProductsList"
    api.addGet({
        spec: {
            description: 'Retrieve a list of Products in the User\'s scope.',
            path: '/products',
            notes: 'Returns a list of Products visible to the user, paged and optionally filtered.',
            summary: 'List Products',
            method: 'GET',
            params: [
                _.cloneDeep(offsetQueryParamSpec),
                _.cloneDeep(limitQueryParamSpec),
                _.cloneDeep(fieldsQueryParamSpec),
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
            errorResponses: [ offsetQueryParamError, limitQueryParamError, fieldsQueryParamError ],
            nickname : 'retrieveProductsList'
        },

        action: function MSProductsControllerRetrieveProductsList (req, res) {
            validatePagingParams(req);
            validateFieldsParam(req);

        }
    });

    // Setup "updateProducts"
    api.addPut({});

    // Setup "deleteProducts"
    api.addDelete({});
};