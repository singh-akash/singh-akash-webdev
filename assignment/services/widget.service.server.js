module.exports = function(app, model) {

    var mime = require('mime');
    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/assignment/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.put('/api/page/:pageId/widget', sortWidgets);
    app.post ('/api/upload', upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(
                function (newWidget) {
                    res.send(newWidget);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (page) {
                    res.send(page.widgets);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgteId = req.params.widgetId;
        model
            .widgetModel
            .findWidgetById(widgteId)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;
        if (widget.type === "YOUTUBE" && !widget.width) {
            widget.width = "100%";
        }
        model
            .widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model
            .widgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function sortWidgets(req, res) {
        var pageId = parseInt(req.params.pageId);
        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);

        // Find and store start position in widgets array
        var replStartIndex = -1;
        var replEndIndex = -1;
        var occurrences = 0;

        for (var w in widgets) {
            if (widgets[w].pageId === pageId) {
                if (occurrences === start) {
                    replStartIndex = parseInt(w);
                    if (replEndIndex != -1) {
                        break;
                    }
                }
                if (occurrences === end) {
                    replEndIndex = parseInt(w);
                    if (replStartIndex != -1) {
                        break;
                    }
                }
                occurrences++;
            }
        }

        widgets.splice(parseInt(replEndIndex), 0, widgets.splice(replStartIndex, 1)[0]);

        res.sendStatus(200);
    }

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        if (!myFile || !myFile.originalname) {
            res.redirect("/assignment/#/user/" + userId +
                "/website/" + websiteId +
                "/page/" + pageId +
                "/widget/" + widgetId);
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets[w].name = originalname;
                widgets[w].width = width;
                widgets[w].url = "/assignment/uploads/" + filename;
                res.redirect("/assignment/#/user/" + userId +
                    "/website/" + websiteId +
                    "/page/" + pageId +
                    "/widget/" + widgetId);
                return;
            }
        }

        res.redirect("");
    }
};