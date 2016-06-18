(function() {
    angular
        .module("Xplore")
        .config(Configuration);
    
    function Configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/main.view.client.html",
                controller: "MainController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
    }
})();