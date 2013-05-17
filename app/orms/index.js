var _ = require('lodash'),
    orms = {
        MSConfirmationORM: require('./MSConfirmationORM'),
        MSProductORM: require('./MSProductORM'),
        MSTokenORM: require('./MSTokenORM'),
        MSUserORM: require('./MSUserORM')
    };

module.exports.bind = function bindOrms($) {
    var $$ = {};

    _.forEach(orms, function (orm, ormName) {
        _.extend($$, orm.bind($));
    });

    return $$;
};