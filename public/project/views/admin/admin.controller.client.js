(function() {
    angular
        .module("Xplore")
        .controller("AdminController", AdminController);

    function AdminController($location, FoursquareService, $route, $rootScope, XploreVenueService, XploreUserService, $routeParams) {
        var vm = this;

        vm.adminLogin = function adminLogin(adminUsername, adminPassword) {
            if(adminUsername === "admin" && adminPassword ==="admin"){
                $location.url("/admin/login");
            } else {
                vm.error="Invalid Credentials";
            }
        }
        
        function init() {
            XploreUserService
                .getUsers()
                .then(
                    function (response) {
                        if(response.data){
                            vm.users = response.data;
                        } else {
                            vm.users = [];
                        }
                    },
                    function (error) {
                        vm.users = [];
                    }
                )

            XploreVenueService
                .getAllVenue()
                .then(
                    function (response) {
                        if(response.data){
                            vm.ven = response.data;
                            vm.venues =[];
                            for(var i in vm.ven){
                                getVenueDetails(vm.ven[i].venueId);
                            }
                        } else {
                            vm.venues = [];
                        }
                    },
                    function (error) {
                        vm.venues = [];
                    }
                )
        }
        
        init();
        
        function getVenueDetails(venueId) {
            FoursquareService
                .findVenueById(venueId)
                .then(
                    function (response){
                        var venueDetails = response.data.response.venue;
                        vm.venues.push(venueDetails);
                    }           
                )
        }

        vm.deleteUser = deleteUser;

        function deleteUser(user) {
            var confirmation = confirm("Are you sure to delete this user ?");
            if(confirmation){
                XploreUserService
                    .deleteUser(user._id)
                    .then(
                        function (res) {
                            $route.reload();
                            vm.deleteUserStatus = true;
                        },
                        function (error) {
                            $route.reload();
                            vm.deleteUserStatus = false;
                        }
                    );
            }
        }
        
        vm.deleteVenue = deleteVenue;
        
        function deleteVenue(venueId) {
            var confirmation = confirm("Are you sure to delete this venue ?");
            if (confirmation){
                XploreVenueService
                    .deleteVenue(venueId)
                    .then(
                        function (res) {
                            $route.reload();
                            vm.deleteVenueStatus = true;
                        },
                        function (error) {
                            $route.reload();
                            vm.deleteVenueStatus = false;
                        }
                    );
            }
        }


    }

})();