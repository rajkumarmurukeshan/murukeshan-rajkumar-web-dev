(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var id = $routeParams.id;

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
            UserService
                .updateUser(id, vm.user)
                .then(
                function(response) {
                    vm.success = "Updated successfully";
                },
                function(error) {
                    vm.error = "Unable to update user"
                }
            );
        }

        vm.profile = $location.url("/user/"+id);
    }
})();