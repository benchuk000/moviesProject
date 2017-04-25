angular.module('bm')
    .controller('UserController', ['$scope', '$rootScope', 'UserService', '$state',
    function ($scope, $rootScope, UserService, $state) {
        var self = this;

        angular.extend(this, {
            init: function () {
                UserService.getUser($state.params.id)
                    .then(
                        function (user) {
                            self.data = user;
                        },
                        function () {
                            // TODO: add logic here
                        }
                    )
            },

            update: function () {
                UserService.updateUser({
                    data: self.data
                })
                    .then(
                        function (user) {
                            self.data = user;
                        },
                        function () {
                            // TODO: add logic here
                        }
                    );
            }
        });

        this.init();
}]);
