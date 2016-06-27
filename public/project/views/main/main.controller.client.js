(function() {
    angular
        .module("Xplore")
        .controller("MainController", MainController);
    
    function MainController($location,XploreUserService, $rootScope) {
        var vm = this;
        
        vm.user = $rootScope.currentXploreUser;

        vm.unregister = unregisterUser;
        vm.logout = logout;

        function logout() {
            XploreUserService
                .logout()
                .then(
                    function(response) {
                        $location.url("/main");
                        $rootScope.currentXploreUser = null
                    },
                    function() {
                        $location.url("/main");
                        $rootScope.currentXploreUser = null
                    }
                );

        }

        function unregisterUser() {
            XploreUserService
                .deleteUser(id)
                .then(
                    function(response){
                        $location.url("/main");
                        $rootScope.currentXploreUser = null
                    },
                    function(error) {
                        vm.error = "Unable to remove user"
                        $rootScope.currentXploreUser = null
                    }
                );
        }

        vm.searchPlaces = searchPlaces;
        
        function searchPlaces(searchString,searchLocation) {
            if(searchString == null || searchString.trim === "" || searchString == undefined
                || searchLocation == null || searchLocation.trim === "" || searchLocation == undefined){
                vm.error = "Please enter a valid location and a search query"
            } else {
                $location.url("/searchResult/"+searchString+"/"+searchLocation);
            }
        }

    }
    
})();