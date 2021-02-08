var SignupCtrl = angular.module('SignupCtrl', []);
SignupCtrl.controller('SignupController', function($rootScope, $window, $location, AuthWrapper) {
    var vm = this;

    vm.signupData = {
        name: "",
        email: "",
        password: ""
    }

    vm.doSignup = function() {
        AuthWrapper.signupEmailAndPassword(vm.signupData, response => {
            console.log(response);
        });
    }
});