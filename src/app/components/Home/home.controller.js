angular.module('bm')
    .controller('HomeController', ['$rootScope', 'MovieService', HomeController]);

    function HomeController ($rootScope, MovieService) {
        var self = this;

        angular.extend(this, {
            init: function () {
                MovieService.getMovies()
                    .then(function (movies) {
                        self.movies = movies;
                    });
            }
        });

        this.init();
    }
