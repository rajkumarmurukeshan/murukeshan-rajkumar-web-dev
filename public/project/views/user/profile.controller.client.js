(function () {
    angular
        .module("Xplore")
        .controller("XploreProfileController", ProfileController)

    function ProfileController($routeParams, $route, $rootScope, XploreUserService, $location) {
        
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
                    vm.fRequests =[];
                    for (var i in vm.user.friendRequest){
                        fetchUserDetails(vm.user.friendRequest[i]);
                    }
                    vm.frnds = [];
                    for (var i in vm.user.friends){
                        fetchFriendsDetails(vm.user.friends[i]);
                    }
                });
        }
        init();

        function fetchUserDetails(usrId) {
            XploreUserService
                .findUserById(usrId)
                .then(
                    function(response){
                        vm.fRequests.push(response.data);
                        return response.data;
                    },
                    function (error) {
                        return null;
                    }
                );
        }

        function fetchFriendsDetails(usrId) {
            XploreUserService
                .findUserById(usrId)
                .then(
                    function(response){
                        vm.frnds.push(response.data);
                        return response.data;
                    },
                    function (error) {
                        return null;
                    }
                );
        }
        
        vm.requestAccept = requestAccept;
        
        function requestAccept(friendId) {
            XploreUserService
                .removeFromFriendRequest(id, friendId)
                .then(
                    function (response) {
                        XploreUserService
                            .addFriend(id,friendId)
                            .then(
                                function (response) {
                                    $route.reload();
                                },
                                function (error) {
                                    $route.reload();
                                }
                            )
                    }, 
                    function (error) {
                        $route.reload();
                    }
                );
        }

        vm.requestDeny = requestDeny;

        function requestDeny(friendId) {
            XploreUserService
                .removeFromFriendRequest(id, friendId)
                .then(
                    function (response) {
                        XploreUserService
                            .removeFriend(friendId, id)
                            .then(
                                function (response) {
                                    $route.reload();
                                },
                                function (error) {
                                    $route.reload();
                                }
                            )
                    },
                    function (error) {
                        $route.reload();
                    }
                );
        }


        vm.searchPlaces = function (searchString,searchLocation) {
            $location.url("/searchResult/"+searchString+"/"+searchLocation);
        };

        vm.updateUser = updateUser;
        vm.unregister = unregisterUser;
        vm.logout = logout;

        function logout() {
            XploreUserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/main");
                        $rootScope.currentXploreUser = null
                    },
                    function() {
                        $location.url("/main");
                        $rootScope.currentXploreUser = null
                    }
                );

        }

        function unregisterUser() {
            XploreUserService
                .deleteUser(id)
                .then(
                    function(response){
                        $location.url("/main");
                        $rootScope.currentXploreUser = null
                    },
                    function(error) {
                        vm.error = "Unable to remove user"
                        $rootScope.currentXploreUser = null
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

        vm.findFriend = findFriend;
        
        function findFriend(friendName) {
            XploreUserService
                .findUserByUsername(friendName)
                .then(
                    function (response) {
                        vm.friendSearch = response.data;
                    }, 
                    function (error) {
                        vm.friendSearch = null;
                    }
                )
        }
    }
})();