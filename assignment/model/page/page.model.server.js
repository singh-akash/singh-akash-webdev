module.exports = function () {
    var model = {}
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        deletePage: deletePage,
        deleteWebsitePages: deleteWebsitePages,
        deleteWidgetRef: deleteWidgetRef,
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
        return new Promise(function (success, err) {
            PageModel
                .findById(pageId)
                .then(function (page) {
                        var websiteId = page._website;
                        PageModel
                            .remove({ _id: pageId })
                            .then(function (status) {
                                model
                                    .websiteModel
                                    .deletePageRef(websiteId, pageId)
                                    .then(function (website) {
                                        model
                                            .widgetModel
                                            .deletePageWidgets(pageId)
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

    function deleteWebsitePages(websiteId) {
        return new Promise(function (success, err) {
            PageModel
                .find({ _website: websiteId })
                .then(function (pages) {
                    for (var i = 0; i < pages.length; i++) {
                        var pageId = pages[i]._id;
                        PageModel
                            .remove({ _id: pageId })
                            .exec()
                            .then(function (status) {
                                success(200);
                            }, function (error) {
                                console.log(error);
                            });
                        model
                            .widgetModel
                            .deletePageWidgets(pageId)
                            .then(function (status) {
                                success(200);
                            }, function (error) {
                                err(error);
                            })
                    }
                    success(200);
                }, function (error) {
                    err(error);
                })
        });
    }

    function deleteWidgetRef(pageId, widgetId) {
        return PageModel.update(
            {
                _id: pageId
            },
            {
                $pull: {widgets: widgetId}
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