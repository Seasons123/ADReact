
exports.register = function(environment, path, paths) {
    if (environment === '')
        throw new Error('Please provide an environment');

    if (path === '')
        throw new Error('Please provide a path');

    paths[environment] = path;
}

exports.load = function(module_request, environment, paths) {
    var util = require('util');

    if (module_request === '')
        throw new Error('Module requested is empty');

        var env
          , module
          , module_return
          , path;

        env = process.env.NODE_ENV;
        module = module_request;

        if (environment != null)
            env = environment;

        try {
            path = paths[env];
        } catch(e) {
            path = '';
        }

        if (env != null && env !== null && env !== 'null')
            module = [path, module_request, "-", env].join('');

        console.log(' - loading module %s', module);

        try {
            module_return = require(module);
        } catch(err) {
            throw new Error('Module could not be found');
        }

        return module_return;
};