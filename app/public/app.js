var app = angular.module('app', ['ngRoute', 'IndexCtrl', 'MainPageCtrl', 'LoginCtrl', 'MockDataService']);


// Environments -----------------------------------------
app.run(function($rootScope, $location, $route, $window) {
    const config = {
        apiKey: "AIzaSyA0xoTKvyTZJL3x5bleuR9-cL89lEneq5k",
        authDomain: "functions-base.firebaseapp.com",
        projectId: "functions-base",
        storageBucket: "functions-base.appspot.com",
        messagingSenderId: "540497239941",
        appId: "1:540497239941:web:38f0d7ed71b24846b02eec",
        measurementId: "G-1LKNBNJM5Z"
    }


    // Initialize Firebase
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('user signed id')
                // User is signed in.
        } else {
            console.log('user not signed')
                // No user is signed in.
        }
    });



    $rootScope.apis = {};
    $rootScope.apis.createSession = "/api/createSession";
    $rootScope.apis.generateToken = "/api/generateToken";

    $rootScope.$on("$locationChangeStart", function(event, next, current) {});


    // Change Route and Check Authorize -------------------------------------
    $rootScope.$on('$routeChangeStart', function(event, next, current) {});
    // -----------------------------------------------------------------
});



// Routing -------------------------------------------------------------
app.config(function($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
        .when('/mainpage', {
            templateUrl: '../views/mainpage.html',
            controller: 'MainPageController',
            controllerAs: 'mainpage',
        })
        .when('/', {
            templateUrl: '../views/login.html',
            controller: 'LoginController',
            controllerAs: 'login',
        })
        .otherwise("/");


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});