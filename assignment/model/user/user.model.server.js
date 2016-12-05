module.exports = function () {

    var model = {}
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        deleteWebsiteRef: deleteWebsiteRef,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findWebsitesForUser: findWebsitesForUser,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        setModel: setModel,
        updateUser: updateUser
    };
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function deleteUser(userId) {
        return new Promise(function (success, err) {
            UserModel
                .findById(userId)
                .then(function (user) {
                        UserModel
                            .remove({ _id: userId })
                            .then(function (status) {
                                model
                                    .websiteModel
                                    .deleteUserWebsites(userId)
                                    .then(function (status) {
                                        success(200);
                                    }, function (error) {
                                        err(error);
                                    });
                            }, function (error) {
                                err(error);
                            });
                    },
                    function (error) {
                        err(error);
                    });
        });
    }

    function deleteWebsiteRef(userId, websiteId) {
        return UserModel.update(
            {
                _id: userId
            },
            {
                $pull: {websites: websiteId}
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

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
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