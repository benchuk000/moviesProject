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

                templateUrl:  'app/components/Home/home.html',

                controllerAs: 'home',
                controller :  'HomeController'
            })
            .state('signup', {
                parent:       'in.base',
                url:          'signup',

                templateUrl:  'app/components/SignUp/signUp.html',

                controller:   'SignUpController',
                controllerAs: 'signup'
            })
            .state('movie', {
                parent:       'in.base',
                url:          'movie/{id}',

                templateUrl:  'app/components/Movie/movie.html',

                controllerAs: 'movie',
                controller :  'MovieController'
            })
            .state('manage-entities', {
                parent:       'in.base',
                url:          'manage/{entityType}',

                templateUrl:  'app/components/ManageEntities/manage-entities.html',
                controllerAs: 'entity',
                controller:   'ManageEntitiesController'
            })
            .state('profile', {
                parent:       'in.base',
                url:          'profile',

                templateUrl:  'app/components/Profile/profile.html',
                controllerAs: 'profile',
                controller:   'ProfileController'
            })
            .state('contact', {
                parent:       'in.base',
                url:          'contact',

                templateUrl:  'app/components/Contact/contact.html'

            })
            .state('order', {
                parent:       'in.base',
                url:          'order?sessionID',

                templateUrl:  'app/components/Order/order.html',
                controllerAs: 'order',
                controller:   'OrderController'

            });


     }]);
