(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.addWebsite = addWebsite;
        vm.userId = parseInt($routeParams['uid']);

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function addWebsite(website){
            if (website.name) {
                WebsiteService.createWebsite(vm.userId, website);
                $location.url("/user/" + vm.userId + "/website/");
            }
            else {
                vm.error = "Website Name cannot be left blank";
            }
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        vm.websiteId = parseInt($routeParams['wid']);
        vm.userId = parseInt($routeParams['uid']);

        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function deleteWebsite(){
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website/");
        }

        function updateWebsite(website) {
            if (website.name) {
                WebsiteService.updateWebsite(vm.websiteId, website);
                $location.url("/user/" + vm.userId + "/website/");
            }
            else {
                vm.error = "Website Name cannot be left blank";
            }
        }
    }
})();