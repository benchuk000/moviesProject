angular.module('bm')
    .controller('HomeController', ['$scope', '$rootScope', 'MovieService', HomeController]);

    function HomeController ($scope, $rootScope, MovieService) {
        var self = this;

        angular.extend(this, {
            init: function () {
                this.today = new Date();
                this.today.setHours(0,0,0,0);

                this.filter = {
                    date: this.today
                };

                this.initGenres();
                this.watchFilter();
            },

            loadMovies: function (filter) {
                MovieService.getMovies(filter)
                    .then(function (movies) {
                        self.movies = movies;
                    });
            },

            initGenres: function () {
                this.genres = [
                    'Комедия',
                    'Триллер',
                    'Драма'
                ];
            },

            watchFilter: function () {
                $scope.$watch(
                    function () {
                        return self.filter;
                    },
                    function (filter) {
                        self.loadMovies(filter);
                    },
                    true
                )
            }
        });

        this.init();
    }
