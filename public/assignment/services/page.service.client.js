(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {


        var api = {
            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };

        return api;

        function createPage(websiteId, page) {
            return $http.post("/api/user/" + websiteId + "/website", page);
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/user/" + websiteId + "/website");
        }

        function findPageById(pageId) {
            return $http.get("/api/website/" + pageId);
        }

        function updatePage(pageId, page) {
            return $http.put("/api/website/" + pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete("/api/website/" + pageId);
        }
    }
})();