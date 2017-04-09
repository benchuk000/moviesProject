angular.module('bm')
    .service('EntityDataList', ['UserService', 'MovieService', function EntityDataList (UserService, MovieService) {
        var GRID_COLUMNS = {};
        GRID_COLUMNS['user'] = [
            {
                name: '',
                field: 'avatarUrl',
                enableSorting: false,
                cellTemplate: '<div><img class="avatar" src="{{row.entity.avatarUrl}}" /></div>',
                maxWidth: 60,
                minWidth: 50,
                cellClass: 'ui-grid-cell-center'
            },
            {
                name: 'Login',
                field: 'login'
            },
            {
                name: 'Email',
                field: 'email'
            },
            {
                 name: 'Name',
                 field : 'username'
             }
        ];
        GRID_COLUMNS['movie'] = [
            {
                name: '',
                field: 'avatarUrl',
                enableSorting: false,
                cellTemplate: '<div><img class="avatar" src="{{row.entity.avatarUrl}}" /></div>',
                maxWidth: 60,
                minWidth: 50,
                cellClass: 'ui-grid-cell-center'
            },
            {
                name: 'Название',
                field: 'name'
            },
            {
                name: 'Режисер',
                field: 'author'
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

        var DATA_LIST = {};
        DATA_LIST['user'] = {
            itemName: 'user',
            service: UserService,
            createDialogTemplateUrl: '/app/views/createUserDialog.html',
            entityTemplate: '/app/views/user.html'
        };

        DATA_LIST['movie'] = {
            itemName: 'track',
            service: MovieService,
            createDialogTemplateUrl: '/app/views/createMovieDialog.html',
            entityTemplate: '/app/views/movie.html'
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
