module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchemaProject = require("./user.schema.server")();

    var ProjectUser = mongoose.model("ProjectUser", UserSchemaProject);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        findUserByGoogleId: findUserByGoogleId,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addToFavorites: addToFavorites,
        removeFromFavorites: removeFromFavorites,
        addToBucketList: addToBucketList,
        removeFromBucketList: removeFromBucketList
    };
    return api;

    function addToBucketList(userId, venue) {
        return ProjectUser.update(
            {_id: userId},
            {$push : {bucketList: venue}}
        )
    }

    function removeFromBucketList(userId, venue) {
        return ProjectUser.update(
            {_id: userId},
            {$pull : {bucketList: venue}}
        )
    }
    
    function addToFavorites(userId, venue) {
        return ProjectUser.update(
            {_id: userId},
            {$push : {favorites: venue}}
        )
    }
    
    function removeFromFavorites(userId, venueId) {
        return ProjectUser.update(
            {_id: userId},
            {$pull : {favorites: {venueId: venueId}}}
        )
    }

    function findUserByGoogleId(googleId) {
        return ProjectUser.findOne({"google.id": googleId});
    }

    function findUserByFacebookId(facebookId) {
        return ProjectUser.findOne({"facebook.id": facebookId});
    }
    
    function createUser(user) {
        return ProjectUser.create(user);
    }

    function findUserById(userId) {
        return ProjectUser.findById(userId);
    }

    function findUserByUsername(username) {
        return ProjectUser.findOne({username: username });
    }
    
    function findUserByCredentials(username, password) {
        return ProjectUser.findOne({username: username, password: password});
    }
    
    function updateUser(userId, user) {
        delete user._id;
        return ProjectUser
            .update(
                {_id: userId},
                {$set: user}
            );
    }

    function deleteUser(userId) {
        return ProjectUser.remove({_id: userId});
    }
    
};