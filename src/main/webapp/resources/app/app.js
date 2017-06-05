(function() {
    'use strict';

    angular.module('Koulu', ['les-error-handler','les-auth-handler', 'Koulu.utility.service', 
                              'ngAnimate',
                              'ngRoute',
                              'ngResource',
                              'ui.router',
                              'angular-loading-bar',
                              'ngMask',
                              'toaster',
                              'ngCookies',
                              'blockUI',
                              'pascalprecht.translate',
                              'LocalStorageModule',
                              'ui.bootstrap',
                              'ngFlash',
                              'datatables',

                              

    ]).run(function(
                                            $translate, 
                                            $rootScope,
                                            localStorageService
                                          ) {
    
        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.previousStateParams = fromParams;
        });

        $rootScope.goToPreviousStateOrTo = function(elseState, $state, params) {
            if($rootScope.previousState) {
                $state.go($rootScope.previousState, $rootScope.previousStateParams);
            } else {
                $state.go(elseState, params);
            }
        };

    }) .config(function(
            $urlRouterProvider, 
            $translateProvider, 
            blockUIConfig,
            $httpProvider,
            $controllerProvider,

            $stateProvider) {

        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate : 'i18n/{lang}/{part}.json'
        });

    
        blockUIConfig.message = '';
        blockUIConfig.delay = 0;
        blockUIConfig.autoBlock = false;
        blockUIConfig.templateUrl = 'app/shared/carregando.html';
        blockUIConfig.blockBrowserNavigation = true;

      
        $urlRouterProvider.otherwise('/main');

        $httpProvider.interceptors.push('errorHttpInterceptor');
        $httpProvider.interceptors.push('authInterceptorService');

	

    });

})();