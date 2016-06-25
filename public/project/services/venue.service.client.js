(function() {
    angular
        .module("Xplore")
        .factory("XploreVenueService", XploreVenueService);

    function XploreVenueService($http) {
        var api = {
            createVenue: createVenue,
            findVenueById: findVenueById,
            updateVenue: updateVenue,
            addComment: addComment,
            deleteComment: deleteComment,
            addFavoriteOf: addFavoriteOf,
            removeFavoriteOf: removeFavoriteOf,
            isFavoriteOf: isFavoriteOf
        };
        
        return api;

        function isFavoriteOf(venueId, userId) {
            return $http.get("/api/project/venue/"+venueId+"/isFavoriteOf", userId);
        }

        function removeFavoriteOf(venueId, userId) {
            return $http.put("/api/project/venue/"+venueId+"/removeFavorite", userId)
        }

        function addFavoriteOf(venueId, userId) {
            return $http.put("/api/project/venue/"+venueId+"/addFavorite", userId)
        }

        function deleteComment(venueId, comment) {
            return $http.put("/api/project/venue/"+venueId+"/deleteComment", comment);
        }

        function addComment(venueId, comment) {
            return $http.put("/api/project/venue/"+venueId+"/addComment", comment);
        }

        function updateVenue(venueId, venue) {
            return $http.put("/api/project/venue/"+venueId, venue)
        }

        function findVenueById(venueId) {
            return $http.get("/api/project/venue/"+venueId);
        }

        function createVenue(venue){
            return $http.post("/api/project/venue", venue);
        }

    }

})();