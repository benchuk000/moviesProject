angular.module('bm')
    .controller('CreateSessionDialogController',
    ['$scope', 'entity', '$mdDialog', 'EntityDataList', 'SessionService', 'MovieService',
    function ($scope, entity, $mdDialog, EntityDataList, SessionService, MovieService) {
        var self = this;
        var MAX_HOURS = 24;
        var MAX_MINUTES = 0;
        var MIN_HOURS = 9;
        var MIN_MINUTES = 0;

        angular.extend(this, {
            files:                   [],
            itemName:                EntityDataList.getDataList(entity).itemName,
            createDialogTemplateUrl: EntityDataList.getDataList(entity).createDialogTemplateUrl,

            init: function () {
                MovieService.getMovies()
                    .then(function (movies) {
                        self.movies = movies;
                    });
            },

            cancel: function () {
                $mdDialog.cancel();
            },

            accept: function () {
                var self = this;
                self.isLoading = true;

                var payload = this.data;
                payload.movie = this.data.movie._id;

                SessionService.craeteSession(payload)
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
            }
        });

        this.init();
    }]);
