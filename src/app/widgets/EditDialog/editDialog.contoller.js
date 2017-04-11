angular.module('bm')
    .controller('EditMovieDialogController',
    ['$scope', 'entity', 'data', '$mdDialog', 'EntityDataList', 'MovieService',
    function ($scope, entity, data, $mdDialog, EntityDataList, MovieService) {
        angular.extend(this, {
            files:                   [],
            itemName:                EntityDataList.getDataList(entity).itemName,
            createDialogTemplateUrl: EntityDataList.getDataList(entity).createDialogTemplateUrl,
            data:                    data,

            cancel: function () {
                $mdDialog.cancel();
            },

            addAvatar: function(files){
                this.files = files;
            },

            accept: function () {
                var self = this;
                self.isLoading = true;

                MovieService.updateMovie({
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
