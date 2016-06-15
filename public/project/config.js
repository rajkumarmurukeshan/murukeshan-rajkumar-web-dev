(function() {
    angular
        .module("Xplore")
        .config(Configuration);
    
    function Configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/main.view.client.html"
            })
    }
})();