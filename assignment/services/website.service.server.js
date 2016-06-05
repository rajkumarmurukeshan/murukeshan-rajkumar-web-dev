module.exports = function (app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    /* generates Id for new Website */
    app.get("/api/generateNextWebsiteId", generateNextWebsiteId);

    function generateNextWebsiteId(req, res){
        if(websites.length === 0){
            var newId = 123;
        } else {
            var newId = parseInt(websites[websites.length-1]._id) + 1;
        }
        res.send(newId.toString());
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteId)
            {
                websites.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for (var i in websites) {
            if (websites[i]._id === websiteId)
            {
                websites[i]=newWebsite;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        for(var i in websites) {
            if(websites[i]._id === websiteId) {
                res.send(websites[i]);
                return;
            }
        }
        res.send(null);
    };

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        var res_websites = [];
        for(var i in websites){
            if(websites[i].developerId === userId)
            {
                res_websites.push(websites[i]);
            }
        }
        res.send(res_websites);
    }
    
    function createWebsite(req, res) {
        var newWebsite = req.body;
        websites.push(newWebsite);
        res.sendStatus(200);
    }

    
};