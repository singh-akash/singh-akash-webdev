(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {


        var api = {
            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };

        return api;

        function createWidget(pageId, widget) {
            return $http.post("/api/user/" + pageId + "/website", widget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/user/" + pageId + "/website");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/website/" + widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/website/" + widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/website/" + widgetId);
        }
    }
})();