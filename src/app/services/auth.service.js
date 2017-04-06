angular.module('bm')
    .service('AuthService', ['UserService', '$q', '$cookies', 'localStorageService', '$rootScope', '$http', function UserService (UserService, $q, $cookies, localStorageService, $rootScope, $http) {
        return {
            login: login,
            getUser: getUser,
            setCredentials: setCredentials,
            logOut: logOut
        }

        function login(userData) {
            var deferred = $q.defer();

            $http.post('/login', userData)
                .then(
                    function(res) {
                        $http.defaults.headers.common.Authorization = 'Basic ' + res.data.token;
                        $cookies.put('token', res.data.token);
                        setCredentials(res.data.user);
                        deferred.resolve(res.data);
                    },
                    function(err) {
                        deferred.reject(err.data);
                    }
                );

            return deferred.promise;
        }

        function getUser() {
            return localStorageService.get('user');
        }

        function setCredentials(user) {
            localStorageService.set('user', user);
            $rootScope.currentUser = user;
        }

        function logOut() {
            $http.defaults.headers.common.Authorization = '',
            $cookies.remove('token');
            localStorageService.remove('user');
            delete $rootScope.currentUser;
        }
    }]);
