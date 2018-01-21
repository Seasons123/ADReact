/*!
 * enquire
 * Copyright(c) 2012 Andrew Keig <andrew.keig@gmail.com>
 * MIT Licensed
 */

/* dependencies */
var path = require('path');
var lib = require(path.join(__dirname, './lib'));
var paths = [];

/* library version */
exports.version = '0.0.1';

/* api */
exports.paths = paths;

exports.register = function (environment, path) {
    return lib.register(environment, path, paths);
}

exports.load = function (module_request, environment) {
    return lib.load(module_request, environment, paths);
}
