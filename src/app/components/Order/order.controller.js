angular.module('bm')
    .controller('OrderController', ['$rootScope', 'SessionService', '$stateParams', 'AuthService', 'OrderService', '$q', 'PlaceService', OrderController]);

    function OrderController ($rootScope, SessionService, $stateParams, AuthService, OrderService, $q, PlaceService) {
        var self = this;

        angular.extend(this, {
            selectedPlaces: [],
            breadcrumbs: [
                {
                    title: 'Билеты',
                    viewSrc: './app/components/Order/OrderPreview/order-preview.html'
                },
                {
                    title: 'Места',
                    viewSrc: './app/components/Order/OrderPlaces/order-places.html'
                },
                {
                    title: 'Корзина',
                    viewSrc: './app/components/Order/OrderCart/order-cart.html'
                },
                {
                    title: 'Готовый',
                    viewSrc: './app/components/Order/OrderResult/order-result.html'
                }
            ],

            init: function () {
                this.currentStep = this.breadcrumbs[0];

                SessionService.getSession($stateParams.sessionID)
                    .then(function (session) {
                        self.session = session;
                    });

                PlaceService.getPlaces()
                    .then(function (places) {
                        var orderedPlaces = [];

                        places.forEach(function (item) {
                            orderedPlaces[item.rowNumber]
                            if (!orderedPlaces[item.rowNumber]) {
                                orderedPlaces[item.rowNumber] = [];
                            }

                            orderedPlaces[item.rowNumber][item.placeNumber] = item;
                        });

                        self.places = orderedPlaces;
                    });
            },

            switchToNextStep: function () {
                var stepIndex = this.breadcrumbs.indexOf(this.currentStep);
                var self = this;

                if (this.currentStep === this.breadcrumbs[2]) {
                    this.makeOrder()
                        .then(function () {
                            self.currentStep = self.breadcrumbs[stepIndex + 1];
                        });
                }
                else {
                    this.currentStep = this.breadcrumbs[stepIndex + 1];
                }
            },

            switchToPrevStep: function () {
                var stepIndex = this.breadcrumbs.indexOf(this.currentStep);
                this.currentStep = this.breadcrumbs[stepIndex - 1];
            },

            selectPlaces: function (place) {
                if (!this.isPlaceBusy(place)) {
                    this.selectedPlaces[0] = place;
                }
            },

            isPlaceSelected: function (place) {
                return this.selectedPlaces.find(function (item) {
                    return item._id === place._id;
                });
            },

            isPlaceBusy: function (place) {
                return this.session.selectedPlaces.find(function (item) {
                    return item === place._id;
                });
            },

            makeOrder: function () {
                var deferred = $q.defer();
                var order = {
                    sessionID: this.session._id,
                    userID: AuthService.getUser()._id,
                    placeID: this.selectedPlaces[0]._id
                };

                OrderService.craeteOrder(order)
                    .then(function (order) {
                        deferred.resolve(order);
                    });

                return deferred.promise;
            }
        });

        this.init();
    }
