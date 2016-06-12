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
            vm.error = null;
            if (name == null || name === ""){
                vm.error = "Name cannot be blank !!";
            } else {
                var page = {
                    "_website": vm.websiteId,
                    "name": name,
                    "title": title
                };
                PageService
                    .createPage(vm.websiteId,page)
                    .then(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    });
            }
        }
    }
})();