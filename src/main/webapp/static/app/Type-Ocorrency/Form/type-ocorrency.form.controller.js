
(function () {
    'use strict';

    angular.module('app').controller('typeOcorrencyFormController', typeOcorrencyFormController);

    typeOcorrencyFormController.$inject = ['$scope','typeOcorrencyService','$state','alertService'];

    function typeOcorrencyFormController($scope,typeOcorrencyService,$state,alertService) {

    	var self = this;
    	
    	activate();
    	
    	function activate() {
		    self.typeOcorrencyDTO = {};

		    $scope.slideTogglePolo = true;

			var id = $state.params.id;

			if (id != undefined) {
				typeOcorrencyService.findById(id).then(function (result) {
				    self.typeOcorrencyDTO = result.data;
				});
			}
		}

    	self.save = function () {

			var typeOcorrencyDTO = self.typeOcorrencyDTO;
			
			typeOcorrencyService.save(self.typeOcorrencyDTO).then(function (result) {
				self.typeOcorrencyDTO = null;
				$state.go("contacts");
                alertService.success({ title: 'Sucesso', text: 'Registro salvo com sucesso' });
			});

		};
		
		

    }
})();