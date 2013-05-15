module.exports.bind = function MSUsersControllerBinder (api, $, $$) {
    var swagger = require('swagger-node-express'),
        _ = require('lodash'),
        uuid = require('uuid'),
        jsonPatch = require('json-patch');
        passwordHash = require('password-hash'),
        JaySchema = require('jayschema'),
        betaConfig = require('config').beta,
        js = new JaySchema(),
        resourceModels = {
            MSUser: require.main.require(betaConfig.resourceModels.MSUser),
            MSUserSpec: require.main.require(betaConfig.resourceModels.MSUserSpec)
        },
        paging = require.main.require(betaConfig.utils.MSPagingHelper),
        fields = require.main.require(betaConfig.utils.MSFieldsHelper);

    // createUser
    api.addPost({
        spec: {
            description: 'Create a new User.',
            path: '/users',
            notes: 'Called by an application on behalf of a new user in order to create a MakeSale account. ' +
            'Creates an inactive User immediately, activation subject to email confirmation.',
            summary: 'Create a new User.',
            method: 'POST',
            params: [ swagger.bodyParam('userSpec', 'The specification for the new User to be created.', 'UserSpec') ],
            responseClass: 'User',
            nickname : 'createUser'
        },

        action: function MSUsersControllerCreateUser (req, res) {
            var userSpec = req.body,
                specErrs = js.validate(userSpec, resourceModels.MSUserSpec),
                createNewUser = function (userSpec) {
                    userSpec.id = uuid.v4().toUpperCase().replace(/-/g, '');

                    $$.User.create({
                        id: userSpec.id,
                        name: userSpec.name,
                        email: userSpec.email,
                        password: passwordHash.generate(userSpec.password),
                        state: 'ACTIVATING'
                    }).success(function (user) {
                        user.id = userSpec.id;
                        delete user.password;
                        res.json(user);
                    }).error(function (err) {
                        res.json(err);
                    });
                };

            if(specErrs && specErrs.length > 0) {
                // The passed UserSpec was invalid.
                res.json(specErrs);
            } else {
                // The passed UserSpec was syntactically correct, validate data.
                // First, check for an existing User with the specified email.
                $$.User.find({ where: { email: userSpec.email }})
                    .success(function (user) {
                        if(user) {
                            res.json({ error: 'An existing MakeSale user is already registered with that email.' });
                        } else {
                            // Then, do basic checks on user name and password validity.
                            if(userSpec.name.length === 0) {
                                res.json({ error: 'User names cannot be empty.' });
                            } else if(userSpec.password.length < 8) {
                                res.json( { error: 'User passwords must be at least 8 characters long.'});
                            } else {
                                createNewUser(userSpec);
                            }
                        }
                    })
                    .error(function (err) {
                        res.json(err);
                    });
            }
        }
    });

    // confirmUserAction
    api.addPost({
        spec: {
            path: '/users/{userId}/confirmation/{confirmationCode}',
            nickname: 'confirmUserAction',
            description: 'Confirm a pending action on the specified user.',
            notes: 'Called by an application to confirm the specified action on the specified user.',
            summary: 'Confirm an action that modifies the User state.',
            method: 'POST',
            params: [ 
                swagger.pathParam(
                    'userId',
                    'The unique identifier for the User to be marked for deletion.',
                    'string'
                ),
                swagger.pathParam(
                    'confirmationCode',
                    'The code, passed privately to the human user, assocaited with the action to be confirmed.',
                    'string'
                )
            ],
            responseClass: 'User',
            errorResponss: [ /* bad verification token, out of time, etc */ ]
        },

        action: function MSUsersControllerConfirmUserAction (req, res) {
            res.json({});           
        }
    });

    // updateUser
    api.addPatch({
        spec: {
            path: '/users/{userId}',
            nickname: 'updateUser',
            description: 'Update details of the specified User.',
            notes: 'Marks the User for update. Final updates subject to email confirmation.',
            summary: 'Update User',
            method: 'PATCH',
            params: [
                swagger.pathParam(
                    'userId',
                    'The unique identifier for the User to be marked for deletion.',
                    'string'
                ),
                swagger.bodyParam('userPatch', 'The modifications to be applied to the specified User', 'JsonPatch')
            ],
            errorResponses: []
        },
        action: function MSUsersControllerUpdateUser (req, res) {
            var userId = req.params.userId,
                userPatch = req.body;

            $.query('UPDATE `User` SET `state`=\'UPDATING\', `updatedAt`= NOW() WHERE `id`=\'' + userId + '\';')
            .success(function() {
                res.json({ msg: 'Confirming User update.' });
            })
            .error(function (err) {
               res.json(err);
               // res.json({ msg: 'Unable to mark specified User for update.' });
            });

            // $$.User.find({ where: { id: userId }})
            // .success(function (user) {
            //     jsonPatch.apply(user, userPatch);
            //     user.save()               
            // })
            // .error(function (err) {
            //     res.json(err);
            // });
        }
    });

    api.addDelete({
        spec: {
            path: '/users/{userId}',
            nickname: 'deleteUser',
            description: 'Delete a User from the User\'s scope.',
            notes: 'Marks the User for deletion. Final deletion subject to email confirmation.',
            summary: 'Delete User',
            method: 'DELETE',
            params: [
                swagger.pathParam(
                    'userId',
                    'The unique identifier for the User to be marked for deletion.', 
                    'string'
                )
            ],
            errorResponses: []
        },
        action: function MSUsersControllerDeleteUser (req, res) {
            var userId = req.params.userId;

            $.query('UPDATE `User` SET `state`=\'DELETING\', `updatedAt`= NOW() WHERE `id`=\'' + userId + '\';')
                .success(function() {
                    res.json({ msg: 'Confirming User deletion.' });
                })
                .error(function (err) {
                   res.json(err);
                   // res.json({ msg: 'Unable to mark specified User for deletion.' });
                });

            // This should work but for some reason it's generating bullshit sql. 
            // $$.User.find({ where: { id: userId }})
            //     .success(function (user) {
            //         if(user) {
            //             user.updateAttributes({ state: 'DELETING' })
            //                 .success(function() {
            //                     res.json({ msg: 'Confirming User deletion.' });
            //                 })
            //                 .error(function (err) {
            //                    res.json(err);
            //                    // res.json({ msg: 'Unable to mark specified User for deletion.' });
            //                 });
            //         } else {
            //             res.json({ err: 'Unable to access specified User.' });
            //         }
            //     })
            //     .error(function (err) {
            //         res.json({ err: 'Unable to access User data.' });
            //     });
        }
    });

    //getUsers
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
            //responseClass: 'List',
            errorResponses: [
                paging.offsetQueryParamError,
                paging.limitQueryParamError,
                fields.queryParamError
            ],
            nickname : 'getUsers'
        },
        action: function MSUsersControllerGetUsers (req, res) {
            paging.validateParams(req);
            fields.validateParam(req);

            $$.User.findAll({ 
                attributes: [ 'id', 'name', 'email', 'createdAt', 'updatedAt', 'state'],
                where: 'state != \'DELETED\''
            })
            .success(function (users) {
                res.json(users);
            })
            .error(function (err) {
                res.send(err);
            });
        }
    });
};