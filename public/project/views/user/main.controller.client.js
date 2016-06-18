(function() {
    angular
        .module("Xplore")
        .controller("MainController", MainController);
    
    function MainController($location,SearchService) {
        var vm = this;
        vm.img = "images/yoga_on_cliff.jpg";

        function init() {
            SearchService
                .searchItem()
                .then(function (response) {
                   vm.output = response.data;
                });
            

        }
        init();

    }
    
})();