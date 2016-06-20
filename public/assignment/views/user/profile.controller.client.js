(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, $rootScope, UserService, $location) {
        
        var vm = this;
        var id = $rootScope.currentUser._id;

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();

        vm.updateUser = updateUser;
        vm.unregister = unregisterUser;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function() {
                        $location.url("/login");
                    }
                );

        }

        function unregisterUser() {
            UserService
                .deleteUser(id)
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = "Unable to remove user"
                    }
                );
        }

        function updateUser(updatedUser) {
            vm.error = null;
            vm.success = null;
            if(updatedUser.username === "" || updatedUser.username == null){
                vm.error = "Username cannot be blank!!";
            } else {
                UserService
                    .updateUser(id, vm.user)
                    .then(
                        function (response) {
                            vm.success = "Updated successfully";
                        },
                        function (error) {
                            vm.error = "Unable to update user"
                        }
                    );
            }
        }

        /*vm.profile = $location.url("/user/"+id);*/
    }
})();