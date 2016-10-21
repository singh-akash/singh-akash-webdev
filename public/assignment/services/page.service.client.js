(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": 321, "name": "Post 1", "websiteId": 456 },
            { "_id": 432, "name": "Post 2", "websiteId": 456 },
            { "_id": 543, "name": "Post 3", "websiteId": 456 }
        ];

        var api = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };

        return api;

        function createPage(websiteId, page) {
            var pageId = parseInt(pages[pages.length - 1]._id) + 1;

            page._id = pageId;
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var results = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    results.push(pages[p]);
                }
            }
            return results;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return JSON.parse(JSON.stringify(pages[p]));
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages[p] = page;
                    break;
                }
            }
        }

        function deletePage(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages.splice(parseInt(p), 1);
                    break;
                }
            }
        }
    }
})();