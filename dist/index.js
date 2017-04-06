var app = angular.module('bm', [
    'ui.router',
    'ngMaterial'
]);

angular.module('bm')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('in', {
                templateUrl: 'app/base.html'
            })
            .state('in.base', {
                url:      '/',

                abstract: true,

                views: {
                    header: {
                        templateUrl:  'app/components/Header/header.html',

                        controller:   'HeaderController',
                        controllerAs: 'header'
                    },
                    subheader: {
                        templateUrl:  'app/components/Subheader/subheader.html',
                    },
                    content: {
                        template:     '<ui-view/>'
                    }
                }
            })
            .state('home', {
                parent:       'in.base',
                url:          'home',

                templateUrl:  'app/components/Home/home.html'
            })
            .state('signup', {
                parent:       'in.base',
                url:          'signup',

                templateUrl:  'app/components/SignUp/signUp.html'
            });
     }]);

angular.module('bm')
    .controller('HeaderController', HeaderController);

    function HeaderController () {
        this.openMenu = function ($mdMenu, $event) {
            // debugger
            $mdMenu.open();
        }
    }

angular.module('bm')
    .directive('moviePreview', function () {
        return {
            templateUrl: './app/components/MoviePreview/movie-preview.html'
        }
    });
