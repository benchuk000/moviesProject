angular.module('bm')
    .controller('OrderController', ['$rootScope', 'SessionService', '$stateParams', OrderController]);

    function OrderController ($rootScope, SessionService, $stateParams) {
        var self = this;

        angular.extend(this, {
            init: function () {
                SessionService.getSession($stateParams.sessionID)
                    .then(function (session) {
                        self.session = session;
                    });
            }
        });

        this.init();
    }
