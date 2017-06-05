
(function () {
    'use strict';

    angular.module('Koulu').factory('localeService', localeService);

    localeService.$inject = ['$http', 'localStorageService', 'utilityService','$rootScope','$state'];

    function localeService($http, localStorageService, utilityService, rootScope, $state) {
        var localeService = {
            getCredentials: getCredentials,
            clearCredentials: clearCredentials,
            clearInstituicao : clearInstituicao,
            setCredentials: setCredentials,
            setInstituicao: setInstituicao,
            getInstituicao: getInstituicao
        };

        function setInstituicao(instituicao) {
            localStorageService.set('CURRENT_INSTITUICAO', instituicao);
        }

        function getInstituicao() {
           return localStorageService.get('CURRENT_INSTITUICAO');
        }

        function setCredentials(usuario, senha) {
            var authdata = utilityService.getBase64().encode(usuario.userName + ':' + senha);

            rootScope.globals = {
                currentUser: {
                    usuario: usuario,
                    senha : senha,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line

            localStorageService.set('CURRENT_USUARIO', rootScope.globals);
        }
     
        function getCredentials() {
            if (localStorageService.get('CURRENT_USUARIO') != undefined) {
                return localStorageService.get('CURRENT_USUARIO').currentUser;
            }
            else {
                $state.go("login");
            }
        }

        function clearCredentials() {
            localStorageService.remove('CURRENT_USUARIO');
            $http.defaults.headers.common.Authorization = 'Basic';
        }

        function clearInstituicao() {
            localStorageService.remove('CURRENT_INSTITUICAO');
        }

        return localeService;
    }
})();