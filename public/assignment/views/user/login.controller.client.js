(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = function (username,password) {
            if(username === "" || username == null){
                vm.error = "Username cannot be blank !"
            } else if (password === "" || password == null){
                vm.error = "Password cannot be blank !"
            } else {
                UserService
                    .findUserByCredentials(username,password)
                    .then(function (response) {
                        var user = response.data;
                        if(user){
                            $location.url("/user/"+user._id);
                        } else {
                            vm.error = "User not found";
                        }
                    });
            }
        }

        vm.register = function() {
            $location.url("/register");
        }
    }
})();