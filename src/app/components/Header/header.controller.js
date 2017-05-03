angular.module('bm')
    .controller('HeaderController', ['$rootScope', 'AuthService', 'MovieService', '$state', HeaderController]);

    function HeaderController ($rootScope, AuthService, MovieService, $state) {
        var self = this;

        angular.extend(this, {
            init: function () {
                this.movies = [];
                $rootScope.currentUser = AuthService.getUser();
            },

            login: function() {
                AuthService.login(this.userData)
                    .then(
                        function (res) {
                            $state.go('home');
                        },
                        function (message) {
                            alert(message);
                        }
                    );
            },

            logOut: function () {
                this.userData = {};
                AuthService.logOut();
                $state.go('home');
            },

            makeSearch: function () {
                if (this.searchName.length) {
                    MovieService.getMoviesByCriteria(this.searchName)
                        .then(
                            function (movies) {
                                self.movies = movies;
                            },
                            function () {

                            }
                        );
                }
            },

            goToMovie: function (id) {
                $state.go('movie', { id: id});
            }
        });

        this.init();
    }
