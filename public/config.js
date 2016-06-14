(function() {
    angular
        .module("CoursePage")
        .config(Configuration);

    
    function Configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home/views/home.view.client.html"
            });
        
    }
    
})();