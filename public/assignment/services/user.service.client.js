(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice",	password: "alice",	firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",  	password: "bob",  	firstName: "Bob",	lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    
    function UserService() {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            generateNextId: generateNextId
        };

        return api;

        function generateNextId(){
            var newId = parseInt(users[users.length-1]._id)+1;
            return newId.toString();
        }

        function deleteUser(userId) {
            for(var i in users){
                if(users[i]._id === userId){
                    users.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function updateUser(userId,user) {
            for(var i in users){
                if(users[i]._id === userId){
                    users[i].username = user.username;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                }
            }
        }

        function createUser(user){
            users.push(user);
            return true;
        }

        function findUserByUsername(username){
            for(var i in users){
                if(users[i].username === username){
                    return users[i];
                }
            }
            return null;
        }

        function findUserById(userId) {
            for(var i in users){
                if(users[i]._id === userId){
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var i in users) {
                if(users[i].username === username && (users[i].password === password)) {
                    return users[i];
                }
            }
            return null;
        }

    }

})();