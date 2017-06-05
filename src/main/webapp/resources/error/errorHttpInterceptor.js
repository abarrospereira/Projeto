
(function() {
    'use strict';
	
    angular.module('les-error-handler', ['les-notification-dialog']).factory('errorHttpInterceptor', errorHttpInterceptor);

	
    errorHttpInterceptor.$inject = ['$q',  'blockUI','alertService','localStorageService'];

    function errorHttpInterceptor($q, blockUI, alertService, localStorageService) {
        return {
            responseError: function responseError(rejection) {

                if (rejection.data && rejection.data.Error) {
                    alertService.error({ text: rejection.data.Message, title: rejection.data.Message});
                }

                blockUI.stop();
            	
                return $q.reject(rejection);
            }
        };
    }
})();