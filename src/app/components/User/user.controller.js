angular.module('bm')
    .controller('UserController', ['$scope', '$rootScope', 'UserService', '$state', 'OrderService',
    function ($scope, $rootScope, UserService, $state, OrderService) {
        var self = this;

        angular.extend(this, {
            init: function () {
                UserService.getUser($state.params.id)
                    .then(
                        function (user) {
                            self.data = user;

                            OrderService.getOrders({ user: user._id })
                                .then(
                                    function (orders) {
                                        self.orders = orders;
                                    },
                                    function () {
                                        // TODO: add logic here
                                    }
                                )
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
            },

            deleteOrder: function (id) {
                OrderService.removeOrder(id)
                    .then(
                        function (res) {
                            self.orders = self.orders.filter(function (order) {
                                return order._id !== id;
                            });
                        },
                        function () {
                            // TODO: add logic here
                        }
                    );
            }
        });

        this.init();
}]);
