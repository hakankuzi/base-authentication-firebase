var app = angular.module('app', ['ngRoute', 'IndexCtrl', 'ProfileCtrl', 'MainPageCtrl', 'LoginCtrl', 'SignupCtrl', 'AuthDataService', 'MockDataService']);


// Environments -----------------------------------------
app.run(function($rootScope, $location, $route, $window, AuthWrapper) {


    $rootScope.apis = {};
    $rootScope.apis.createSession = "/api/createSession";
    $rootScope.apis.generateToken = "/api/generateToken";

    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        let token = AuthWrapper.getToken();

        if (token === null) {
            $location.path('/');
        } else {
            if ($location.path() === '/' || $location.path() === '/signup') {
                $location.path('/profile');
            }
        }
    });


    // Change Route and Check Authorize -------------------------------------
    $rootScope.$on('$routeChangeStart', function(event, next, current) {




    });
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
        .when('/signup', {
            templateUrl: '../views/signup.html',
            controller: 'SignupController',
            controllerAs: 'signup',
        })
        .when('/profile', {
            templateUrl: '../views/profile.html',
            controller: 'ProfileController',
            controllerAs: 'profile',
        })
        .otherwise("/");

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});