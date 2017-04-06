angular.module('bm')
    .controller('HeaderController', HeaderController);

    function HeaderController () {
        this.openMenu = function ($mdMenu, $event) {
            // debugger
            $mdMenu.open();
        }
    }
