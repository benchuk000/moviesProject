angular.module('bm')
    .service('MovieService', ['$http', '$q', 'Upload',  function MovieService ($http, $q, Upload) {
            return {
                getMovies:           getMovies,
                getMoviesByCriteria: getMoviesByCriteria,
                createMovie:         createMovie,
                removeMovie:         removeMovie,
                getMovie:            getMovie,
                updateMovie:         updateMovie
            }

            function getMovies() {
                var deferred = $q.defer();

                $http.get('movie')
                    .then(
                        function(res) {
                            deferred.resolve(res.data)
                        },
                        function(err) {
                            deferred.reject(err.data);
                        }
                    );

                return deferred.promise;
            }

            function getMovie(id) {
                var deferred = $q.defer();

                $http.get('movie/' + id)
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

            function getMoviesByCriteria(criteria) {
                var deferred = $q.defer();

                $http.get('movie/search/simple', {
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

            function createMovie(data) {
                var deferred = $q.defer();

                Upload.upload({
                    url: '/movie',
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

            function updateMovie(data) {
                var deferred = $q.defer();

                Upload.upload({
                    url: 'movie/' + data.data._id,
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

            function removeMovie(id) {
                var deferred = $q.defer();

                $http.delete('movie/' + id)
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
