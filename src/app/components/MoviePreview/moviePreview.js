angular.module('bm')
    .directive('moviePreview', function () {
        return {
            templateUrl: './app/components/MoviePreview/movie-preview.html',

            bindToController: {
                movie: '=',
                date: '='
            },

            controllerAs: 'preview',
            controller:   function MoviePreviewController ($scope, $rootScope, MovieService) {
                var self = this;

                angular.extend(this, {
                    init: function () {
                        var now = new Date();

                        $scope.$watch(
                            function () {
                                return self.movie;
                            },
                            function (movie) {
                                self.sessions = movie.sessions.filter(function (session) {
                                    var date = new Date(session.startDate);
                                    var selfDate = new Date(self.date);

                                    return date.getDate() === selfDate.getDate()
                                        && date.getMonth() === selfDate.getMonth()
                                        && date.getYear() === selfDate.getYear();
                                });
                            }
                        )
                    },

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
                });

                this.init();
            }
        }
    });
