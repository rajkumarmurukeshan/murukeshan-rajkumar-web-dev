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
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (response) {
                        var length = response.data.length;
                        var widget = null;
                        switch(widgetType){
                            case 'HEADER':
                                widget= {
                                    "type": "HEADING",
                                    "_page": vm.pageId,
                                    size: null,
                                    "text": "",
                                    widgetNumber: length
                                };
                                break;
                            case 'IMAGE':
                                widget= {
                                    "type": "IMAGE",
                                    "_page": vm.pageId,
                                    "width": "100%",
                                    widgetNumber: length
                                };
                                break;
                            case 'YOUTUBE':
                                widget= {
                                    "type": "YOUTUBE",
                                    "_page": vm.pageId,
                                    "width": "100%",
                                    widgetNumber: length
                                };
                                break;
                            case 'HTML':
                                widget= {
                                    "type": "HTML",
                                    "_page": vm.pageId,
                                    widgetNumber: length
                                };
                                break;
                            case 'INPUT':
                                widget= {
                                    "type": "INPUT",
                                    "_page": vm.pageId,
                                    widgetNumber: length
                                };
                                break;
                        }
                        WidgetService
                            .createWidget(vm.pageId,widget)
                            .then(function (response) {
                                var widgt = response.data;
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widgt._id);
                            });
                    }
                );

        }
    }
})();