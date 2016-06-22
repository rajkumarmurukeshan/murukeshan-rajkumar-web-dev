(function() {
    angular
        .module("Xplore")
        .controller("SearchResultController", SearchResultController);
    
    function SearchResultController($location,FoursquareService, $routeParams) {
        var vm = this;
        vm.searchString = $routeParams.searchString;
        vm.searchLocation = $routeParams.searchLocation;
        
        function init() {
            searchPlaces(vm.searchString,vm.searchLocation);
        }
        
        init();

        vm.navigateVenue = function (venueId) {
            $location.url("/venue/"+venueId);
        }

        vm.searchPlaces = function (searchString,searchLocation) {
            $location.url("/searchResult/"+searchString+"/"+searchLocation);
        };
        
        function searchPlaces(searchString,searchLocation) {
            FoursquareService
                .getPlaces(searchString,searchLocation)
                .then(
                    function (response) {
                        var groups= response.data.response.groups;
                        vm.out = fetchItems(groups);
                        vm.searchResultCount = vm.out.length;
                        vm.searchString = searchString;
                        vm.searchLocation = searchLocation;
                    },
                    function (error){
                        vm.out= [];
                        vm.searchResultCount = vm.out.length;
                        vm.searchString = searchString;
                        vm.searchLocation = searchLocation;
                    }
                )
        }

        function fetchItems(groups){
            var resultSet = [];
            for (var i in groups){
                var groupItems = groups[i].items;
                for(var j in groupItems){
                    var addrs = "";
                    var addressArray = groupItems[j].venue.location.formattedAddress;
                    for (var a in addressArray) {
                        addrs = addrs+addressArray[a]+" ";
                    }
                    if(groupItems[j].venue.featuredPhotos != undefined){
                        var imageURL = groupItems[j].venue.featuredPhotos.items[0].prefix+"original"+groupItems[j].venue.featuredPhotos.items[0].suffix;
                        imageURL = imageURL.replace(/\//gi,"/");
                    } else var imageURL = "https://www.drphillipscenter.org/resources/images/default.jpg";

                    if(groupItems[j].venue.rating != undefined){
                        var ratng = groupItems[j].venue.rating;
                    } else var ratng = 0;

                    var obj = {
                        imageURL: imageURL,
                        venueId: groupItems[j].venue.id,
                        name: groupItems[j].venue.name,
                        rating: ratng,
                        address: addrs,
                        phone: groupItems[j].venue.contact.formattedPhone
                    }
                    resultSet.push(obj);
                }
            }
            return resultSet;
        }

    }
    
})();