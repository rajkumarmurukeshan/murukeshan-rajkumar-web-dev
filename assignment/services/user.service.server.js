module.exports = function (app, models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", getUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModel
            .updateUser(userId, user)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function () {
                    res.send(error);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(null);
                }
            )
    }

    function getUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(null);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username,password)
            .then(
                function (user) {
                    res.json(user);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function () {
                    res.statusCode(404).send(null);
                }
            );
    }

};