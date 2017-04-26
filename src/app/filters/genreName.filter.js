angular.module('bm')
    .filter('genreName', function () {
        return function(genre) {
            var genres = {
                comedy: 'Комедия',
                triller: 'Триллер',
                drama: 'Драма'
            };

            return genres[genre];
        }
});
