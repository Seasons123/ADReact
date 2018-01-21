var nStore = require('nstore');

exports.save_user = function (user, callback) {
    var users = nStore.new('data/users.db', function () {
        users.save(user.username, user, function (err) {
            if (err) {
                callback("Error saving user to Nstore");
                return;
            }
            callback(null);
            return;
        });
    });
}