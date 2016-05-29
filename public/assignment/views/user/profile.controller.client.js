(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        var id = $routeParams.id;

        function init() {
            vm.user = UserService.findUserById(id);
        }
        init();

        vm.updateUser = updateUser;

        function updateUser(updatedUser) {
            UserService.updateUser(id, updatedUser);
        }

        vm.profile = $location.url("/user/"+id);
    }
})();