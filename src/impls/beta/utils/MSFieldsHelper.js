var swagger = require('swagger-node-express');

module.exports = {
	queryParamSpec: swagger.queryParam(
        // name:
        'fields',
        // description:
        'Limit fields in the response to only those specified in a comma-separated list.',
        // dataType:
        'string',
        // required:
        false,
        // allowMultiple:
        true
    ),
    queryParamError: swagger.errors.invalid('fields'),
    validateParam: function MSFieldsHelperParamValidator (req) {

    }
};