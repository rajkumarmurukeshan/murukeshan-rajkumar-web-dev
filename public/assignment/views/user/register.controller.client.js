(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService) {
        var vm = this;
        var newId = null;
        UserService.generateNewUserId()
            .then(function (response) {
                newId = response.data;
            });

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
                                _id: newId,
                                username: username,
                                password: password,
                                firstName: "",
                                lastName: ""
                            };
                            UserService.createUser(user)
                                .then(function () {
                                    $location.url("/user/"+newId);
                                });
                        }
                    });
            }
        }
    }
})();