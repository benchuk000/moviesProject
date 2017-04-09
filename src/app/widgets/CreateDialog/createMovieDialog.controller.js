angular.module('bm')
    .controller('CreateMovieDialogController',
    ['$scope', 'entity', '$mdDialog', 'EntityDataList', 'MovieService',
    function ($scope, entity, $mdDialog, EntityDataList, MovieService) {
        angular.extend(this, {
            files:                   [],
            itemName:                EntityDataList.getDataList(entity).itemName,
            createDialogTemplateUrl: EntityDataList.getDataList(entity).createDialogTemplateUrl,

            cancel: function () {
                $mdDialog.cancel();
            },

            addAvatar: function(files){
                this.files = files;
            },

            create: function () {
                var self = this;
                self.isLoading = true;

                MovieService.createMovie({
                    data: self.data,
                    img: self.files[0]
                })
                    .then(
                        function(movie){
                            self.isLoading = false;
                            $mdDialog.hide(movie);
                        },
                        function(response){
                            self.isLoading = false;
                            // TODO: add logic here
                        }
                    )
            }
        });
    }]);
