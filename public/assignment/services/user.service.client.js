(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            login: login,
            logout: logout,
            register: register,
            loggedIn: loggedIn,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;
        
        function register(username,password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/register", user);
        }

        function loggedIn() {
            return $http.get('/api/loggedIn');
        }

        function logout(user) {
            return $http.post("/api/logout");
        }
        
        function login(username,password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }
        

        function deleteUser(userId) {
            var url = "/api/user/"+ userId;
            return $http.delete(url);
        }

        function updateUser(userId,newUser) {
            var url = "/api/user/" + userId;
            return $http.put(url, newUser);
        }

        function createUser(newUser){
            return $http.post("/api/user",newUser);
        }

        function findUserByUsername(username){
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

    }

})();