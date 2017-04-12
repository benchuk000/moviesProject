angular.module('bm')
    .filter('dateWithTime', function () {
        return function(date) {
            date = new Date(date);

            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            var hh = date.getHours();
            var minmin = date.getMinutes();

            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            if (hh < 10) {
                hh = '0' + hh;
            }
            if (minmin < 10) {
                minmin = '0' + minmin;
            }

            return dd + '.' + mm + '.' + yyyy + ' - ' + hh + ':' + minmin;
        }
});
