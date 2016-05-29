(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.updatePage = updatePage;

        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }

        init();

        function updatePage(pageId,page) {
            PageService.updatePage(pageId,page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        vm.deletePage = deletePage;

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

    }
})();