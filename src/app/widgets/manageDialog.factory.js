angular.module('bm')
    .service('ManageDialogFactory', ['$mdDialog',  function ManageDialogFactory ($mdDialog) {
        return {
            showCreateDialog: showCreateDialog,
            showDeleteDialog: showDeleteDialog,
            showEditDialog:   showEditDialog
        }

        function showCreateDialog (entity) {
            switch (entity) {
                case 'user':
                    return showUserCreateDialog(entity);
                case 'movie':
                    return showMovieCreateDialog(entity);
                case 'session':
                    return showSessionCreateDialog(entity);
            }
        }

        function showUserCreateDialog (entity) {
            return $mdDialog.show({
                controller: 'CreateUserDialogController as dialogCtrl',
                templateUrl: 'app/views/createUserDialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                locals: {
                    entity: entity
                }
            });
        }

        function showMovieCreateDialog (entity) {
            return $mdDialog.show({
                controller: 'CreateMovieDialogController as dialogCtrl',
                templateUrl: '/app/widgets/CreateDialog/createMovieDialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                locals: {
                    entity:entity
                }
            });
        }

        function showSessionCreateDialog (entity) {
            return $mdDialog.show({
                controller: 'CreateSessionDialogController as dialogCtrl',
                templateUrl: '/app/widgets/CreateDialog/createSessionDialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                locals: {
                    entity: entity
                }
            });
        }

        function showDeleteDialog (entity) {
            var alias = {
                'user': 'пользователя',
                'movie': 'фильм'
            };

            return $mdDialog.show({
                controller: DeleteDialogController,
                templateUrl: '/app/widgets/DeleteDialog/delete-entity-dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                locals: {
                    entity: alias[entity]
                }
            });

            function DeleteDialogController ($scope, entity) {
                $scope.entity = entity;

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.delete = function () {
                    $mdDialog.hide(true);
                };
            }
        }

        function showEditDialog (entity, data) {
            switch (entity) {
                case 'movie':
                    return showMovieEditDialog(entity, data);
            }
        }

        function showMovieEditDialog (entity, data) {
            return $mdDialog.show({
                controller: 'EditMovieDialogController as dialogCtrl',
                templateUrl: './app/widgets/CreateDialog/createMovieDialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                locals: {
                    entity: entity,
                    data: data
                }
            });
        }
    }]);
