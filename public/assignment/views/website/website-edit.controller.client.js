(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId= $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                });
        }

        init();

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function () {
                    $location.url("/user/"+ vm.userId + "/website");
                });
        }

        function updateWebsite(websiteId,website) {
            vm.error = null;
            if(website.name == null || website.name === ""){
                vm.error = "Name cannot be blank !!";
            }else {
                WebsiteService
                    .updateWebsite(websiteId,website)
                    .then(function () {
                        $location.url("/user/"+ vm.userId + "/website");
                    });
            }
        }
    }
})();

