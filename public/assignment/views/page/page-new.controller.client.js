(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController)

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        function init() {
            PageService
                .generateNextPageId()
                .then(function (response) {
                    vm.nextPageId = response.data;
                })
        }

        init();
        
        vm.createPage = createPage;
        
        function createPage(name,title) {
            var page = {
                "_id": vm.nextPageId,
                "name": name,
                "websiteId": vm.websiteId
            };
            PageService
                .createPage(vm.websiteId,page)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        }
    }
})();