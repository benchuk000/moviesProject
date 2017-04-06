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

                templateUrl:  'app/components/SignUp/signUp.html',

                controller:   'SignUpController',
                controllerAs: 'signup'
            });
     }]);
