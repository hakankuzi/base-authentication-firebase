var ProfileCtrl = angular.module('ProfileCtrl', []);
ProfileCtrl.controller('ProfileController', function($rootScope, $window, $location, AuthWrapper) {
    var vm = this;

    vm.doSignOut = function() {
        AuthWrapper.signOut(response => {
            if (response.code === '200') {
                $location.path('/');
                $rootScope.$apply();
            }
        });
    }


    vm.getToken = function() {
        AuthWrapper.getIdToken(response => {
            console.log(response);
        });
    }

    vm.verifyToken = function() {
        AuthWrapper.verifyToken(response => {
            console.log(response);
        });


    }

});