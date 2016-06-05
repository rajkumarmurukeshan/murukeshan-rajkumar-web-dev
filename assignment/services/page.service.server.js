module.exports = function (app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ]

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    /* generates Id for new Website */
    app.get("/api/generateNextPageId", generateNextPageId);

    function generateNextPageId(req, res){
        if(pages.length === 0){
            var newId = 123;
        } else {
            var newId = parseInt(pages[pages.length-1]._id) + 1;
        }
        res.send(newId.toString());
    }

    function createPage(req , res) {
        var newPage = req.body;
        pages.push(newPage);
        res.send(200);
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        var res_pages = [];
        for(var i in pages){
            if(pages[i].websiteId === websiteId){
                res_pages.push(pages[i]);
            }
        }
        res.send(res_pages);
    }

    function findPageById(req,res){
        var pageId = req.params.pageId;
        for(var i in pages) {
            if(pages[i]._id === pageId) {
                res.send(pages[i]);
                return;
            }
        }
        res.send(null);
    };

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i]=newPage;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id === pageId)
            {
                pages.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
    
};