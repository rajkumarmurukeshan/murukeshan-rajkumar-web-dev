(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = function (username,password,verifyPassword) {
            var newId = UserService.generateNextId();
            console.log(newId);
            var prevUser = UserService.findUserByUsername(username);
            var user = {
                _id: newId,
                username: username,
                password: password,
                firstName: "",
                lastName: ""
            }
            console.log(username);
            if(username == null || password == null || verifyPassword == null){
                vm.error = "Username and Password cannot be blank";
            } else if (prevUser) {
                vm.error = "Username already exists";
            } else if(password !== verifyPassword){
                vm.error = "Password did not match";
            } else {
                UserService.createUser(user);
                $location.url("/user/"+newId);
            }
        }

    }
})();