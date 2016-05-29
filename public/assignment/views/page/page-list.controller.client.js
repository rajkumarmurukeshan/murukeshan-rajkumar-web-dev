(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)

    function PageListController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();

    }
})();