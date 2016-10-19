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
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.addPage = addPage;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

        function addPage(page){
            PageService.createPage(vm.websiteId, page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        vm.userId = parseInt($routeParams['uid']);
        vm.websiteId = parseInt($routeParams['wid']);
        vm.pageId = parseInt($routeParams['pid']);
        vm.page = PageService.findPageById(vm.pageId);
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

        function deletePage(){
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
        }

        function updatePage(page) {
            PageService.updatePage(vm.pageId, page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
        }
    }
})();