(function() {
    angular
        .module("Xplore")
        .controller("MainController", MainController);
    
    function MainController($location) {
        var vm = this;

        vm.searchPlaces = searchPlaces;
        
        function searchPlaces(searchString,searchLocation) {
            $location.url("/searchResult/"+searchString+"/"+searchLocation);
        }

    }
    
})();