(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            var newWebsite = {
                "_id": WebsiteService.generateNextWebsiteId(),
                "name": name,
                "developerId": vm.userId
            };
            WebsiteService.createWebsite(vm.userId,newWebsite);
            $location.url("/user/"+ vm.userId + "/website");
        }
    }
})();