(function(){
    angular
        .module("MyDirectives",[])
        .directive("wamSortable",wamSortable);

    function wamSortable() {
        function linker(scope,element,attribute) {
            var myScope = scope;
            var startIndex=-1;
            var endIndex=-1;
            $(element)
                .find(".container")
                .sortable({
                    axis:'y',
                    start:function(event,ui) {
                        startIndex=ui.item.index();
                    },
                    stop:function(event,ui) {
                        endIndex=ui.item.index();
                        scope.callback({start:startIndex,end:endIndex});
                    }
                });
        }
        return {
            templateUrl: "views/widget/wam-sortable.view.client.html",
            scope: {
                data: "=data",
                callback: '&',
                model: "="
            },
            link:linker
        }
    }
})();