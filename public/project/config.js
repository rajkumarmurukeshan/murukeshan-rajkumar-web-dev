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
            .otherwise({
                redirectTo: "/main"
            })
    }
})();