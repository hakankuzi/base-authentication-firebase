var LoginCtrl = angular.module('LoginCtrl', []);
LoginCtrl.controller('LoginController', function($rootScope, $window, $scope, AuthWrapper, $location) {
    var vm = this;
    vm.loginData = {
        email: "",
        password: ""
    }



    vm.doLogin = function() {
        AuthWrapper.signupEmailAndPassword(vm.loginData, response => {
            console.log(response);
        });


    }

    vm.doLoginWithGoogleAuthentication = function() {
        AuthWrapper.signInWithGoogleAuthentication(response => {



            $location.path('/profile')

            $scope.$apply();

            console.log(response);
        })
    }

    vm.doSignOut = function() {
        AuthWrapper.signOut();

    }
});