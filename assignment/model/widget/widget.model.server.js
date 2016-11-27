module.exports = function () {
    var model = {}
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        deleteWidget: deleteWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        reorderWidget: reorderWidget,
        setModel: setModel,
        updateWidget: updateWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return WidgetModel
                .create(widget)
                .then(function (newWidget) {
                        return model.pageModel
                            .findPageById(pageId)
                            .then(function (page) {
                                newWidget._page = page._id;
                                newWidget.save();
                                page.widgets.push(newWidget);
                                page.save();
                                return newWidget;
                            }, function (error) {
                                console.log(error);
                            });
                    },
                    function (error) {
                        console.log(error);
                    }
                );
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove({
            _id: widgetId
        });
    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId);
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function reorderWidget(pageId, start, end) {
        return model.pageModel
                .findPageById(pageId)
                .then(
                    function(page){
                        var widget = page.widgets.splice(start,1)[0];
                        page.save();
                        page.widgets.splice(end, 0, widget);
                        return page.save();
                    },
                    function(error){
                        console.log(error);
                    }
                );
    }

    function setModel(_model) {
        model = _model;
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel.update(
            {
                _id: widgetId
            },
            {
                $set: widget
            }
        );
    }
};