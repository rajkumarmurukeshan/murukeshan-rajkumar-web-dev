(function() {
    angular
        .module("Xplore")
        .controller("VenueController", VenueController);

    function VenueController($location, FoursquareService, $route, $rootScope, XploreVenueService, XploreUserService, $routeParams) {
        var vm = this;
        vm.venueId = $routeParams.venueId;
        vm.user = $rootScope.currentXploreUser;

        function init() {
            XploreVenueService
                .findVenueById(vm.venueId)
                .then(
                    function (response) {
                        var venue = response.data;
                        vm.cmters=[];
                        if(venue){
                            vm.comments= venue.comments;
                            var updatedComments =[];
                            for (var i in venue.comments){
                                var cmt = venue.comments[i];
                                fetchUserDetails(cmt);
                            }
                            vm.newComments= updatedComments;
                        } else {
                            vm.comments=[];
                        }
                    }
                );
            FoursquareService
                .findVenueById(vm.venueId)
                .then(
                    function (response) {
                        vm.venueDetails = response.data.response.venue;
                        parseVenueDetails();
                    }
                );
            isFavorite();
        }

        function fetchUserDetails(cmt) {
            XploreUserService
                .findUserById(cmt.commentedBy)
                .then(
                    function(response){
                        var updatedComment = {
                            _id : cmt._id,
                            commentedOn: cmt.commentedOn,
                            commentedUser: response.data,
                            value: cmt.value
                        };
                        vm.cmters.push(updatedComment);
                        return response.data;
                    },
                    function (error) {
                        return null;
                    }
                );
        }

        init();

        /*vm.originalComments =

         function originalComments() {
         var updatedComments =[];
         for (var cmnt in vm.comments){
         console.log(vm.comments[cmnt]);
         var cmt = vm.comments[cmnt];
         cmt.commentedUser =
         XploreUserService
         .findUserById(cmt.commentedBy)
         .then(
         function(response){
         console.log(response.data);
         return response.data;
         },
         function (error) {
         return null;
         }
         );
         updatedComments.push(cmt);
         }
         vm.newComments= updatedComments;
         }*/

        function parseVenueDetails() {
            vm.photosURL=[];
            for(var i in vm.venueDetails.photos.groups){
                for(var j in vm.venueDetails.photos.groups[i].items){
                    var imageURL= vm.venueDetails.photos.groups[i].items[j].prefix+"original"+vm.venueDetails.photos.groups[i].items[j].suffix;
                    imageURL = imageURL.replace(/\//gi,"/");
                    vm.photosURL.push(imageURL);
                }
            }
            if(vm.photosURL.length === 0){
                vm.photosURL.push("https://www.drphillipscenter.org/resources/images/default.jpg");
            }
            vm.imgURL = "https://www.drphillipscenter.org/resources/images/default.jpg";
            if(vm.venueDetails.bestPhoto != undefined){
                vm.imgURL = vm.venueDetails.bestPhoto.prefix+"original"+vm.venueDetails.bestPhoto.suffix;
                vm.imgURL = vm.imgURL.replace(/\//gi,"/");
            }
            vm.addrs = "";
            var addressArray = vm.venueDetails.location.formattedAddress;
            for (var a in addressArray) {
                vm.addrs = vm.addrs+addressArray[a]+", ";
            }
            vm.addrs= vm.addrs.replace(/, $/, "");
            vm.phone= "NA";
            if(vm.venueDetails.contact.formattedPhone != null || vm.venueDetails.contact.formattedPhone != undefined ){
                vm.phone = vm.venueDetails.contact.formattedPhone;
            }
            vm.rating = "NA";
            if(vm.venueDetails.rating != null || vm.venueDetails.rating != undefined ){
                vm.rating = vm.venueDetails.rating;
            }
        }


        function isFavorite() {
            if($rootScope.currentXploreUser){
                XploreVenueService
                    .isFavoriteOf(vm.venueId, $rootScope.currentXploreUser._id)
                    .then(
                        function (response) {
                            var venue = response.data;
                            if(venue){
                                vm.isFavorite = true;
                            } else {
                                vm.isNotFavorite = true;
                            }
                        },
                        function (error) {
                            vm.isNotFavorite = true;
                        }
                    )
            } else {
                vm.isNotFavorite = true;
            }
        }


        vm.removeFavorite = removeFavorite;

        function removeFavorite() {
            XploreUserService
                .removeFavorite($rootScope.currentXploreUser._id,vm.venueId)
                .then(
                    function (response) {
                        return  XploreVenueService
                                    .removeFavoriteOf(vm.venueId, $rootScope.currentXploreUser._id);
                    },
                    function (error) {
                        vm.removeFavoriteStatus = false;
                        $route.reload();
                        $location.url("/venue/"+vm.venueId);
                    }
                )
                .then(
                    function (response) {
                        vm.removeFavoriteStatus = true;
                        $route.reload();
                        $location.url("/venue/"+vm.venueId);
                    },
                    function (error) {
                        vm.removeFavoriteStatus = false;
                        $route.reload();
                        $location.url("/venue/"+vm.venueId);
                    }
                );
        }


        vm.addFavorite = addFavorite;

        function addFavorite() {
            if($rootScope.currentXploreUser){
                var venue = {
                    venueId: vm.venueId,
                    venueImage: vm.imgURL,
                    venueName: vm.venueDetails.name,
                };
                XploreUserService
                    .addFavorite($rootScope.currentXploreUser._id,venue)
                    .then(
                        function (response) {
                            return  XploreVenueService
                                .addFavoriteOf(vm.venueId, $rootScope.currentXploreUser._id);
                        },
                        function (error) {
                            vm.addFavoriteStatus = false;
                            $route.reload();
                            $location.url("/venue/"+vm.venueId);
                        }
                    )
                    .then(
                        function (response) {
                            vm.addFavoriteStatus = true;
                            $route.reload();
                            $location.url("/venue/"+vm.venueId);
                        },
                        function (error) {
                            vm.addFavoriteStatus = false;
                            $route.reload();
                            $location.url("/venue/"+vm.venueId);
                        }
                    );
            } else {
                $location.url("/login?venueId="+vm.venueId);
            }
        }

        vm.addComment = addComment;

        function addComment(commentValue) {
            if($rootScope.currentXploreUser){
                var comment = {
                    value: commentValue,
                    commentedBy: $rootScope.currentXploreUser._id
                };
                XploreVenueService
                    .addComment(vm.venueId,comment)
                    .then(
                        function (response) {
                            vm.addCommentStatus = true;
                            $route.reload();
                            $location.url("/venue/"+vm.venueId);
                        },
                        function (error) {
                            vm.addCommentStatus = false;
                            $route.reload();
                            $location.url("/venue/"+vm.venueId);
                        }
                    );
            } else {
                $location.url("/login?venueId="+vm.venueId);
            }
        }

        vm.deleteComment = deleteComment;

        function deleteComment(comment) {
            XploreVenueService
                .deleteComment(vm.venueId,comment)
                .then(
                    function (response) {
                        vm.deleteCommentStatus = true;
                        $route.reload();
                        $location.url("/venue/"+vm.venueId);
                    },
                    function (error) {
                        vm.deleteCommentStatus = false;
                        $route.reload();
                        $location.url("/venue/"+vm.venueId);
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
                .deleteUser(vm.user._id)
                .then(
                    function(response){
                        $location.url("/main");
                        $rootScope.currentXploreUser = null;
                    },
                    function(error) {
                        vm.error = "Unable to remove user";
                        $rootScope.currentXploreUser = null
                    }
                );
        }
        vm.getUserDetails = getUserDetails;

        function getUserDetails(commentedById) {
            XploreUserService
                .findUserById(commentedById)
                .then(
                    function(response){
                        vm.commentedByUser = response.data;
                    },
                    function (error) {
                        vm.commentedByUser = null;
                    }
                );
        }


    }

})();