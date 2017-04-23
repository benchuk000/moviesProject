angular.module('bm')
    .service('PlaceService', ['$http', '$q', function PlaceService ($http, $q) {
        return {
            getPlaces: getPlaces
        }

        function getPlaces(params) {
            var deferred = $q.defer();

            $http.get('place/', { params: params })
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
}]);
