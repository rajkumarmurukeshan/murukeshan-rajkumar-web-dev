(function() {
    angular
        .module("Xplore")
        .controller("VenueController", VenueController);
    
    function VenueController($location, FoursquareService, $routeParams) {
        var vm = this;
        vm.venueId = $routeParams.venueId;
        
        function init() {
            FoursquareService
                .findVenueById(vm.venueId)
                .then(
                    function (response) {
                        vm.venueDetails = response.data.response.venue;
                        vm.photosURL=[];
                        for(var i in vm.venueDetails.photos.groups){
                            for(var j in vm.venueDetails.photos.groups[i].items){
                                var imageURL= vm.venueDetails.photos.groups[i].items[j].prefix+"original"+vm.venueDetails.photos.groups[i].items[j].suffix;
                                imageURL = imageURL.replace(/\//gi,"/");
                                vm.photosURL.push(imageURL);
                            }
                        }
                        if(vm.photosURL.length === 0){
                            vm.photosURL.push("https://www.drphillipscenter.org/resources/images/default.jpg");
                        }
                        vm.imgURL = "https://www.drphillipscenter.org/resources/images/default.jpg";
                        if(vm.venueDetails.bestPhoto != undefined){
                            vm.imgURL = vm.venueDetails.bestPhoto.prefix+"original"+vm.venueDetails.bestPhoto.suffix;
                            vm.imgURL = vm.imgURL.replace(/\//gi,"/");
                        }
                        vm.addrs = "";
                        var addressArray = vm.venueDetails.location.formattedAddress;
                        for (var a in addressArray) {
                            vm.addrs = vm.addrs+addressArray[a]+", ";
                        }
                        vm.addrs= vm.addrs.replace(/, $/, "");
                        vm.phone= "NA";
                        if(vm.venueDetails.contact.formattedPhone != null || vm.venueDetails.contact.formattedPhone != undefined ){
                            vm.phone = vm.venueDetails.contact.formattedPhone;
                        }
                        vm.rating = "NA";
                        if(vm.venueDetails.rating != null || vm.venueDetails.rating != undefined ){
                            vm.rating = vm.venueDetails.rating;
                        }
                        
                    }
                )
            
        }
        
        init();


    }
    
})();