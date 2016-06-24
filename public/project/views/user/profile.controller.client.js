(function () {
    angular
        .module("Xplore")
        .controller("XploreProfileController", ProfileController)

    function ProfileController($routeParams, $rootScope, XploreUserService, $location) {
        
        var vm = this;
        var id = $rootScope.currentXploreUser._id;

        function init() {
            XploreUserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                    var monthNames = [
                        "January", "February", "March",
                        "April", "May", "June", "July",
                        "August", "September", "October",
                        "November", "December"
                    ];
                    if(vm.user.dob == null || vm.user.dob == undefined){
                        vm.newDate = "Not Updated";
                    } else {
                        var date = vm.user.dob;
                        var day = date.split('-')[2].split("T")[0];
                        var monthIndex = parseInt(date.split('-')[1]);
                        var year = date.split('-')[0];
                        vm.newDate = monthNames[monthIndex - 1] + " " + day + " " + year;
                    }
                });
        }
        init();

        vm.updateUser = updateUser;
        vm.unregister = unregisterUser;
        vm.logout = logout;

        function logout() {
            XploreUserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/main");
                    },
                    function() {
                        $location.url("/main");
                    }
                );

        }

        function unregisterUser() {
            XploreUserService
                .deleteUser(id)
                .then(
                    function(response){
                        $location.url("/main");
                    },
                    function(error) {
                        vm.error = "Unable to remove user"
                    }
                );
        }

        function updateUser() {
            XploreUserService
                .updateUser(id, vm.user)
                .then(
                    function (response) {
                        vm.success = "Updated successfully";
                        $location.url("/user");
                    },
                    function (error) {
                        vm.error = "Unable to update user"
                    }
                );
        }

        /*vm.profile = $location.url("/user/"+id);*/
    }
})();