angular.module('bm')
    .controller('SignUpController', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
            angular.extend(this, {
                signup: function() {
                    UserService.craeteUser({ data: this.userData })
                        .then(
                            function (res) {
                                alert('You have successfully signed up');
                                $state.go('home');
                            },
                            function (message) {
                                toastr.error(message);
                            }
                        );
                }
            });
    }]);
