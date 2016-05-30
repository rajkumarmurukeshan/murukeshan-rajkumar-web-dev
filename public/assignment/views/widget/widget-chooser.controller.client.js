(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            var widget = null;
            var newId = WidgetService.generateNextWidgetId();
            switch(widgetType){
                case 'HEADER':
                    widget= {
                        "_id": newId,
                        "widgetType": "HEADER",
                        "pageId": vm.pageId,
                        "size": null,
                        "text": ""
                    };
                    break;
                case 'IMAGE':
                    widget= {
                        "_id": newId,
                        "widgetType": "IMAGE",
                        "pageId": vm.pageId,
                        "width": "100%"
                    }
                    break;
                case 'YOUTUBE':
                    widget= {
                        "_id": newId,
                        "widgetType": "YOUTUBE",
                        "pageId": vm.pageId,
                        "width": "100%"
                    }
                    break;
            }
            console.log(widget);
            WidgetService.createWidget(vm.pageId,widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newId);
        }
    }
})();