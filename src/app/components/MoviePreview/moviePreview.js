angular.module('bm')
    .directive('moviePreview', function () {
        return {
            templateUrl: './app/components/MoviePreview/movie-preview.html',

            bindToController: {
                movie: '='
            },

            controllerAs: 'preview',
            controller:   function MoviePreviewController ($rootScope, MovieService) {
                var self = this;

                angular.extend(this, {
                    setRating: function (rating) {
                        MovieService.setRating(self.movie._id, rating, $rootScope.currentUser._id)
                            .then(
                                function (movie) {
                                    self.movie = movie;
                                },
                                function () {

                                }
                            )
                    }
                })
            }
        }
    });
