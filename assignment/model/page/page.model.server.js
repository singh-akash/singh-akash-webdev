module.exports = function () {
    var model = {}
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        deletePage: deletePage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findPageById: findPageById,
        setModel: setModel,
        updatePage: updatePage
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel
                .create(page)
                .then(function (newPage) {
                        return model.websiteModel
                            .findWebsiteById(websiteId)
                            .then(function (website) {
                                newPage._website = website._id;
                                newPage.save();
                                website.pages.push(newPage);
                                website.save();
                              return newPage;
                            }, function (error) {
                                console.log(error);
                            });
                    },
                    function (error) {
                        console.log(error);
                    }
                );
    }

    function deletePage(pageId) {
        return PageModel.remove({
            _id: pageId
        });
    }

    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }

    function findAllWidgetsForPage(pageId) {
        return PageModel
            .findById(pageId)
            .populate("widgets")
            .exec();
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function setModel(_model) {
        model = _model;
    }

    function updatePage(pageId, page) {
        return PageModel.update(
            {
                _id: pageId
            },
            {
                $set: page
            }
        );
    }
};