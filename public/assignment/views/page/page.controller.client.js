(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (error) {
                    console.error(error);
                });
        }
        init();
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.addPage = addPage;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (error) {
                    console.error(error);
                });
        }
        init();

        function addPage(page){
            if (page && page.name) {
                PageService
                    .createPage(vm.websiteId, page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
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

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (error) {
                    console.error(error);
                });
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
                .error(function (error) {
                    console.error(error);
                });
        }
        init();

        function deletePage(){
            PageService
                .deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                })
                .error(function (error) {
                    console.error(error);
                });
        }

        function updatePage(page) {
            if (page && page.name) {
                PageService
                    .updatePage(vm.pageId, page)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
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