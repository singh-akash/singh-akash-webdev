(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            { "_id": 123, "username": "alice",    "password": "alice",    "firstName": "Alice",
                "lastName": "Wonder", "email": "alice@wonderland.com" },
            { "_id": 234, "username": "bob",      "password": "bob",      "firstName": "Bob",
                "lastName": "Marley", "email": "bob@green.com" },
            { "_id": 345, "username": "charly",   "password": "charly",   "firstName": "Charly",
                "lastName": "Garcia", "email": "charly@aol.com" },
            { "_id": 456, "username": "jannunzi", "password": "jannunzi", "firstName": "Jose",
                "lastName": "Annunziato", "email": "jannunzi@gmail.com" }
        ];

        var api = {
            createUser : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };

        return api;

        function createUser(user) {
            var userId = users[users.length - 1]._id + 1;
            user._id = userId;
            user.firstName = user.username;
            user.lastName = user.username;
            user.email = user.username + "@alchemist.com";

            users.push(user);
            return userId;
        }

        function findUserById(userId) {
            for (var u in users){
                user = users[u];
                if (user._id === userId){
                    return user;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var u in users) {
                if (users[u].username === username) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users){
                if (users[u].username === username &&
                    users[u].password === password) {
                    return users[u];
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users[u] = user;
                    break;
                }
            }
        }

        function deleteUser(userId) {
            for (var u in users) {
                if (users[u]._id === userId) {
                    users.splice(parseInt(u), 1);
                    break;
                }
            }
        }
    }
})();