module.exports.bind = function MSConfirmationControllerBinder (api, $, $$) {
    var swagger = require('swagger-node-express'),
        _ = require('lodash'),
        passwordHash = require('password-hash'),
        betaConfig = require('config').beta,
        MSConfirmationType = betaConfig.definitions.MSConfirmationType;

    // confirm
    api.addPost({
        spec: {
            path: '/confirm/{confirmationCode}',
            nickname: 'confirmUserAction',
            description: 'Confirm a pending action.',
            notes: 'Called by an application to confirm a previously initiated action.',
            summary: 'Confirm an action that requires direct consent from the human user.',
            method: 'POST',
            params: [
                swagger.pathParam(
                    'confirmationCode',
                    'The code, passed privately to the human user, associated with the action to be confirmed.',
                    'string'
                )
            ],
            responseClass: 'Confirmation',
            errorResponss: [ /* bad verification token, out of time, etc */ ]
        },

        action: function MSConfirmationControllerConfirm (req, res) {
            res.json({});
        }
    });
};