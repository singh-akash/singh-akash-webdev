(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
    }

    function NewWidgetController($routeParams, WidgetService) {
        var vm = this;
    }

    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;
    }
})();