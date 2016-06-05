(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var id = $routeParams.id;

        function init() {
            UserService.findUserById(id)
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
                    function(){
                        $location.url("/login");
                    },
                    function() {
                        vm.error = "Unable to remove user"
                    }
                );
        }

        function updateUser(updatedUser) {
            UserService.updateUser(id, updatedUser)
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