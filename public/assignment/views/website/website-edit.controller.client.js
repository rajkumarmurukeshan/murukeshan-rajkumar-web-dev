(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId= $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;



        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }

        init();
        
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function deleteWebsite(websiteId) {
            WebsiteService.deleteWebsite(websiteId);
            $location.url("/user/"+ vm.userId + "/website");
        }

        function updateWebsite(websiteId,website) {
            WebsiteService.updateWebsite(websiteId,website);
            $location.url("/user/"+ vm.userId + "/website");
        }
    }
})();

