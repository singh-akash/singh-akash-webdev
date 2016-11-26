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
            if (!(username && password)) {
                vm.error = "Please enter username and password";
                return;
            }

            UserService
                .findUserByCredentials(username, password)
                .success(function (user) {
                    if(user === '0') {
                        vm.error = "Invalid username and password combination";
                    }
                    else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (error) {
                    console.error(error);
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if (user && user.username && user.password) {
                if (user.password === user.confirmPassword) {
                    UserService
                        .createUser(user)
                        .success(function (user) {
                            $location.url("/user/" + user._id);
                        })
                        .error(function (error) {
                            console.error(error);
                        })
                }
                else {
                    vm.error = "Password and Confirm Password should match"
                }
            }
            else {
                vm.error = "Username and password are both required";
            }
        }
    }

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        
        var userId = $routeParams['uid'];

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                    }
                })
                .error(function (error) {
                    console.error(error);
                });
        }
        init();
        
        function deleteUser() {
            UserService
                .deleteUser(userId)
                .success(function () {
                    $location.url("/login");
                })
                .error(function (error) {
                    console.error(error);
                })
        }
        function updateUser(user){
            if (user.username) {
                UserService.updateUser(userId, user);
            }
            else {
                vm.error = "Username cannot be left blank"
            }
        }
    }
})();