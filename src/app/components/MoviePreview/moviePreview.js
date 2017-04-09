angular.module('bm')
    .directive('moviePreview', function () {
        return {
            templateUrl: './app/components/MoviePreview/movie-preview.html',

            bindToController: {
                movie: '='
            },

            controllerAs: 'preview',
            controller:   function MoviePreviewController () {}
        }
    });
