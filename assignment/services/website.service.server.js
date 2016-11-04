module.exports = function(app) {

    var websites = [
        { "_id": 123, "name": "Facebook",    "developerId": 456 },
        { "_id": 234, "name": "Twitter",     "developerId": 456 },
        { "_id": 456, "name": "Gizmodo",     "developerId": 456 },
        { "_id": 567, "name": "Tic Tac Toe", "developerId": 123 },
        { "_id": 678, "name": "Checkers",    "developerId": 123 },
        { "_id": 789, "name": "Chess",       "developerId": 234 }
    ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = parseInt(req.params.userId);
        website._id = (new Date()).getTime();
        website.developerId = userId;
        websites.push(website);
        res.send(websites);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = parseInt(req.params.userId);
        var results = [];
        for (var w in websites) {
            if (websites[w].developerId === userId) {
                results.push(websites[w]);
            }
        }
        res.json(results);
    }

    function findWebsiteById(req, res) {
        var websiteId = parseInt(req.params.websiteId);
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = parseInt(req.params.websiteId);
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites[w] = website;
                res.sendStatus(200);
                return;
            }
        }
        res.send('0');
    }

    function deleteWebsite(req, res) {
        var websiteId = parseInt(req.params.websiteId);
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                websites.splice(parseInt(w), 1);
                res.sendStatus(200);
                return;
            }
        }
        res.send('0');
    }
};