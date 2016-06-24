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
                controller: "XploreLoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "XploreRegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "XploreProfileController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/edit", {
                templateUrl: "views/user/profile-edit.view.client.html",
                controller: "XploreProfileController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedIn
                }
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

        function checkLoggedIn($q, $location,$rootScope, XploreUserService) {
            var deferred = $q.defer();

            XploreUserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        if(user == '0'){
                            $rootScope.currentXploreUser = null;
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentXploreUser = user;
                            deferred.resolve();
                        }
                    },
                    function (error) {
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        };
    }
})();