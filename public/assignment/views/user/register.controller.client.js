(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService) {
        var vm = this;
        
        vm.register = register;
        
        function register(username,password,verifyPassword) {
            if(username == null || password == null || verifyPassword == null ||
                username == "" || password == "" || verifyPassword == ""){
                vm.error = "Username and Password cannot be blank";
            } else if(password !== verifyPassword) {
                vm.error = "Password did not match";
            } else {
                UserService
                    .register(username,password)
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user) {
                                $location.url("/user/"+user._id);
                            }
                        },
                        function (err) {
                            vm.error = err.data;
                        }
                    );
            }
        }
        
    }
})();