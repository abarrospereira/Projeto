(function() {
    'use strict';

    angular.module('app', ['ui.router','app.grid.service','datatables','ui.bootstrap','ngFlash','toaster', 'blockUI','veasy.table'
                             

   ]).run(function($rootScope) {

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


}).config(function($stateProvider, $urlRouterProvider,$httpProvider,blockUIConfig) {
    
//	$httpProvider.defaults.headers.common[header] = token;
	
	
      blockUIConfig.message = '';
      blockUIConfig.delay = 0;
      blockUIConfig.autoBlock = true;
      blockUIConfig.templateUrl = 'static/app/Shared/loading.html';
      blockUIConfig.blockBrowserNavigation = true;

      $urlRouterProvider.otherwise('/main');

      $httpProvider.interceptors.push('errorHttpInterceptor');
      
      $stateProvider
      .state('base', {
          templateUrl: 'static/app/Shared/base.html'
      });
      
});
      
})();