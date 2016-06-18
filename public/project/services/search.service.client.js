(function() {
    angular
        .module("Xplore")
        .factory("SearchService",SearchService);

    function SearchService($http) {
        var api = {
            searchItem: searchItem
        }

        return api;

        function searchItem() {
            url = "https://api.foursquare.com/v2/venues/search?client_id=JFSSW1NIHYS3R0JZU2XXJFHRY5DQR3AINCXVT10GWU4DN2SK&client_secret=ZIIFPUCZ43MOQOPB41GGD1D02L1COCOYCKBLZ5VTSMICIBAA&v=20160616&ll=40.7,-74&query=sushi";
            return $http.get(url);
        }
    }
})();