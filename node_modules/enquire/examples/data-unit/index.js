
exports.save_user = function (user, callback) {
    if (user === null) {
        callback(new Error("Error saving user"));
        return;
    }
    callback(null);
    return;
};