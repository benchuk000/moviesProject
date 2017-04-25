angular.module('bm')
    .controller('ManageEntitiesController', ['$scope', '$rootScope', 'EntityDataList', 'ManageDialogFactory', '$state',
    function ($scope, $rootScope,  EntityDataList, ManageDialogFactory, $state) {
        var self = this;

        angular.extend(this, {
            init: function () {
                this.entity = $state.params.entityType;

                $scope.$watch(
                    function () {
                        return $state.params.entityType;
                    },
                    function (newValue) {
                        self.currentNavItem = newValue;
                        self.entity = $state.params.entityType;
                    }
                )

                this._initService();
                this._setLoading();
                this._setGridOptions();
                this._loadEntities()
                    .then(this._entitiesLoaded.bind(this))
                    .finally(this._loaded.bind(this));
            },

            _entitiesLoaded: function (data) {
                this.entities = data;
                this.gridOptions.data = this.entities;
            },

            _setLoading: function () {
                this.isLoading = true
            },

            _loaded: function () {
                this.isLoading = false
            },

            _setGridOptions: function () {
                this.gridOptions = EntityDataList.getGridOptions(this.entity);
                this.gridOptions.onRegisterApi = this._wiredGrid.bind(this);
            },

            _wiredGrid: function (gridApi) {
                this.gridApi = gridApi;
            },

            _initService: function () {
                this.service = EntityDataList.getDataList(this.entity).service;
            },

            _loadEntities: function () {
                return this.service['get' + this.entity[0].toUpperCase() + this.entity.slice(1) + 's']();
            },

            createEntity: function () {
                var self = this;

                ManageDialogFactory.showCreateDialog(this.entity)
                    .then(
                        function(entity) {
                            self.entities.push(entity);
                        }, function() {
                            // TODO: add logic here
                        });
            },

            getSelectesEntity: function () {
                return this.gridApi.selection.getSelectedRows()[0];
            },

            edit: function () {
                if (this.entity === 'user') {
                    $state.go('user', { id: this.getSelectesEntity()._id});
                    return;
                }

                ManageDialogFactory.showEditDialog(this.entity, this.getSelectesEntity())
                    .then(
                        function(updatedEntity) {
                            self.entities = self.entities.map(function (entity) {
                                return entity._id === updatedEntity._id ? updatedEntity : entity;
                            });

                            self.gridOptions.data = self.entities;
                        }, function() {
                            // TODO: add logic here
                        });
            },

            remove: function () {
                var self = this;

                ManageDialogFactory.showDeleteDialog(this.entity)
                    .then(
                        function(answer) {
                            if (answer) {
                                self._setLoading();
                                var id = self.getSelectesEntity()._id;

                                self.service['remove' + self.entity[0].toUpperCase() + self.entity.slice(1)](id)
                                    .then(
                                        function (res) {
                                            var entity = self.entities.find(function (entity) {
                                                return entity._id === id;
                                            })
                                            self.entities.splice(self.entities.indexOf(entity), 1);

                                            // TODO: add toast here
                                        },
                                        function (res) {
                                            // TODO: add logic here
                                        }
                                    )
                                    .finally(self._loaded.bind(self));
                            }
                        }, function() {
                            // TODO: add logic here
                        });
            }
        });

        this.init();
    }]);
