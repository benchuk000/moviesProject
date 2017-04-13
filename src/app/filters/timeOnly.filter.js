angular.module('bm')
    .filter('timeOnly', function () {
        return function(date) {
            date = new Date(date);

            var hh = date.getHours();
            var minmin = date.getMinutes();

            if (hh < 10) {
                hh = '0' + hh;
            }
            if (minmin < 10) {
                minmin = '0' + minmin;
            }

            return hh + ':' + minmin;
        }
});
