module.exports = function(app) {

    var pages = [
        { "_id": 321, "name": "Post 1", "websiteId": 456 },
        { "_id": 432, "name": "Post 2", "websiteId": 456 },
        { "_id": 543, "name": "Post 3", "websiteId": 456 }
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = parseInt(req.params.websiteId);
        page._id = (new Date()).getTime();
        page.websiteId = websiteId;
        pages.push(page);
        res.send(pages);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = parseInt(req.params.websiteId);
        var results = [];
        for (var p in pages) {
            if (pages[p].websiteId === websiteId) {
                results.push(pages[p]);
            }
        }
        res.json(results);
    }

    function findPageById(req, res) {
        var pageId = parseInt(req.params.pageId);
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = parseInt(req.params.pageId);
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages[p] = page;
                res.sendStatus(200);
                return;
            }
        }
        res.send('0');
    }

    function deletePage(req, res) {
        var pageId = parseInt(req.params.pageId);
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages.splice(parseInt(p), 1);
                res.sendStatus(200);
                return;
            }
        }
        res.send('0');
    }
};