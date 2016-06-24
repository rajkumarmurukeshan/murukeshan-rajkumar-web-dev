(function () {
    angular
        .module("Xplore")
        .controller("XploreRegisterController", RegisterController)

    function RegisterController($location, XploreUserService) {
        var vm = this;
        
        vm.register = register;
        
        function register(firstName,lastName,username,email,gender,dob,password,passwordConfirmation) {
            if(password !== passwordConfirmation || password === "" || password == undefined || password == null) {
                vm.error = "Password did not match";
            } else {
                var user = {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    gender: gender,
                    dob: dob,
                    password: password
                }
                XploreUserService
                    .register(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user) {
                                $location.url("/user");
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