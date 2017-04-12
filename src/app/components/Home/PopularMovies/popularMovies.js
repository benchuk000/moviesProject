angular.module('bm')
    .directive('popularMovies', function () {
        return {
            templateUrl: './app/components/Home/PopularMovies/popular-movies.html',

            bindToController: {
                title: '@'
            },

            controllerAs: 'top',
            controller:   function MoviePreviewController (MovieService) {
                var self = this;

                angular.extend(this, {
                    init: function (rating) {
                        MovieService.getTopMovies()
                            .then(function (movies) {
                                self.movies = movies;
                            });
                    }
                });

                this.init();
            }
        }
    });
