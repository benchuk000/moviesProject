angular.module('bm')
    .controller('ProfileController', ['$scope', '$rootScope', 'UserService', function ($scope, $rootScope, UserService) {
            angular.extend(this, {

                init: function () {
                    this.userData = $rootScope.currentUser;

                }
            });
            this.init();
    }]);
