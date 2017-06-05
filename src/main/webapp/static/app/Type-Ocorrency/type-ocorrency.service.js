
(function () {
    'use strict';

    angular.module('app').factory('typeOcorrencyService', typeOcorrencyService);

    typeOcorrencyService.$inject = ['$http','utilityService'];


    function typeOcorrencyService($http, utilityService) {


        var serviceurl = utilityService.baseAddress() + "type-ocorrencies";

        $http.defaults.useXDomain = true;

        var typeOcorrencyService = {
            save: save,
            findById : findById,
            findAll: findAll,
            deleteTypeOcorrency:deleteTypeOcorrency
        };

        function save(typeOcorrency) {
            var url = serviceurl;
            return $http.post(url, typeOcorrency);
        }

        function findById(id) {
	        var url = serviceurl + '/' + id;
	        return $http.get(url);
	    }
        
        function findAll() {
	        var url = serviceurl;
	        return $http.get(url);
	    }
        
        function deleteTypeOcorrency(id) {
	        return $http.delete(serviceurl + '/' + id);
	    }


        return typeOcorrencyService;
    }

})();

    