(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm  = this;
        vm.userId  = parseInt($routeParams.uid);
        vm.websiteId  = parseInt($routeParams.wid);
        vm.pageId  = parseInt($routeParams.pid);
        vm.widgetId = parseInt($routeParams.wgid);
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.addWidget = addWidget;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);

        function addWidget(widgetType) {
            vm.widgetId = WidgetService.createWidget(vm.pageId, {"widgetType": widgetType});
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId +
                "/page/" + vm.pageId + "/widget/" + vm.widgetId);
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        vm.userId  = parseInt($routeParams.uid);
        vm.websiteId  = parseInt($routeParams.wid);
        vm.pageId  = parseInt($routeParams.pid);
        vm.widgetId = parseInt($routeParams.wgid);

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();