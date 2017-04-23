angular.module('bm')
    .service('OrderService', ['$http', '$q', function OrderService ($http, $q) {
        return {
            getOrders:           getOrders,
            getOrder:            getOrder,
            getOrdersByCriteria: getOrdersByCriteria,
            craeteOrder:         craeteOrder,
            updateOrder:         updateOrder,
            removeOrder:         removeOrder
        }

        function getOrders(params) {
            var deferred = $q.defer();

            $http.get('order/', { params: params })
                .then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(err) {
                        deferred.reject(err.data);
                    }
                );

            return deferred.promise;
        }

        function getOrdersByCriteria(criteria) {
            var deferred = $q.defer();

            $http.get('order/search/simple', {
                params: {
                    criteria: criteria
                }
            })
                .then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(err) {
                        deferred.reject(err.data);
                    }
                );

            return deferred.promise;
        }

        function getOrder(id) {
            var deferred = $q.defer();

            $http.get('order/' + id)
                .then(
                    function(res) {
                        deferred.resolve(res.data[0]);
                    },
                    function(err) {
                        deferred.reject(err.data);
                    }
                );

            return deferred.promise;
        }

        function updateOrder(data) {
            var deferred = $q.defer();

            $http.put('order/' + data.data._id, data)
                .then(
                    function (res){
                        deferred.resolve(res.data);
                    },
                    function (err) {
                        deferred.reject(err.data);
                    }
                );

            return deferred.promise;
        }

        function craeteOrder(data) {
            var deferred = $q.defer();

            $http.post('/order', data).then(
                function (res){
                    deferred.resolve(res.data);
                },
                function (err) {
                    deferred.reject(err.data);
                }
            );

            return deferred.promise;
        }

        function removeOrder(id) {
            var deferred = $q.defer();

            $http.delete('order/' + id)
                .then(
                    function(res) {
                        deferred.resolve(res);
                    },
                    function(err) {
                        deferred.reject(err);
                    }
                );

            return deferred.promise;
        }
    }]);
