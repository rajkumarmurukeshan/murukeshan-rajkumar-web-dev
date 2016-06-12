(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.updatePage = updatePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                })
        }
        init();

        function updatePage(pageId,page) {
            vm.error = null;
            if(page.name == null || page.name === ""){
                vm.error = "Name cannot be blank !!"
            } else {
                PageService
                    .updatePage(pageId,page)
                    .then(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    });
            }
        }

        vm.deletePage = deletePage;

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .then(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        }

    }
})();