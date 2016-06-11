module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();

    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;
    
    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username });
    }
    
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }
    
    function updateUser(userId, user) {
        delete user._id;
        console.log("DB Side");
        console.log(user.phone);
        return User
            .update({_id: userId},{
                $set: {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    test: "23456",
                    phone: user.phone,
                    email: user.email
                }
            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
    
};