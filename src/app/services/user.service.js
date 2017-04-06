angular.module('bm')
    .service('UserService', ['$http', '$q', 'Upload', function UserService ($http, $q, Upload) {
        return {
            getUsers:           getUsers,
            getUser:            getUser,
            getUsersByCriteria: getUsersByCriteria,
            craeteUser:         craeteUser,
            updateUser:         updateUser,
            removeUser:         removeUser
        }

        function getUsers() {
            var deferred = $q.defer();

            $http.get('user/')
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

        function getUsersByCriteria(criteria) {
            var deferred = $q.defer();

            $http.get('user/search/simple', {
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

        function getUser(id) {
            var deferred = $q.defer();

            $http.get('user/' + id)
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

        function updateUser(data) {
            var deferred = $q.defer();

            Upload.upload({
                url: 'user/' + data.data._id,
                method: 'PUT',
                data: data
            })
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

        function craeteUser(data) {
            var deferred = $q.defer();

            Upload.upload({
                url: '/user',
                data: data
            }).then(
                function (res){
                    deferred.resolve(res.data);
                },
                function (err) {
                    deferred.reject(err.data);
                }
            );

            return deferred.promise;
        }

        function removeUser(id) {
            var deferred = $q.defer();

            $http.delete('user/' + id)
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
