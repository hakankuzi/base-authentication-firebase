var LoginCtrl = angular.module('LoginCtrl', []);
LoginCtrl.controller('LoginController', function($rootScope, $window, $scope, $location) {
    var vm = this;
    vm.loginData = {
        email: "",
        password: ""
    }

    vm.doLogin = function() {
        firebase.auth().signInWithEmailAndPassword(vm.loginData.email, vm.loginData.password).then(user => {
            console.log(user);
        });
    }
});