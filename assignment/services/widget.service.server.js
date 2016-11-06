module.exports = function(app) {

    var widgets = [
        { "_id": 123, "widgetType": "HEADER", "pageId": 321, "size": 2, "text": "GIZMODO" },
        { "_id": 124, "widgetType": "HEADER", "pageId": 432, "size": 2, "text": "GIZMODO" },
        { "_id": 234, "widgetType": "HEADER", "pageId": 321, "size": 4, "text": "Lorem ipsum" },
        { "_id": 345, "widgetType": "IMAGE", "pageId": 321, "width": "100%",
            "url": "http://lorempixel.com/400/200/" },
        { "_id": 457, "widgetType": "HTML", "pageId": 432, "text": "<p>Atem</p>" },
        { "_id": 456, "widgetType": "HTML", "pageId": 321, "text": "<p>Lorem ipsum</p>" },
        { "_id": 567, "widgetType": "HEADER", "pageId": 321, "size": 4, "text": "Lorem ipsum" },
        { "_id": 678, "widgetType": "YOUTUBE", "pageId": 321, "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": 789, "widgetType": "HTML", "pageId": 321, "text": "<p>Lorem ipsum</p>" }
    ];

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put('/api/page/:pageId/widget', sortWidgets);

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = parseInt(req.params.pageId);
        widget._id = (new Date()).getTime();
        widget.pageId = pageId;
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = parseInt(req.params.pageId);
        var results = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                results.push(widgets[w]);
            }
        }
        res.json(results);
    }

    function findWidgetById(req, res) {
        var widgetId = parseInt(req.params.widgetId);
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = parseInt(req.params.widgetId);
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets[w] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.send('0');
    }

    function deleteWidget(req, res) {
        var widgetId = parseInt(req.params.widgetId);
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(parseInt(w), 1);
                res.sendStatus(200);
                return;
            }
        }
        res.send('0');
    }

    function deleteWidget(req, res) {
        var widgetId = parseInt(req.params.widgetId);
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(parseInt(w), 1);
                res.sendStatus(200);
                return;
            }
        }
        res.send('0');
    }

    function sortWidgets(req, res) {
        var pageId = parseInt(req.params.pageId);
        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);

        // Find and store start position in widgets array
        var spliceIndex = 0;
        var occurrences = 0;
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                if (occurrences === start) {
                    spliceIndex = parseInt(w);
                    break;
                }
                else {
                    occurrences++;
                }
            }
        }

        // Find end position in widgets array
        // Update positions
        occurrences = 0;
        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                if (occurrences === end) {
                    widgets.splice(parseInt(w), 0, widgets.splice(spliceIndex, 1)[0]);
                    break;
                }
                else {
                    occurrences++;
                }
            }
        }
        res.sendStatus(200);
    }
};