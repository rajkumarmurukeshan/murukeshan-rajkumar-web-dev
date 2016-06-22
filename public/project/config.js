(function() {
    angular
        .module("Xplore")
        .config(Configuration);
    
    function Configuration($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "views/main/main.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/searchResult/:searchString/:searchLocation", {
                templateUrl: "views/search/searchResult.view.client.html",
                controller: "SearchResultController",
                controllerAs: "model"
            })
            .when("/venue/:venueId", {
                templateUrl: "views/venue/venue.view.client.html",
                controller: "VenueController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/main"
            })
    }
})();