(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .generateNextWebsiteId()
                .then(function (response) {
                    vm.nextWebsiteId = response.data;
                });
        }

        init();

        function createWebsite(name, description) {
            var newWebsite = {
                "_id": vm.nextWebsiteId,
                "name": name,
                "developerId": vm.userId
            };
            WebsiteService
                .createWebsite(vm.userId,newWebsite)
                .then(function (response) {
                    $location.url("/user/"+ vm.userId + "/website");
                });
        }
    }
})();