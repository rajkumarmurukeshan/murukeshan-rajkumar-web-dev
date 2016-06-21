(function() {
    angular
        .module("Xplore")
        .factory("SearchService",SearchService);

    function SearchService($http) {
        var url_prefix = "https://api.foursquare.com/v2/";
        /*var clientID = process.env.FOURSQUARE_CLIENT_ID;
        var clientSecret = proces.env.FOURSQUARE_CLIENT_SECRET;
        var clientVersion = process.env.FOURSQUARE_VV;*/

        var clientID = "JFSSW1NIHYS3R0JZU2XXJFHRY5DQR3AINCXVT10GWU4DN2SK";
        var clientSecret = "ZIIFPUCZ43MOQOPB41GGD1D02L1COCOYCKBLZ5VTSMICIBAA";
        var clientVersion = "20160609";

        var api = {
            getPlaces: getPlaces,
            searchItem: searchItem
        }

        return api;

        function getPlaces(searchString,searchLocation) {
            var url = url_prefix+"venues/explore?near="+searchLocation+
                "&client_id="+clientID+"&client_secret="+clientSecret+"&v="+clientVersion+"&query="+searchString+"&venuePhotos=1"
            return $http.get(url);
        }

        function searchItem() {

        }
    }
})();