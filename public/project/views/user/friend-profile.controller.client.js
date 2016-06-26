(function () {
    angular
        .module("Xplore")
        .controller("FriendProfileController", FriendProfileController)

    function FriendProfileController($routeParams, $route, $rootScope, XploreUserService, $location) {
        
        var vm = this;
        var currUser= $rootScope.currentXploreUser;
        var friendId = $routeParams.friendId;

        function init() {
            XploreUserService
                .findUserById(friendId)
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
                    XploreUserService
                        .findUserById(currUser._id)
                        .then(
                            function (response) {
                                var refreshedUser = response.data;
                                if(refreshedUser && (refreshedUser.friends.indexOf(vm.user._id) > -1) && (vm.user.friends.indexOf(currUser._id) > -1)){
                                    vm.isFriends = true;
                                }
                                if(refreshedUser && (refreshedUser.friends.indexOf(vm.user._id) > -1) && (vm.user.friends.indexOf(currUser._id) === -1)){
                                    vm.requestSent = true;
                                }
                                if(refreshedUser && (refreshedUser.friends.indexOf(vm.user._id) === -1) && (vm.user.friends.indexOf(currUser._id) === -1)){
                                    vm.notFriends = true;
                                }
                            }
                        )
                });
        }
        init();

        vm.addfriend = addfriend;

        function addfriend() {
            XploreUserService
                .addFriend(currUser._id,friendId)
                .then(
                    function (response) {
                        XploreUserService
                            .addToFriendRequest(friendId,currUser._id)
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
                )
        }

        vm.cancelRequest = cancelRequest;

        function cancelRequest() {
            XploreUserService
                .removeFromFriendRequest(friendId,currUser._id)
                .then(
                    function (response) {
                        XploreUserService
                            .removeFriend(currUser._id,friendId)
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

        vm.unfriend =unfriend;

        function unfriend() {
            XploreUserService
                .removeFriend(friendId,currUser._id)
                .then(
                    function (response) {
                        XploreUserService
                            .removeFriend(currUser._id,friendId)
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