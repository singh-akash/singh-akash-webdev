(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid'])

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

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);

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
            if (page.name) {
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
                vm.error = "Page Name cannot be left blank";
            }
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);

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
            if (page.name) {
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
                vm.error = "Page Name cannot be left blank";
            }
        }
    }
})();