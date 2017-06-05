(function () {
    'use strict';


        angular.module('les-auth-handler', ['les-notification-dialog']).factory('authInterceptorService', authInterceptorService);


        authInterceptorService.$inject = ['$q', 'blockUI', 'alertService', 'localStorageService','$location'];

        function authInterceptorService($q, blockUI, alertService, localStorageService, $location) {

            var authInterceptorServiceFactory = {};

            var _request = function (config) {

                config.headers = config.headers || {};

                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    config.headers.Authorization = 'Bearer ' + authData.token;
                }

                return config;
            }

            var _responseError = function (rejection) {
                if (rejection.status === 401) {
                    $location.path('/error');
                }
                return $q.reject(rejection);
            }

            authInterceptorServiceFactory.request = _request;
            authInterceptorServiceFactory.responseError = _responseError;

            return authInterceptorServiceFactory;
        }
})();