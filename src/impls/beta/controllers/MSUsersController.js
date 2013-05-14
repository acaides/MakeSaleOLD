module.exports.bind = function MSUsersControllerBinder (api, $, $$) {
    var swagger = require('swagger-node-express'),
        _ = require('lodash'),
        uuid = require('uuid'),
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
            notes: 'Called by an application on behalf of a new user in order to create a MakeSale account.',
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
                        password: passwordHash.generate(userSpec.password)
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

            $$.User.findAll({ attributes: [ 'id', 'name', 'email', 'createdAt', 'updatedAt' ] })
                .success(function (users) {
                    res.json(users);
                })
                .error(function (err) {
                    res.send(err);
                });
        }
    });
};