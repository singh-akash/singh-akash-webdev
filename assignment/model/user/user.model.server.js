module.exports = function () {

    var model = {}
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findWebsitesForUser: findWebsitesForUser,
        setModel: setModel,
        updateUser: updateUser
    };
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function deleteUser(userId) {
        return UserModel.remove({
            _id: userId
        });
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findWebsitesForUser(userId) {
        return UserModel
            .findById(userId)
            .populate("websites", "name")
            .exec();
    }

    function findUserByUsername(username) {
        return UserModel.findOne({
            username: username
        });
    }

    function updateUser(userId, user) {
        return UserModel.update({
            _id: userId
        },
        {
            $set: user
        });
    }

    function setModel(_model) {
        model = _model;
    }
};