module.exports = function () {

    var connectionString = 'mongodb://127.0.0.1:27017/cs5610summer1';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require('mongoose');
    //mongoose.connect('mongodb://localhost/cs5610summer1');
    mongoose.createConnection(connectionString);

    var models = {
        userModelProject: require("./user/user.model.server")(),
        venueModelProject: require("./venue/venue.model.server")()
    };

    return models;
};