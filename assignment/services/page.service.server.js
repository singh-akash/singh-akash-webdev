module.exports = function(app, model) {

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        model
            .pageModel
            .createPage(websiteId, page)
            .then(
                function (newPage) {
                    res.send(newPage);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (website) {
                    res.send(website.pages);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        model
            .pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.send(page);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;
        model
            .pageModel
            .updatePage(pageId, page)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        model
            .pageModel
            .deletePage(pageId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            );
    }
};