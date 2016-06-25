(function () {
    angular
        .module("Xplore")
        .controller("XploreLoginController", LoginController)

    function LoginController($location,$rootScope, $routeParams, XploreUserService) {
        var vm = this;
        vm.venueId=$location.search().venueId;


        vm.login = function (username,password) {
            if(username === "" || username == null){
                vm.error = "Username cannot be blank !"
            } else if (password === "" || password == null){
                vm.error = "Password cannot be blank !"
            } else {
                XploreUserService
                    .login(username,password)
                    .then(function (response) {
                        var user = response.data;
                        if(user){
                            if(vm.venueId){
                                $location.url("/venue/"+vm.venueId);
                            } else {
                                $location.url("/user");
                            }
                        } else {
                            vm.error = "User not found";
                        }
                    },
                    function (error) {
                        vm.error = "User not found !!"
                    });
            }
        }

        vm.register = function() {
            $location.url("/register");
        }
    }
})();