(function() {
    angular
        .module("Xplore")
        .controller("MainController", MainController);
    
    function MainController($location,SearchService) {
        var vm = this;

        vm.searchPlaces = searchPlaces;
        
        function searchPlaces(searchString,searchLocation) {
            SearchService
                .getPlaces(searchString,searchLocation)
                .then(
                    function (response) {
                        var groups= response.data.response.groups;
                        vm.out = fetchItems(groups);
                    },
                    function (error){
                        vm.error = "No items";
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
                    var obj = {
                        name: groupItems[j].venue.name,
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