angular.module('bm')
    .controller('HeaderController', ['$rootScope', 'AuthService', HeaderController]);

    function HeaderController ($rootScope, AuthService) {
        angular.extend(this, {
            init: function () {
                $rootScope.currentUser = AuthService.getUser();
            },

            login: function() {
                AuthService.login(this.userData)
                    .then(
                        function (res) {
                            $state.go('home');
                        },
                        function (message) {
                            toastr.error(message);
                        }
                    );
            },

            logOut: function () {
                this.userData = {};
                AuthService.logOut();
            }
        });

        this.init();
    }
