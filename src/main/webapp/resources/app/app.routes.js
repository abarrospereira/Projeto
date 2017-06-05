(function() {
	'use strict';

	angular.module('Koulu').config(function($stateProvider) {
		$stateProvider.state('app', {
			abstract: true,
			data: {
				title: 'title.not.found',
				topic: 'topic.not.found'
			}
		});
	});
})();