var swagger = require('swagger-node-express');

exports = {
	offsetQueryParamSpec: swagger.queryParam(
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
    offsetQueryParamError: swagger.errors.invalid('offset'),

    limitQueryParamSpec: swagger.queryParam(
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

    limitQueryParamError: swagger.errors.invalid('limit'),

    validateParams: function MSPagingHelperParamsValidator (req) {
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
    }
};