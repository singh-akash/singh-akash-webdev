(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);

            if(user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if (user && user.username && user.password) {
                if (user.password === user.confirmPassword) {
                    var userId = UserService.createUser(user);
                    $location.url("/user/" + userId);
                } else {
                    vm.error = "Password and Confirm Password should match"
                }
            }
            else {
                vm.error = "Username and password are both required";
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var user = UserService.findUserById(userId);

        if(user != null) {
            vm.user = user;
        }
    }
})();