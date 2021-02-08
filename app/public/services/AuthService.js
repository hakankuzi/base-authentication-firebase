'use strict'
var AuthDataService = angular.module('AuthDataService', []);

// Facebook Authentication
// https://www.youtube.com/watch?v=wSnhZ22EKjc

AuthDataService.service('AuthWrapper', function($http, $window, $rootScope, $location) {

    const authService = {};

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
        if (!user && $location.path() !== '/signup') {
            $location.path('/');
            $rootScope.$apply();
        }
    });


    authService.signInWithGoogleAuthentication = function(callback) {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then((user) => {
            if (user.additionalUserInfo.isNewUser) {
                let data = { data: { uid: user.user.uid, name: user.additionalUserInfo.profile.name, email: user.additionalUserInfo.profile.email, password: 'o-auth-google' } };
                authService.addUserToDB(data, response => {
                    if (response.data.result.code === '201') {
                        authService.getIdToken(response => {
                            callback(response);
                        });
                    }
                });
            } else {
                authService.getIdToken(response => {
                    callback(response);
                });
            }
        }).catch(error => {
            callback({ code: '400', type: error.code, message: error.message });
        });
    }

    authService.signupEmailAndPassword = function(item, callback) {
        firebase.auth().createUserWithEmailAndPassword(item.email, item.password).then(user => {
            let data = { data: { password: item.password, email: item.email, name: item.name, uid: user.user.uid } };
            authService.addUserToDB(data, response => {
                if (response.data.result.code === '201') {
                    authService.loginEmailAndPassword(item, response => {
                        callback(response);
                    });
                } else {
                    callback(response.data.result);
                }
            });
        }).catch(error => {
            callback({ code: '400', type: error.code, message: error.message });
        });
    }


    authService.loginEmailAndPassword = function(data, callback) {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(user => {
            if (user) {
                authService.getIdToken(response => {
                    callback(response);
                });
            }
        }).catch(error => {
            callback({ code: '400', type: error.code, message: error.message });
        });
    }

    authService.signOut = function(callback) {
        firebase.auth().signOut().then(() => {
            setToken();
            callback({ code: '200', type: 'signed_out', message: 'User signed out successfully' });
        }).catch((error) => {
            callback({ code: '400', type: error.code, message: error.message });
        });
    }


    authService.addUserToDB = function(item, callback) {
        $http({
            url: 'https://us-central1-functions-base.cloudfunctions.net/authservice-createUser',
            method: 'POST',
            data: item,
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
            callback(response);
        }).catch(error => {
            callback({ code: '400', type: error.code, message: error.message });
        });
    }

    authService.getIdToken = function(callback) {
        if (firebase.auth().currentUser) {
            firebase.auth().currentUser.getIdToken( /* forceRefresh */ true).then((idToken) => {
                setToken(idToken);
                callback({ code: '200', type: 'id_token', message: 'Token is received successfully', token: idToken });
            }).catch(function(error) {
                setToken(null);
                callback({ code: '400', type: error.errorInfo.code, message: error.errorInfo.message });
            });
        } else {
            callback({ code: '400', type: 'not_signed', message: 'User have not signed!' });
        }
    }


    function setToken(token) {
        if (token) {
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');
        }
    }

    function getToken() {
        return $window.localStorage.getItem('token');
    }
    return authService;
});