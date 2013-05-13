module.exports.bind = function MSUsersControllerBinder (api, $, $$) {
    var swagger = require('swagger-node-express'),
        _ = require('lodash'),
        betaConfig = require('config').beta,
        uuid = require('uuid'),
        paging = require.main.require(betaConfig.utils.MSPagingHelper),
        fields = require.main.require(betaConfig.utils.MSFieldsHelper);

    // createUser
    api.addPost({
        spec: {
            description: 'Create a new User.',
            path: '/users',
            notes: 'Called by an application on behalf of a new user in order to create a MakeSale account.',
            summary: 'Create a new User.',
            method: 'POST',
            params: [
                swagger.bodyParam(
                    // name:
                    'userSpec',
                    // description:
                    'A specification of a User to be created.',
                    // dataType:
                    'UserSpec'
                )
            ],
            responseClass: 'User',
            nickname : 'createUser'
        },

        action: function MSUsersControllerCreateUser (req, res) {
            var userSpec = req.body;

            userSpec.id = uuid.v4().toUpperCase().replace(/-/g, '');

            $$.User.create({
                id: userSpec.id,
                name: userSpec.name,
                email: userSpec.email,
                password: userSpec.password
            }).success(function (user) {
                user.id = userSpec.id;
                res.json(user);
            }).error(function (err) {
                res.send(err);
            });
        }
    });

    // api.addPost({
    //     spec: {
    //         description: 'Verify a newly created User.',
    //         path: '/verifyUser',
    //         notes: 'Called by an application to verify a newly-created User using the token provided to the user.',
    //         summary: 'Verify a new User.',
    //         method: 'POST',
    //         params: [ /* the verification token parameter */ ],
    //         responseClass: 'User',
    //         errorResponss: [ /* bad verification token, out of time, etc */ ]
    //     },

    //     action: function MSUsersControllerVerifyUser (req, res) {

    //     }
    // });

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
            $$.User.findAll().success(function (users) {
                res.json(users);
            }).error(function (err) {
                res.send(err);
            });
        }
    });
};