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
        deleteUser: deleteUser
    };
    return api;

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