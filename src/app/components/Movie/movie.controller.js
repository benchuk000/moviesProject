angular.module('bm')
    .controller('MovieController', ['$rootScope', 'MovieService', '$state', '$sce', MovieController]);

    function MovieController ($rootScope, MovieService, $state, $sce) {
        var self = this;

        angular.extend(this, {
            init: function () {
                MovieService.getMovie($state.params.id)
                    .then(function (movie) {
                        movie.url = $sce.trustAsResourceUrl(movie.url);
                        self.entity = movie;
                    });
            }
        });

        this.init();
    }
