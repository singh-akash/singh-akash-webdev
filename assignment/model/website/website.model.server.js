module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        setModel: setModel,
        createWebsiteForUser: createWebsiteForUser,
        deletePageRef: deletePageRef,
        deleteWebsite: deleteWebsite,
        deleteUserWebsites: deleteUserWebsites,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        updateWebsite: updateWebsite
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return WebsiteModel
                .create(website)
                .then(function (newWebsite) {
                        return model.userModel
                            .findUserById(userId)
                            .then(function (user) {
                                newWebsite._user = user._id;
                                newWebsite.save();
                                user.websites.push(newWebsite);
                                user.save();
                                return newWebsite;
                            }, function (error) {
                                console.log(error);
                            });
                    },
                    function (error) {
                        console.log(error);
                    }
                );
    }

    function deleteWebsite(websiteId) {
        return new Promise(function (success, err) {
            WebsiteModel
                .findById(websiteId)
                .then(function (website) {
                        var userId = website._user;
                        WebsiteModel
                            .remove({ _id: websiteId })
                            .then(function (status) {
                                model
                                    .userModel
                                    .deleteWebsiteRef(userId, websiteId)
                                    .then(function (user) {
                                        model
                                            .pageModel
                                            .deleteWebsitePages(websiteId)
                                            .then(function (status) {
                                                success(200);
                                            }, function (error) {
                                                err(error);
                                            });
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

    function deleteUserWebsites(userId) {
        return new Promise(function (success, err) {
            WebsiteModel
                .find({ _user: userId })
                .then(function (websites) {
                    for (var i = 0; i < websites.length; i++) {
                        var websiteId = websites[i]._id;
                        WebsiteModel
                            .remove({ _id: websiteId })
                            .then(function (status) {
                                success(200);
                            }, function (error) {
                                err(error);
                            });
                        model
                            .pageModel
                            .deleteWebsitePages(websiteId)
                            .then(function (status) {
                                success(200);
                            }, function (error) {
                                err(error);
                            });
                    }
                    success(200);
                }, function (error) {
                    err(error);
                })
        });
    }

    function deletePageRef(websiteId, pageId) {
        return WebsiteModel.update(
            {
                _id: websiteId
            },
            {
                $pull: {pages: pageId}
            });
    }

    function findAllWebsitesForUser(userId) {
        return model.userModel.findWebsitesForUser(userId);
    }

    function findAllPagesForWebsite(websiteId) {
        return WebsiteModel
            .findById(websiteId)
            .populate("pages", "name")
            .exec();
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel.update(
            {
                _id: websiteId
            },
            {
                $set: website
            }
        );
    }
};