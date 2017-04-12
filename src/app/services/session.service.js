angular.module('bm')
    .service('SessionService', ['$http', '$q', function SessionService ($http, $q) {
        return {
            getSessions:           getSessions,
            getSession:            getSession,
            getSessionsByCriteria: getSessionsByCriteria,
            craeteSession:         craeteSession,
            updateSession:         updateSession,
            removeSession:         removeSession
        }

        function getSessions(params) {
            var deferred = $q.defer();

            $http.get('session/', { params: params })
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

        function getSessionsByCriteria(criteria) {
            var deferred = $q.defer();

            $http.get('session/search/simple', {
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

        function getSession(id) {
            var deferred = $q.defer();

            $http.get('session/' + id)
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

        function updateSession(data) {
            var deferred = $q.defer();

            $http.put('session/' + data.data._id, data)
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

        function craeteSession(data) {
            var deferred = $q.defer();

            $http.post('/session', data).then(
                function (res){
                    deferred.resolve(res.data);
                },
                function (err) {
                    deferred.reject(err.data);
                }
            );

            return deferred.promise;
        }

        function removeSession(id) {
            var deferred = $q.defer();

            $http.delete('session/' + id)
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
