(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = function (username,password,verifyPassword) {
            if(username == null || password == null || verifyPassword == null ||
                username == "" || password == "" || verifyPassword == ""){
                vm.error = "Username and Password cannot be blank";
            } else if(password !== verifyPassword) {
                vm.error = "Password did not match";
            } else {
                UserService.findUserByUsername(username)
                    .then(function (response) {
                        var prevUser = response.data;
                        if(prevUser){
                            vm.error = "Username already Exists";
                        } else {
                            var user = {
                                username: username,
                                password: password
                            };
                            UserService.createUser(user)
                                .then(function (response) {
                                    var usr = response.data;
                                    $location.url("/user/"+usr._id);
                                });
                        }
                    });
            }
        }
    }
})();