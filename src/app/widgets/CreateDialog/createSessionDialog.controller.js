angular.module('bm')
    .controller('CreateSessionDialogController',
    ['$scope', 'entity', '$mdDialog', 'EntityDataList', 'SessionService', 'MovieService',
    function ($scope, entity, $mdDialog, EntityDataList, SessionService, MovieService) {
        var self = this;

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
                SessionService.getSessions({
                    date: this.date
                })
                    .then(function (sessions) {
                        self.sessions = sessions;
                    });
            },

            onStartDate: function () {
                this.data.startDate.setDate(this.date.getDate());
                this.data.startDate.setMonth(this.date.getMonth());
                this.data.startDate.setYear(this.date.getFullYear());
            },

            onEndDate: function () {
                this.data.endDate.setDate(this.date.getDate());
                this.data.endDate.setMonth(this.date.getMonth());
                this.data.endDate.setYear(this.date.getFullYear());
            }
        });

        this.init();
    }]);
