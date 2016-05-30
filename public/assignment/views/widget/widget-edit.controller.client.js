(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        vm.updateWidget = updateWidget;

        function updateWidget() {
            WidgetService.updateWidget(vm.widgetId,vm.widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        vm.deleteWidget = deleteWidget;

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
        
    }
})();