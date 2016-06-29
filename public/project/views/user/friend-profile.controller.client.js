(function () {
    angular
        .module("Xplore")
        .controller("FriendProfileController", FriendProfileController)

    function FriendProfileController($routeParams, $route, $rootScope, XploreUserService, $location) {
        
        var vm = this;
        var currUser= $rootScope.currentXploreUser;
        var friendId = $routeParams.friendId;
        vm.xplrUsr = $rootScope.currentXploreUser;

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
                        vm.newDate = monthNames[monthIndex - 1] + " " + day + ", " + year;
                    }
                    if(currUser){
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
                                    if(refreshedUser &&
                                        (refreshedUser.friends.indexOf(vm.user._id) === -1) &&
                                        (vm.user.friends.indexOf(currUser._id) > -1) &&
                                        (refreshedUser.friendRequest.indexOf(vm.user._id) > -1)){
                                        vm.accptFrend = true;
                                    }
                                }
                            );
                    } else {
                        vm.isFriends = false;
                        vm.requestSent = false;
                        vm.notFriends = false;
                        vm.accptFrend = false;
                    }
                    vm.fRequests =[];
                    for (var i in vm.user.friendRequest){
                        fetchUserDetails(vm.user.friendRequest[i]);
                    }
                    vm.frnds = [];
                    for (var i in vm.user.friends){
                        fetchFriendsDetails(vm.user.friends[i]);
                    }
                    vm.nts= [];
                    for(var i in vm.user.notes){
                        fetchNoteDetails(vm.user.notes[i]);
                    }
                });
        }
        init();

        vm.requestAccept = requestAccept;

        function requestAccept() {
            XploreUserService
                .removeFromFriendRequest(currUser._id, friendId)
                .then(
                    function (response) {
                        XploreUserService
                            .addFriend(currUser._id,friendId)
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

        function requestDeny() {
            XploreUserService
                .removeFromFriendRequest(currUser._id, friendId)
                .then(
                    function (response) {
                        XploreUserService
                            .removeFriend(friendId, currUser._id)
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

        function fetchNoteDetails(note) {
            XploreUserService
                .findUserById(note.writtenBy)
                .then(
                    function(response){
                        note.writerDetails =response.data;
                        vm.nts.push(note);
                    }
                );
        }

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

        vm.convertDate = convertDate;

        function convertDate(date) {
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            var day = date.split('-')[2].split("T")[0];
            var monthIndex = parseInt(date.split('-')[1]);
            var year = date.split('-')[0];
            return (monthNames[monthIndex - 1] + " " + day + ", " + year);
        }


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

        vm.deleteNote =deleteNote;

        function deleteNote(note) {
            XploreUserService
                .deleteNote(friendId, note)
                .then(
                    function (response) {
                        vm.deleteNoteStatus = true;
                        $route.reload();
                    },
                    function (error) {
                        $route.reload();
                    }
                )
        }

        vm.addNote = addNote;

        function addNote(noteValue) {
            var note = {
                value: noteValue,
                createdOn: Date.now(),
                writtenBy: currUser
            }
            XploreUserService
                .addNote(friendId, note)
                .then(
                    function (response) {
                        vm.addNoteStatus = true;
                        $route.reload();
                    }, function (error) {
                        $route.reload();
                    }
                )
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