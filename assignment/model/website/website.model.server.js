module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        setModel: setModel,
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
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
        return WebsiteModel.remove({
            _id: websiteId
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