var enquire = require('../');
var command = enquire.load('data');

exports.register_user = function (user,  next) {
    command.save_user(user, function (err) {
        if (err) {
            next(new Error());
        }
        next(null, user);
        return;
    });
};