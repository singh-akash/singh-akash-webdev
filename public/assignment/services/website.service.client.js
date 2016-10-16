(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Twitter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

        var api = {
            createWebsite : createWebsite,
            findWebsiteByUser : findWebsiteByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        };

        return api;

        function createWebsite(userId, website) {

        }

        function findWebsiteByUser(userId) {
            var results = [];
            for (var w in websites) {
                if (websites[w].developerId === userId) {
                    results.push(websites[w]);
                }
            }
            return results;
        }

        function findWebsiteById(websiteId) {
            var results = [];
            for (var w in websites) {
                if (websites[w]._id === websiteId) {
                    results.push(websites[w]);
                }
            }
            return results;
        }

        function updateWebsite(websiteId, website) {

        }

        function deleteWebsite(websiteId) {

        }
    }
})();