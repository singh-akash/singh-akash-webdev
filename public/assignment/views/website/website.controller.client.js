(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.addWebsite = addWebsite;

        vm.userId = parseInt($routeParams['uid']);
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);

        function addWebsite(website){
            WebsiteService.createWebsite(vm.userId, website);
            $location.url("/user/" + vm.userId + "/website");
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);
        vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
            $location.url("/user/" + vm.userId + "/website/");
        }
    }
})();