(function() {
	'use strict';

	angular.module('Koulu').config(function($stateProvider) {
		$stateProvider.state('app.main', {
			url : '/main',
			views : {
				'content@app' : {
					templateUrl : 'app/main/main.html',
					controller : 'mainController',
					controllerAs: 'mainCtrl'
				}
			},
			data: {
				title: 'main.view.title',
				description: 'main.view.description',
				topic: 'main.view.topic',
				breadcrumbs: ['main.view.breadcrumb']
			},
			resolve : {
				translatePartialLoader : [ '$translate', function($translate) {
					return $translate.refresh();
				} ]
			}
		});
	});
})();
