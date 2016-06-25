var request = require("request");

module.exports = function (app) {

    var url_prefix = "https://api.foursquare.com/v2/";
    var clientID = process.env.FOURSQUARE_CLIENT_ID;
    var clientSecret = process.env.FOURSQUARE_CLIENT_SECRET;
    var clientVersion = process.env.FOURSQUARE_VV;

    app.get("/api/project/searchResults", getPlaces);

    function getPlaces(req, res) {
        var searchString = req.query.searchString;
        var searchLocation =req.query.searchLocation;
        var url = url_prefix+"venues/explore?near="+searchLocation+
            "&client_id="+clientID+"&client_secret="+clientSecret+"&v="+clientVersion+"&query="+searchString+"&venuePhotos=1"
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200){
                return body;
            }
        });
    }

};