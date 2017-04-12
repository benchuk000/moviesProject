angular.module('bm')
    .service('EntityDataList', ['UserService', 'MovieService', 'SessionService',
    function EntityDataList (UserService, MovieService, SessionService) {
        var GRID_COLUMNS = {};
        GRID_COLUMNS['user'] = [
            {
                name: 'Логин',
                field: 'login'
            },
            {
                name: 'Почта',
                field: 'email'
            },
            {
                 name: 'Имя',
                 field : 'username'
             },
             {
                  name: 'Фамилия',
                  field : 'usersurname'
              }
        ];
        GRID_COLUMNS['movie'] = [
            {
                name: '',
                field: 'avatarUrl',
                enableSorting: false,
                cellTemplate: '<div class="ui-grid-cell-contents"><img class="avatar" src="{{row.entity.avatarUrl}}" /></div>',
                maxWidth: 60,
                minWidth: 50,
                cellClass: 'ui-grid-cell-center'
            },
            {
                name: 'Название',
                field: 'name',
                cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="movie({id: row.entity._id})">{{row.entity.name}}</a></div>',
            },
            {
                name: 'Режисер',
                field: 'author'
            }
        ];
        GRID_COLUMNS['session'] = [
            {
                name: 'Начало',
                field: 'startDate',
                cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.startDate | dateWithTime}}</div>'
            },
            {
                name: 'Конец',
                field: 'endDate',
                cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.endDate | dateWithTime}}</div>'
            },
            {
                name: 'Фильм',
                field: 'movie.name',
                cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="movie({id: row.entity.movie._id})">{{row.entity.movie.name}}</a></div>',
            }
        ];

        var GRID_OPTIONS = {};
        GRID_OPTIONS['user'] = {
            enableCellEditOnFocus: true,
            enableSorting: true,
            columnDefs: GRID_COLUMNS['user'],
            enableColumnMenus: false,
            multiSelect: false,
            rowHeight: 40,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            modifierKeysToMultiSelect: false,
            noUnselect: true
        };
        GRID_OPTIONS['movie'] = {
            enableCellEditOnFocus: true,
            enableSorting: true,
            columnDefs: GRID_COLUMNS['movie'],
            enableColumnMenus: false,
            multiSelect: false,
            rowHeight: 40,
            enableRowSelection: true,
            enableRowHeaderSelection: false
        };
        GRID_OPTIONS['session'] = {
            enableCellEditOnFocus: true,
            enableSorting: true,
            columnDefs: GRID_COLUMNS['session'],
            enableColumnMenus: false,
            multiSelect: false,
            rowHeight: 40,
            enableRowSelection: true,
            enableRowHeaderSelection: false
        };

        var DATA_LIST = {};
        DATA_LIST['user'] = {
            itemName: 'user',
            service: UserService,
            createDialogTemplateUrl: '/app/views/createUserDialog.html'
        };

        DATA_LIST['movie'] = {
            itemName: 'track',
            service: MovieService,
            createDialogTemplateUrl: '/app/views/createMovieDialog.html'
        };

        DATA_LIST['session'] = {
            itemName: 'session',
            service: SessionService,
            createDialogTemplateUrl: '/app/views/createMovieDialog.html'
        };

        return {
            getGridOptions: getGridOptions,
            getGridColumns: getGridColumns,
            getDataList: getDataList
        }

        function getGridOptions (type) {
            return GRID_OPTIONS[type];
        }

        function getGridColumns (type) {
            return GRID_COLUMNS[type];
        }

        function getDataList (type) {
            return DATA_LIST[type];
        }
    }]);
