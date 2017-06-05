(function () {
    'use strict';

    angular.module('app').config(function ($stateProvider) {
    	 
        $stateProvider
          .state('contacts', {
        	  url: '/contacts',
        	  parent: 'base',
              views: {
                  'content@': {
                      templateUrl: 'static/app/Type-Ocorrency/List/type-ocorrency.list.html',
                      controller: 'typeOcorrencyListController',
                      controllerAs: 'typeOcorrencyListCtrl'
                  }
              }
      		
          })
//          .state('contacts.list', {
//              url: '/list',
//              // loaded into ui-view of parent's template
//	        	templateUrl: 'static/app/Type-Ocorrency/List/type-ocorrency.list.html',
//	            controller: 'typeOcorrencyListController'
//          })
          .state('contacts.form', {
             url: '/form',
        	 views: {
                 'content@': {
                	 templateUrl: 'static/app/Type-Ocorrency/Form/type-ocorrency.form.html'                		 
                 }
             }
	        	
          }).state('contacts.edit', {
              url: '/contacts/editar/:id',    
              views: {
                  'content@': {
                      templateUrl: 'static/app/Type-Ocorrency/Form/type-ocorrency.form.html'
                  }
              }
          });

    });
})();