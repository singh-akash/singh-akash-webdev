(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (error) {
                    console.error(error);
                });
        }
        init();
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.addWebsite = addWebsite;
        vm.userId = $routeParams['uid'];

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (error) {
                    console.error(error);
                });
        }   
        init();

        function addWebsite(website){
            if (website.name) {
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/");
                    })
                    .error(function (error) {
                        console.error(error);
                    })
            }
            else {
                vm.error = "Please fix the errors in the form";
            }
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        vm.websiteId = $routeParams['wid'];
        vm.userId = $routeParams['uid'];

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                })
                .error(function (error) {
                    console.error(error);
                });
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (error) {
                    console.error(error);
                });
        }
        init();

        function deleteWebsite(){
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/");
                })
                .error(function (error) {
                    console.error(error);
                });
        }

        function updateWebsite(website) {
            if (website.name) {
                WebsiteService
                    .updateWebsite(vm.websiteId, website)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/");
                    })
                    .error(function (error) {
                        console.error(error);
                    });
            }
            else {
                vm.error = "Please fix the errors in the form";
            }
        }
    }
})();