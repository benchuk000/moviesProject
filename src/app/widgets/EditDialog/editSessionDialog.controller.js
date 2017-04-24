angular.module('bm')
    .controller('EditSessionDialogController',
    ['$scope', 'entity', 'data', '$mdDialog', 'EntityDataList', 'SessionService', 'MovieService',
    function ($scope, entity, data, $mdDialog, EntityDataList, SessionService, MovieService) {
        var self = this;
        var MAX_HOURS = 24;
        var MAX_MINUTES = 0;
        var MIN_HOURS = 9;
        var MIN_MINUTES = 0;

        angular.extend(this, {
            itemName:                EntityDataList.getDataList(entity).itemName,
            createDialogTemplateUrl: EntityDataList.getDataList(entity).createDialogTemplateUrl,
            data:                    data,

            init: function () {
                MovieService.getMovies()
                    .then(function (movies) {
                        self.movies = movies;
                        self.date = self.data.startDate._d;
                    });
            },

            cancel: function () {
                $mdDialog.cancel();
            },

            getSessions: function () {
                self.isLoading = true;

                SessionService.getSessions({
                    date: this.date
                })
                    .then(function (sessions) {
                        self.sessions = sessions;
                        self.setMinMaxDate();
                        self.isLoading = false;
                    });
            },

            setMinMaxDate: function () {
                if (!this.date) {
                    return;
                }

                this.minDate = new Date(this.date);
                this.maxDate = new Date(this.date);

                this.minDate.setHours(MIN_HOURS);
                this.minDate.setMinutes(MIN_MINUTES);

                this.maxDate.setHours(MAX_HOURS);
                this.maxDate.setMinutes(MAX_MINUTES);
            },

            accept: function () {
                var self = this;
                self.isLoading = true;

                var payload = this.data;
                payload.movie = this.data.movie._id;

                SessionService.updateSession({
                    data: payload
                })
                    .then(
                        function(session){
                            self.isLoading = false;
                            $mdDialog.hide(session);
                        },
                        function(response){
                            self.isLoading = false;
                            // TODO: add logic here
                        }
                    )
            }
        });

        this.init();
    }]);
