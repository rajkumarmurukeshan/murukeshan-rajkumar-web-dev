(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ]

    function PageService() {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            generateNextId: generateNextId
        };

        return api;

        function generateNextId() {
            if(pages.length === 0){
                var newId = 123;
            } else {
                var newId = parseInt(pages[pages.length-1]._id) + 1;
            }
            return newId.toString();
        }

        function createPage(websiteId,page) {
            pages.push(page);
        }
        
        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for(var i in pages){
                if(pages[i].websiteId === websiteId){
                    resultSet.push(pages[i]);
                }
            }
            return resultSet;
        }
        
        function findPageById(pageId) {
            for(var i in pages){
                if(pages[i]._id === pageId){
                    return pages[i];
                    break;
                }
            }
            return null;
        }

        function updatePage(pageId,page) {
            for(var i in pages){
                if(pages[i]._id == pageId){
                    pages[i].name = page.name;
                }
            }
        }
        
        function deletePage(pageId) {
            for(var i in pages){
                if(pages[i]._id === pageId){
                    pages.splice(i,1);
                    break;
                }
            }
        }

    }

})();