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
                        vm.newDate = monthNames[monthIndex - 1] + " " + day + ", " + year;
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

        vm.addNote = addNote;
        vm.deleteNote =deleteNote;

        function deleteNote(note) {
            XploreUserService
                .deleteNote(id, note)
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

        vm.deleteImage =deleteImage;

        function deleteImage() {
            vm.imgDeleteError= null;
            console.log(vm.user.displayPicture);
            if(vm.user.displayPicture == "images/defaultDisplayPic.jpg"){
                console.log("otha");
                vm.imgDeleteError = "Cannot delete the default image";
            } else {
                XploreUserService
                    .deleteImage(vm.user._id)
                    .then(
                        function (response) {
                            vm.deleteImagestatus = true;
                            $route.reload();
                        },
                        function (error){
                            vm.imgDeleteError = "Unable to delete the image";
                            $route.reload();
                        })
            }
        }

        function addNote(noteValue) {
            var note = {
                value: noteValue,
                createdOn: Date.now(),
                writtenBy: id
            }
            XploreUserService
                .addNote(id, note)
                .then(
                    function (response) {
                        vm.addNoteStatus = true;
                        $route.reload();
                    }, function (error) {
                        $route.reload();
                    }
                )
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
            if(searchString == null || searchString.trim === "" || searchString == undefined
                || searchLocation == null || searchLocation.trim === "" || searchLocation == undefined){
                vm.error = "Please enter a valid location and a search query"
            } else {
                $location.url("/searchResult/"+searchString+"/"+searchLocation);
            }
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
            var confirmation = confirm("Are you sure to delete your account ?");
            if(confirmation){
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