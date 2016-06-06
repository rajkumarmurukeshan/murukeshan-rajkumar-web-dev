(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController);

    function FlickrImageSearchController($location,$routeParams, FlickrService, WidgetService) {
        var vm = this;
        vm.userId=$routeParams.userId;
        vm.websiteId=$routeParams.websiteId;
        vm.pageId=$routeParams.pageId;
        vm.widgetId=$routeParams.widgetId;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    //console.log(response);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });

        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {
                _id: vm.widgetId,
                widgetType: "IMAGE",
                pageId: vm.pageId,
                url: url,
                width: "100%"
            };

            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function(response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                });
        }

    }
})();