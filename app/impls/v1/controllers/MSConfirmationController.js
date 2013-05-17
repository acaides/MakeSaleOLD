module.exports.bind = function MSConfirmationControllerBinder (app, impl) {
    var swagger = require('swagger-node-express'),
        _ = require('lodash'),
        passwordHash = require('password-hash'),
        MSConfirmationType = impl.config.definitions.MSConfirmationType,
        MSUserState = impl.config.definitions.MSUserState;

    // confirm
    impl.addPost({
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
            var code = req.params.confirmationCode;

            app.$$.Confirmation.find({ where: { code: code } })
                .success(function (confirmation) {
                    var action = JSON.parse(confirmation.action),
                        userId = action.userId;

                    switch(confirmation.type) {
                        case MSConfirmationType.USER_ACTIVATION:
                            app.$.query('UPDATE `User` SET `state`=\'' + MSUserState.ACTIVE + '\', `updatedAt`= NOW() WHERE `id`=\'' + userId + '\';')
                                .success(function () {
                                    confirmation.destroy();
                                    res.json({ msg: 'User successfully activated.' });
                                })
                                .error(function () {
                                    res.json({ msg: 'Unable to confirm User activation.' });
                                });
                            break;
                        case MSConfirmationType.USER_DELETION:
                            app.$.query('UPDATE `User` SET `state`=\'' + MSUserState.DELETED + '\', `updatedAt`= NOW() WHERE `id`=\'' + userId + '\';')
                                .success(function (user) {
                                    confirmation.destroy();
                                    res.json({ msg: 'User successfully deleted.' });
                                })
                                .error(function () {
                                    res.json({ msg: 'Unable to confirm User activation.' });
                                });
                            break;
                        case MSConfirmationType.USER_UPDATE:
                            res.json({ msg: 'User updates not yet supported.' });
                            break;
                    }
                })
                .error(function (err) {
                    res.json(err);
                });
            }
    });
};