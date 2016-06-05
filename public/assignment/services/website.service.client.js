(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            generateNextWebsiteId: generateNextWebsiteId
        };

        return api;

        function generateNextWebsiteId() {
            var url = "/api/generateNextWebsiteId";
            return $http.get(url);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.delete(url);
        }

        function updateWebsite(websiteId,website) {
            var url = "/api/website/"+websiteId;
            return $http.put(url, website);
        }

        function createWebsite(userId, website){
            var url = "/api/user/"+userId+"/website";
            return $http.post(url,website);
        }

        function findWebsitesByUser(userId){
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId){
            var url = "/api/website/"+websiteId;
            return $http.get(url);
        }
    }

})();