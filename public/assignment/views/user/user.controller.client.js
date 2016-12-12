(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if (!(user && user.username && user.password)) {
                vm.error = "Please fix the errors in the form";
                return;
            }

            if (user.username == "" || user.password == "") {
                vm.error = "Please fix the errors in the form";
                return;
            }

            UserService
                .login(user)
                .success(function (user) {
                    if(user === '0') {
                        vm.error = "Invalid username and password combination";
                    }
                    else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (error) {
                    if (error == "Unauthorized") {
                        vm.error = "Invalid username and password combination";
                    }
                    console.error(error);
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if (user && user.username && user.password) {

                if (user.username == "" || user.password == "") {
                    vm.error = "Please fix the errors in the form";
                    return;
                }

                if (user.password === user.confirmPassword) {
                    UserService
                        .register(user)
                        .success(function (user) {
                            $location.url("/user/" + user._id);
                        })
                        .error(function (error) {
                            console.error(error);
                        })
                }
                else {
                    vm.error = "Please fix the errors in the form";
                }
            }
            else {
                vm.error = "Please fix the errors in the form";
            }
        }
    }

    function ProfileController($routeParams, UserService, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    if (user != '0') {
                        vm.user = user;
                        vm.userId = user._id;
                    }
                })
                .error(function (error) {
                    console.error(error);
                });
        }
        init();

        function logout() {
            UserService
                .logout()
                .success(function () {
                    $location.url("/login");
                })
                .error(function (err) {
                    console.log("Error logging out user");
                    console.log(err);
                });
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.userId)
                .success(function () {
                    $location.url("/login");
                })
                .error(function (error) {
                    console.error(error);
                })
        }

        function updateUser(user){
            if (user.username && user.username != "") {
                vm.error = null;
                UserService.updateUser(vm.userId, user);
            }
            else {
                vm.error = "Please fix the errors in the form";
            }
        }
    }
})();