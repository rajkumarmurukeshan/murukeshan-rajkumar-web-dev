(function() {
    angular
        .module("Xplore")
        .factory("XploreUserService", UserService);

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
            deleteUser: deleteUser,
            addFavorite: addFavorite,
            removeFavorite: removeFavorite
        };

        return api;

        function addFavorite(userId,venue) {
            var body = {
                userId: userId,
                venue: venue
            };
            return $http.put("/api/project/addFavorite", body);
        }
        
        function removeFavorite(userId,venueId) {
            var body = {
                userId: userId,
                venueId: venueId
            };
            return $http.put("/api/project/removeFavorite", body);
        }
        
        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function loggedIn() {
            return $http.get('/api/project/loggedIn');
        }

        function logout(user) {
            return $http.post("/api/project/logout");
        }
        
        function login(username,password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/login", user);
        }
        

        function deleteUser(userId) {
            var url = "/api/project/user/"+ userId;
            return $http.delete(url);
        }

        function updateUser(userId,newUser) {
            var url = "/api/project/user/" + userId;
            return $http.put(url, newUser);
        }

        function createUser(newUser){
            return $http.post("/api/project/user",newUser);
        }

        function findUserByUsername(username){
            var url = "/api/project/user?username="+username;
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = "/api/project/user/" + userId;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url);
        }

    }

})();