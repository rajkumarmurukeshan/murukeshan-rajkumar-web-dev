module.exports = function () {

    var mongoose = require("mongoose");
    var VenueSchemaProject = require("./venue.schema.server")();

    var Venue = mongoose.model("Venue", VenueSchemaProject);

    var api = {
        createVenue: createVenue,
        findVenueById: findVenueById,
        findVenueByVenueId: findVenueByVenueId,
        updateVenue: updateVenue,
        addComment: addComment,
        deleteComment: deleteComment,
        addFavoriteOf: addFavoriteOf,
        removeFavoriteOf: removeFavoriteOf,
        isFavoriteOf: isFavoriteOf
    };
    return api;

    function findVenueByVenueId(venueId) {
        return Venue.findOne({"venueId": venueId});
    }
    
    function createVenue(venue) {
        return Venue.create(venue);
    }

    function findVenueById(vId) {
        return Venue.findById(vId);
    }
    
    function updateVenue(venueId, venue) {
        delete venue._id;
        return Venue
            .update(
                {_id: venueId},
                {$set: venue}
            );
    }
    
    function addComment(venueId, comment) {
        return Venue.update(
            {_id: venueId},
            {$push: {comments: comment}}
        );
    }
    
    function deleteComment(venueId,comment) {
        return Venue.update(
            {_id: venueId},
            {$pull: {comments: comment}}
        );
    }

    function addFavoriteOf(venueId, userId) {
        return Venue.update(
            {_id: venueId},
            {$push: {favoriteOf: userId}}
        );
    }

    function removeFavoriteOf(venueId, userId) {
        return Venue.update(
            {_id: venueId},
            {$pull: {favoriteOf: userId}}
        );        
    }
    
    function isFavoriteOf(venueId, userId) {
        return Venue.findOne({
            _id: venueId,
            favoriteOf: {
                $elemMatch : {
                    $eq: userId
                }
            }
        });
    }
    
};