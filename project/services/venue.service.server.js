module.exports = function (app, models) {

    var venueModelProject = models.venueModelProject;


    app.post("/api/project/venue", createVenue);
    app.get("/api/project/venue/:venueId", findVenueById);
    app.put("/api/project/venue/:venueId", updateVenue);
    app.put("/api/project/venue/:venueId/addComment", addComment);
    app.put("/api/project/venue/:venueId/deleteComment", deleteComment);
    app.put("/api/project/venue/:venueId/addFavorite", addFavoriteOf);
    app.put("/api/project/venue/:venueId/removeFavorite", removeFavoriteOf);
    app.get("/api/project/venue/:venueId/:userId", isFavoriteOf);

    function isFavoriteOf(req, res) {
        var venueId =req.params.venueId;
        var userId = req.body;
        venueModelProject
            .isFavoriteOf(venueId,userId)
            .then(
                function (venue) {
                    res.json(venue);
                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            );
    }

    function addFavoriteOf(req, res) {
        var venueId =req.params.venueId;
        var userId = req.body;
        venueModelProject
            .addFavoriteOf(venueId,userId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function removeFavoriteOf(req, res) {
        var venueId =req.params.venueId;
        var userId = req.body;
        venueModelProject
            .removeFavoriteOf(venueId,userId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function deleteComment(req, res) {
        var venueId =req.params.venueId;
        var comment = req.body;
        venueModelProject
            .deleteComment(venueId,comment)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function addComment(req, res) {
        var venueId =req.params.venueId;
        var comment = req.body;
        venueModelProject
            .addComment(venueId,comment)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

    function createVenue(req, res){
        var venue = req.body;
        venueModelProject
            .createVenue(venue)
            .then(
                function (venue) {
                    res.json(venue);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findVenueById(req, res) {
        var venueId = req.params.venueId;
        venueModelProject
            .findVenueById(venueId)
            .then(
                function (venue) {
                    res.json(venue);
                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            )
    }


    function updateVenue(req, res) {
        var venueId =req.params.venueId;
        var venue = req.body;
        venueModelProject
            .updateVenue(venueId, venue)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.send(error);
                }
            );
    }

};