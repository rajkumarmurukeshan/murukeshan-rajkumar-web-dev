(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController)

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        
        vm.createPage = createPage;
        
        function createPage(name,title) {
            var page = {
                "_id": PageService.generateNextId(),
                "name": name,
                "websiteId": vm.websiteId
            };
            PageService.createPage(vm.websiteId,page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }
})();