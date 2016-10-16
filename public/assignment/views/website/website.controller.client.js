(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.websites = WebsiteService.findWebsitesForUser(userId);
    }

    function NewWebsiteController($routeParamas, WebsiteService) {
        var vm = this;
    }

    function EditWebsiteController($routeParamas, WebsiteService) {
        var vm = this;
    }
})();