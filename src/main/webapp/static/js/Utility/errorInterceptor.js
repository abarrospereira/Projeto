(function() {
	'use strict';
	
	angular.module('app').factory('errorHttpInterceptor', errorHttpInterceptor);
	
	errorHttpInterceptor.$inject = ['$q','alertService', 'blockUI'];

	function errorHttpInterceptor ($q, alertService, blockUI) {
        return {
            responseError: function responseError(rejection) {
            	
            	if(rejection.data && rejection.data.errors) {
					if(rejection.status >= 500 && rejection.status <= 599) {
						rejection.data.errors.forEach(function(error){
							alertService.error({text: error.key, title: error.title, parameters: error.parameters});
						});
					} else {
						rejection.data.errors.forEach(function(error){
							alertService.warning({text: error.key, title: error.title, parameters: error.parameters});
						});
					}
            	} 
            	
            	if(rejection.status == 403) {
            		alertService.error({text: 'Usuário sem permissão.'});
            	}

			//	blockUI.stop();
            	
                return $q.reject(rejection);
            }
        };
    }
})();