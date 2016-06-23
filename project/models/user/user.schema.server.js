module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchemaProject = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        gender: String,
        facebook:{
            id:String,
            token:String,
            displayName:String
        },
        google:{
            id:String,
            token:String
        },
        phone: String,
        dob: Date,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.user"});

    return UserSchemaProject;
};