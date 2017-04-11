angular.module('bm')
    .controller('SignUpController', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
            angular.extend(this, {
                signup: function() {
                    UserService.craeteUser(this.userData)
                        .then(
                            function (res) {
                                alert('Регистрация прошла успешно!');
                                $state.go('home');
                            },
                            function (message) {
                                alert(message)
                                // toastr.error(message);
                            }
                        );
                }
            });
    }]);
