var _ = require('lodash'),
    controllers = {
        MSConfirmationController: require('./MSConfirmationController'),
        MSProductsController: require('./MSProductsController'),
        MSTokensController: require('./MSTokensController'),
        MSUsersController: require('./MSUsersController')
    };

module.exports.bind = function bindControllers(app, impl) {
    _.forEach(controllers, function (controller, controllerName) {
        controller.bind(app, impl);
    });
};