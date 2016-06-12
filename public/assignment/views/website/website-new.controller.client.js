(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            vm.error = null;
            if(name == null || name === ""){
                vm.error = "Name cannot be blank !!"
            } else {
                var newWebsite = {
                    "_user": vm.userId,
                    "name": name,
                    "description": description
                };
                WebsiteService
                    .createWebsite(vm.userId,newWebsite)
                    .then(function (response) {
                        console.log("This is client-controller");
                        $location.url("/user/"+ vm.userId + "/website");
                    });
            }
        }
    }
})();